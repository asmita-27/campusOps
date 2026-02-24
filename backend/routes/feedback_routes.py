"""
Feedback analysis API routes
"""
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
import csv
import io

bp = Blueprint('feedback', __name__, url_prefix='/api/feedback')


@bp.route('/analyze', methods=['POST'])
def analyze_feedback():
    """Analyze feedback from CSV file"""
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No file uploaded'
            }), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400
        
        # Read CSV file
        stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
        csv_reader = csv.DictReader(stream)
        
        # Extract feedback text
        feedback_items = []
        for row in csv_reader:
            # Try common column names for feedback
            feedback_text = (
                row.get('feedback') or 
                row.get('Feedback') or 
                row.get('comment') or 
                row.get('Comment') or 
                row.get('comments') or
                row.get('Comments') or
                row.get('response') or
                str(list(row.values())[0] if row.values() else '')
            )
            if feedback_text:
                feedback_items.append(feedback_text)
        
        if not feedback_items:
            return jsonify({
                'success': False,
                'error': 'No feedback data found in CSV'
            }), 400
        
        # Combine all feedback
        combined_feedback = "\n".join(feedback_items[:50])  # Limit to 50 for now
        
        # Analyze using LLM
        llm = current_app.llm
        analysis = llm.analyze_feedback(combined_feedback)
        
        # Store in database
        db = current_app.db
        if db.is_connected():
            feedback_doc = {
                'filename': secure_filename(file.filename),
                'feedback_count': len(feedback_items),
                'analysis': analysis,
                'timestamp': None
            }
            db.insert_one('feedback', feedback_doc)
        
        return jsonify({
            'success': True,
            'data': analysis,
            'metadata': {
                'total_feedback': len(feedback_items),
                'analyzed': min(len(feedback_items), 50)
            }
        }), 200
    
    except Exception as e:
        print(f"Error in analyze_feedback: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
