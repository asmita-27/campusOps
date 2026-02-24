"""
Event-related API routes
"""
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os

bp = Blueprint('events', __name__, url_prefix='/api/events')


@bp.route('/generate', methods=['POST'])
def generate_event_report():
    """Generate event report/plan/summary"""
    try:
        # Get form data
        event_description = request.form.get('event_description')
        document_type = request.form.get('document_type', 'event_plan')
        
        if not event_description:
            return jsonify({
                'success': False,
                'error': 'event_description is required'
            }), 400
        
        # Handle file uploads if present
        images = request.files.getlist('images')
        image_paths = []
        
        if images:
            upload_folder = 'uploads/events'
            os.makedirs(upload_folder, exist_ok=True)
            
            for image in images:
                if image.filename:
                    filename = secure_filename(image.filename)
                    filepath = os.path.join(upload_folder, filename)
                    image.save(filepath)
                    image_paths.append(filepath)
        
        # Generate report using LLM
        llm = current_app.llm
        result = llm.generate_event_report(event_description, document_type)
        
        # Store in database
        db = current_app.db
        if db.is_connected():
            event_doc = {
                'event_description': event_description,
                'document_type': document_type,
                'generated_content': result,
                'image_paths': image_paths,
                'timestamp': None  # Will be set by MongoDB
            }
            # Save to MongoDB
            db.insert_one('events', event_doc)
        
        return jsonify({
            'success': True,
            'data': result,
            'metadata': {
                'event_description': event_description,
                'document_type': document_type,
                'images_uploaded': len(image_paths)
            }
        }), 200
    
    except Exception as e:
        print(f"Error in generate_event_report: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/list', methods=['GET'])
def list_events():
    """List all events"""
    try:
        db = current_app.db
        
        if not db.is_connected():
            return jsonify({
                'success': False,
                'error': 'Database not connected'
            }), 503
        
        events = db.find_many('events', limit=50)
        
        # Convert ObjectId to string for JSON serialization
        for event in events:
            if '_id' in event:
                event['_id'] = str(event['_id'])
        
        return jsonify({
            'success': True,
            'data': events,
            'count': len(events)
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
