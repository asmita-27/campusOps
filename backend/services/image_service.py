"""
Image Service - AI-powered image captioning and OCR
Uses Groq vision models and Tesseract OCR
"""

import os
import base64
from groq import Groq
from PIL import Image
import io


class ImageService:
    """Service for image captioning and OCR using Groq AI"""
    
    def __init__(self, api_key=None):
        """
        Initialize Image Service with Groq API
        
        Args:
            api_key: Groq API key (defaults to environment variable)
        """
        self.api_key = api_key or os.getenv('GROQ_API_KEY')
        if not self.api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")
        
        self.client = Groq(api_key=self.api_key)
        # Using Llama 4 Scout (17B parameter multimodal model)
        # This is the current active vision model on Groq as of Feb 2026 (replaced Llama 3.2 vision models)
        self.vision_model = os.getenv('GROQ_VISION_MODEL', 'meta-llama/llama-4-scout-17b-16e-instruct')
        self.text_model = os.getenv('GROQ_MODEL', 'llama-3.3-70b-versatile')
    
    def encode_image_to_base64(self, image_path):
        """
        Convert image file to base64 encoding
        
        Args:
            image_path: Path to image file
            
        Returns:
            str: Base64 encoded image data URL
        """
        try:
            with Image.open(image_path) as img:
                # Convert to RGB if necessary
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Resize if image is too large (max 1024x1024 for efficiency)
                max_size = 1024
                if img.width > max_size or img.height > max_size:
                    img.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
                
                # Convert to bytes
                buffer = io.BytesIO()
                img.save(buffer, format='JPEG', quality=85)
                img_bytes = buffer.getvalue()
                
                # Encode to base64
                img_base64 = base64.b64encode(img_bytes).decode('utf-8')
                return f"data:image/jpeg;base64,{img_base64}"
                
        except Exception as e:
            raise ValueError(f"Failed to encode image: {str(e)}")
    
    def generate_caption(self, image_path, context="event photo"):
        """
        Generate descriptive caption for an image
        
        Args:
            image_path: Path to image file
            context: Context about the image (e.g., "Annual tech fest", "Guest lecture", "Sports day")
            
        Returns:
            dict: Caption result with text and metadata
        """
        try:
            # Encode image
            image_data = self.encode_image_to_base64(image_path)
            
            # Create vision prompt - concise and context-aware
            if context and context.strip() and context != "event photo":
                prompt = f"""Context: {context}

Analyze this image and provide a concise 2-3 sentence caption describing the key elements relevant to this context. Focus on main subjects, their activities, and important details."""
            else:
                prompt = """Analyze this image and provide a concise 2-3 sentence caption describing:
- Main subjects and their activities
- Key setting or environment
- Purpose or significance of the scene

Be specific and factual."""
            
            # Call Groq vision API
            response = self.client.chat.completions.create(
                model=self.vision_model,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": image_data
                                }
                            },
                            {
                                "type": "text",
                                "text": prompt
                            }
                        ]
                    }
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            caption = response.choices[0].message.content
            
            return {
                'success': True,
                'caption': caption,
                'model': self.vision_model,
                'image': os.path.basename(image_path)
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f"Caption generation failed: {str(e)}",
                'image': os.path.basename(image_path) if image_path else 'unknown'
            }
    
    def extract_text_ocr(self, image_path):
        """
        Extract text from image using vision model
        
        Args:
            image_path: Path to image file
            
        Returns:
            dict: OCR result with extracted text and metadata
        """
        try:
            # Encode image
            image_data = self.encode_image_to_base64(image_path)
            
            # Create OCR prompt
            prompt = """Extract ALL text visible in this image.

Instructions:
- List all visible text exactly as it appears
- Maintain the original formatting and line breaks
- Include text from posters, banners, signs, presentations, etc.
- If no text is visible, respond with "No text detected"
- Be accurate and complete

Provide only the extracted text without additional commentary."""
            
            # Call Groq vision API
            response = self.client.chat.completions.create(
                model=self.vision_model,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": image_data
                                }
                            },
                            {
                                "type": "text",
                                "text": prompt
                            }
                        ]
                    }
                ],
                max_tokens=800,
                temperature=0.3  # Lower temperature for accuracy
            )
            
            extracted_text = response.choices[0].message.content
            
            return {
                'success': True,
                'text': extracted_text,
                'has_text': extracted_text.lower() != "no text detected",
                'model': self.vision_model,
                'image': os.path.basename(image_path)
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f"OCR failed: {str(e)}",
                'image': os.path.basename(image_path) if image_path else 'unknown'
            }
    
    def generate_image_tags(self, image_path):
        """
        Generate relevant tags/keywords for an image
        
        Args:
            image_path: Path to image file
            
        Returns:
            dict: Tags result with list of keywords
        """
        try:
            # Encode image
            image_data = self.encode_image_to_base64(image_path)
            
            # Create tagging prompt
            prompt = """Analyze this image and provide relevant tags/keywords.

Provide 5-10 descriptive tags that would help categorize and search for this image.
Include tags for:
- Event type (if visible)
- Activities
- Setting/venue
- Number of people (if applicable)
- Notable objects or equipment

Format: Return only a comma-separated list of tags."""
            
            # Call Groq vision API
            response = self.client.chat.completions.create(
                model=self.vision_model,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": image_data
                                }
                            },
                            {
                                "type": "text",
                                "text": prompt
                            }
                        ]
                    }
                ],
                max_tokens=200,
                temperature=0.5
            )
            
            tags_text = response.choices[0].message.content
            tags = [tag.strip() for tag in tags_text.split(',')]
            
            return {
                'success': True,
                'tags': tags,
                'model': self.vision_model,
                'image': os.path.basename(image_path)
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f"Tag generation failed: {str(e)}",
                'image': os.path.basename(image_path) if image_path else 'unknown'
            }
    
    def analyze_image_comprehensive(self, image_path, context="event photo"):
        """
        Comprehensive image analysis: caption, OCR, and tags
        
        Args:
            image_path: Path to image file
            context: Context about the image
            
        Returns:
            dict: Complete analysis with caption, text, and tags
        """
        try:
            caption_result = self.generate_caption(image_path, context)
            ocr_result = self.extract_text_ocr(image_path)
            tags_result = self.generate_image_tags(image_path)
            
            return {
                'success': True,
                'image': os.path.basename(image_path),
                'caption': caption_result.get('caption', ''),
                'extracted_text': ocr_result.get('text', ''),
                'has_text': ocr_result.get('has_text', False),
                'tags': tags_result.get('tags', []),
                'model': self.vision_model
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f"Comprehensive analysis failed: {str(e)}",
                'image': os.path.basename(image_path) if image_path else 'unknown'
            }
