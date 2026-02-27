"""
Budget Suggestion Routes
AI-powered budget recommendation system
"""

from flask import Blueprint, request, jsonify, current_app
from datetime import datetime

bp = Blueprint('budget_suggestion', __name__, url_prefix='/api/budget')


@bp.route('/suggest', methods=['POST'])
def suggest_budget():
    """
    Suggest budget for an event using AI
    
    Expects:
        - event_type: Type of event (workshop, seminar, fest, etc.)
        - attendees: Expected number of attendees
        - duration: Event duration in hours
        - venue_type: indoor/outdoor
        - additional_requirements: List of requirements
    """
    try:
        data = request.json
        
        # Validate required fields
        if not data.get('event_type') or not data.get('attendees'):
            return jsonify({
                'success': False,
                'error': 'Event type and attendees are required'
            }), 400
        
        event_type = data['event_type']
        attendees = int(data['attendees'])
        duration = float(data.get('duration', 3))
        venue_type = data.get('venue_type', 'indoor')
        requirements = data.get('additional_requirements', [])
        
        # Build AI prompt
        prompt = f"""You are a financial advisor for a college club. Suggest a detailed budget breakdown for the following event:

Event Type: {event_type}
Expected Attendees: {attendees}
Duration: {duration} hours
Venue Type: {venue_type}
Additional Requirements: {', '.join(requirements) if requirements else 'None'}

Provide a realistic budget breakdown with the following categories:
1. Venue and Infrastructure
2. Food and Refreshments
3. Marketing and Promotion
4. Guest/Speaker Honorarium (if applicable)
5. Decorations and Setup
6. Equipment and Technology
7. Miscellaneous and Contingency

For each category:
- Provide estimated cost in USD
- Brief justification for the amount
- Tips for cost optimization

At the end, provide:
- Total estimated budget
- Suggested income sources (sponsorships, registration fees, etc.)
- Risk mitigation strategies

Format the response in a structured, easy-to-read manner."""

        # Call LLM service
        llm = current_app.llm
        if not llm.is_available():
            return jsonify({
                'success': False,
                'error': 'LLM service is not available'
            }), 503
        
        response = llm.generate_response(prompt)
        
        # Parse the response to extract total budget
        total_budget = extract_total_budget(response)
        
        # Save suggestion to database
        db = current_app.db.db
        suggestion = {
            'event_type': event_type,
            'attendees': attendees,
            'duration': duration,
            'venue_type': venue_type,
            'requirements': requirements,
            'suggestion': response,
            'total_budget': total_budget,
            'created_at': datetime.utcnow().isoformat()
        }
        
        result = db.budget_suggestions.insert_one(suggestion)
        suggestion['_id'] = str(result.inserted_id)
        
        return jsonify({
            'success': True,
            'suggestion': response,
            'total_budget': total_budget,
            'id': suggestion['_id']
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


def extract_total_budget(text):
    """Extract total budget amount from AI response"""
    import re
    
    # Look for patterns like "Total: $1000" or "Total Budget: $1,500"
    patterns = [
        r'Total(?:\s+Estimated)?\s+Budget(?:\s+is)?:?\s*\$?([\d,]+)',
        r'Total:?\s*\$?([\d,]+)',
        r'Grand\s+Total:?\s*\$?([\d,]+)'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            amount_str = match.group(1).replace(',', '')
            try:
                return float(amount_str)
            except:
                pass
    
    return 0


@bp.route('/history', methods=['GET'])
def get_budget_history():
    """Get all budget suggestions"""
    try:
        db = current_app.db.db
        suggestions = list(db.budget_suggestions.find().sort('created_at', -1).limit(20))
        
        # Serialize MongoDB documents
        for suggestion in suggestions:
            suggestion['_id'] = str(suggestion['_id'])
        
        return jsonify({
            'success': True,
            'suggestions': suggestions
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
