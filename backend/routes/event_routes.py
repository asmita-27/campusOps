"""
Event-related API routes
"""
from flask import Blueprint, request, jsonify, current_app, send_file
from werkzeug.utils import secure_filename
from services.template_analyzer import TemplateAnalyzer
from services.document_generator import DocumentGenerator
import os

bp = Blueprint('events', __name__, url_prefix='/api/events')


@bp.route('/generate', methods=['POST'])
def generate_event_report():
    """Generate event report/plan/summary with optional template"""
    try:
        # Get form data
        event_description = request.form.get('event_description')
        document_type = request.form.get('document_type', 'event_plan')
        output_format = request.form.get('output_format', 'text')  # 'text' or 'document'
        
        if not event_description:
            return jsonify({
                'success': False,
                'error': 'event_description is required'
            }), 400
        
        # Handle template file upload
        template_file = request.files.get('template')
        template_path = None
        template_analysis = None
        
        if template_file and template_file.filename:
            upload_folder = 'uploads/templates'
            os.makedirs(upload_folder, exist_ok=True)
            
            filename = secure_filename(template_file.filename)
            template_path = os.path.join(upload_folder, filename)
            template_file.save(template_path)
            
            # Analyze template
            analyzer = TemplateAnalyzer()
            template_analysis = analyzer.analyze_template(template_path)
            
            if not template_analysis.get('success'):
                return jsonify({
                    'success': False,
                    'error': f"Template analysis failed: {template_analysis.get('error')}"
                }), 400
        
        # Handle image uploads if present
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
        
        # Generate report using LLM with template awareness
        llm = current_app.llm
        result = llm.generate_event_report_with_template(
            event_description, 
            document_type,
            template_analysis
        )
        
        # Prepare metadata
        metadata = {
            'event_description': event_description,
            'document_type': document_type,
            'images_uploaded': len(image_paths),
            'image_paths': image_paths,  # Pass image paths
            'template_used': template_path is not None,
            'template_format': template_analysis.get('format') if template_analysis else None
        }
        
        # Store in database
        db = current_app.db
        if db.is_connected():
            event_doc = {
                'event_description': event_description,
                'document_type': document_type,
                'generated_content': result,
                'image_paths': image_paths,
                'template_used': template_path is not None,
                'template_path': template_path,
                'output_format': output_format,
                'timestamp': None  # Will be set by MongoDB
            }
            # Save to MongoDB
            db.insert_one('events', event_doc)
        
        # Return based on output format
        if output_format == 'document':
            # Generate DOCX document
            doc_generator = DocumentGenerator()
            doc_result = doc_generator.generate_event_document(
                result, 
                document_type, 
                metadata
            )
            
            if doc_result.get('success'):
                # Send file as download
                return send_file(
                    doc_result['filepath'],
                    as_attachment=True,
                    download_name=doc_result['filename'],
                    mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                )
            else:
                return jsonify({
                    'success': False,
                    'error': f"Document generation failed: {doc_result.get('error')}"
                }), 500
        
        else:
            # Return text format (JSON)
            return jsonify({
                'success': True,
                'data': result,
                'metadata': metadata
            }), 200
    
    except Exception as e:
        print(f"Error in generate_event_report: {e}")
        import traceback
        traceback.print_exc()
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
