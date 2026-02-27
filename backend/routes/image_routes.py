"""
Image Service Routes
Handles image captioning and OCR requests
"""

from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
from services.image_service import ImageService

bp = Blueprint('image', __name__, url_prefix='/api/image')

# Initialize ImageService
image_service = None

def get_image_service():
    """Get or create ImageService instance"""
    global image_service
    if image_service is None:
        image_service = ImageService()
    return image_service


@bp.route('/caption', methods=['POST'])
def caption_images():
    """
    Generate captions for uploaded images
    
    Expects:
        - images: Multiple image files
        - context: Optional context about images (default: 'event photo')
    
    Returns:
        JSON with captions for each image
    """
    try:
        # Check if images are provided
        if 'images' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No images provided'
            }), 400
        
        images = request.files.getlist('images')
        context = request.form.get('context', 'event photo')
        
        if not images or all(img.filename == '' for img in images):
            return jsonify({
                'success': False,
                'error': 'No images selected'
            }), 400
        
        # Create uploads directory if it doesn't exist
        upload_folder = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads', 'images')
        os.makedirs(upload_folder, exist_ok=True)
        
        # Process each image
        results = []
        service = get_image_service()
        
        for image in images:
            if image and image.filename:
                # Save image temporarily
                filename = secure_filename(image.filename)
                filepath = os.path.join(upload_folder, filename)
                image.save(filepath)
                
                # Generate caption
                result = service.generate_caption(filepath, context)
                results.append(result)
                
                # Clean up temporary file
                try:
                    os.remove(filepath)
                except:
                    pass
        
        return jsonify({
            'success': True,
            'count': len(results),
            'results': results
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Caption generation failed: {str(e)}'
        }), 500


@bp.route('/ocr', methods=['POST'])
def ocr_images():
    """
    Extract text from uploaded images using OCR
    
    Expects:
        - images: Multiple image files
    
    Returns:
        JSON with extracted text for each image
    """
    try:
        # Check if images are provided
        if 'images' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No images provided'
            }), 400
        
        images = request.files.getlist('images')
        
        if not images or all(img.filename == '' for img in images):
            return jsonify({
                'success': False,
                'error': 'No images selected'
            }), 400
        
        # Create uploads directory if it doesn't exist
        upload_folder = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads', 'images')
        os.makedirs(upload_folder, exist_ok=True)
        
        # Process each image
        results = []
        service = get_image_service()
        
        for image in images:
            if image and image.filename:
                # Save image temporarily
                filename = secure_filename(image.filename)
                filepath = os.path.join(upload_folder, filename)
                image.save(filepath)
                
                # Extract text
                result = service.extract_text_ocr(filepath)
                results.append(result)
                
                # Clean up temporary file
                try:
                    os.remove(filepath)
                except:
                    pass
        
        return jsonify({
            'success': True,
            'count': len(results),
            'results': results
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'OCR failed: {str(e)}'
        }), 500


@bp.route('/analyze', methods=['POST'])
def analyze_images():
    """
    Comprehensive image analysis: captions, OCR, and tags
    
    Expects:
        - images: Multiple image files
        - context: Optional context about images
    
    Returns:
        JSON with complete analysis for each image
    """
    try:
        # Check if images are provided
        if 'images' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No images provided'
            }), 400
        
        images = request.files.getlist('images')
        context = request.form.get('context', 'event photo')
        
        if not images or all(img.filename == '' for img in images):
            return jsonify({
                'success': False,
                'error': 'No images selected'
            }), 400
        
        # Create uploads directory if it doesn't exist
        upload_folder = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads', 'images')
        os.makedirs(upload_folder, exist_ok=True)
        
        # Process each image
        results = []
        service = get_image_service()
        
        for image in images:
            if image and image.filename:
                # Save image temporarily
                filename = secure_filename(image.filename)
                filepath = os.path.join(upload_folder, filename)
                image.save(filepath)
                
                # Comprehensive analysis
                result = service.analyze_image_comprehensive(filepath, context)
                results.append(result)
                
                # Clean up temporary file
                try:
                    os.remove(filepath)
                except:
                    pass
        
        return jsonify({
            'success': True,
            'count': len(results),
            'results': results
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Image analysis failed: {str(e)}'
        }), 500


@bp.route('/tags', methods=['POST'])
def tag_images():
    """
    Generate tags/keywords for uploaded images
    
    Expects:
        - images: Multiple image files
    
    Returns:
        JSON with tags for each image
    """
    try:
        # Check if images are provided
        if 'images' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No images provided'
            }), 400
        
        images = request.files.getlist('images')
        
        if not images or all(img.filename == '' for img in images):
            return jsonify({
                'success': False,
                'error': 'No images selected'
            }), 400
        
        # Create uploads directory if it doesn't exist
        upload_folder = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads', 'images')
        os.makedirs(upload_folder, exist_ok=True)
        
        # Process each image
        results = []
        service = get_image_service()
        
        for image in images:
            if image and image.filename:
                # Save image temporarily
                filename = secure_filename(image.filename)
                filepath = os.path.join(upload_folder, filename)
                image.save(filepath)
                
                # Generate tags
                result = service.generate_image_tags(filepath)
                results.append(result)
                
                # Clean up temporary file
                try:
                    os.remove(filepath)
                except:
                    pass
        
        return jsonify({
            'success': True,
            'count': len(results),
            'results': results
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Tag generation failed: {str(e)}'
        }), 500
