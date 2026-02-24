"""
Authentication API routes
"""
from flask import Blueprint, request, jsonify, current_app
import jwt
from datetime import datetime, timedelta
import os
import bcrypt

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# Hardcoded clubs for prototype (will move to database)
DEMO_CLUBS = {
    'tech_club': {
        'password': 'tech123',
        'name': 'Technology Club',
        'id': 'tech_club',
        'email': 'tech@example.com',
        'description': 'Innovation and Technology',
        'color': '#3498db'
    },
    'cultural_club': {
        'password': 'culture123',
        'name': 'Cultural Club',
        'id': 'cultural_club',
        'email': 'cultural@example.com',
        'description': 'Arts and Culture',
        'color': '#e74c3c'
    },
    'sports_club': {
        'password': 'sports123',
        'name': 'Sports Club',
        'id': 'sports_club',
        'email': 'sports@example.com',
        'description': 'Athletics and Wellness',
        'color': '#2ecc71'
    },
    'robotics_club': {
        'password': 'robo123',
        'name': 'Robotics Club',
        'id': 'robotics_club',
        'email': 'robotics@example.com',
        'description': 'Robotics and Automation',
        'color': '#9b59b6'
    }
}


@bp.route('/login', methods=['POST'])
def login():
    """Login endpoint - authenticate with email and password"""
    try:
        data = request.get_json()
        
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({
                'success': False,
                'error': 'Email and password are required'
            }), 400
        
        # Check in demo clubs first
        club = None
        club_id = None
        
        for cid, club_data in DEMO_CLUBS.items():
            if club_data['email'].lower() == email:
                club = club_data
                club_id = cid
                break
        
        # If not found in demo clubs, check MongoDB with case-insensitive search
        if not club:
            db = current_app.db
            if db.is_connected():
                # Case-insensitive email search using regex
                db_club = db.find_one('clubs', {
                    'email': {'$regex': f'^{email}$', '$options': 'i'}
                })
                
                if db_club:
                    club = db_club
                    club_id = db_club.get('club_id')
        
        if not club:
            return jsonify({
                'success': False,
                'error': 'Invalid email or password'
            }), 401
        
        # Verify password
        if club['password'] != password:
            return jsonify({
                'success': False,
                'error': 'Invalid email or password'
            }), 401
        
        # Generate JWT token
        secret_key = os.getenv('JWT_SECRET_KEY', 'default-secret-key')
        expiration = datetime.utcnow() + timedelta(hours=24)
        
        token = jwt.encode({
            'club_id': club_id,
            'club_name': club.get('name') or club.get('club_name'),
            'email': email,
            'exp': expiration
        }, secret_key, algorithm='HS256')
        
        return jsonify({
            'success': True,
            'data': {
                'token': token,
                'club': {
                    'id': club.get('id') or club.get('club_id'),
                    'name': club.get('name') or club.get('club_name'),
                    'description': club.get('description', ''),
                    'color': club.get('color', '#3498db'),
                    'email': email
                }
            }
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/clubs', methods=['GET'])
def list_clubs():
    """List all available clubs"""
    clubs = [
        {
            'id': club_id,
            'name': club_data['name'],
            'description': club_data['description'],
            'color': club_data['color']
        }
        for club_id, club_data in DEMO_CLUBS.items()
    ]
    
    return jsonify({
        'success': True,
        'data': clubs
    }), 200


@bp.route('/signup', methods=['POST'])
def signup():
    """Register a new club"""
    try:
        data = request.get_json()
        
        club_name = data.get('club_name', '')
        club_id = data.get('club_id', '')
        email = data.get('email', '').strip().lower()  # Normalize email to lowercase
        password = data.get('password', '')
        description = data.get('description', '')
        color = data.get('color', '#3498db')
        
        # Validation
        if not all([club_name, club_id, email, password]):
            return jsonify({
                'success': False,
                'error': 'All required fields must be provided'
            }), 400
        
        # Check if club_id already exists
        if club_id in DEMO_CLUBS:
            return jsonify({
                'success': False,
                'error': 'Club ID already exists. Please choose a different name.'
            }), 409
        
        # Check if email already exists (case-insensitive)
        existing_emails = [club.get('email', '').lower() for club in DEMO_CLUBS.values()]
        if email in existing_emails:
            return jsonify({
                'success': False,
                'error': 'Email already registered'
            }), 409
        
        # Save to MongoDB if connected
        db = current_app.db
        if db.is_connected():
            # Check in database (case-insensitive)
            existing_club = db.find_one('clubs', {'$or': [
                {'club_id': club_id},
                {'email': {'$regex': f'^{email}$', '$options': 'i'}}
            ]})
            
            if existing_club:
                return jsonify({
                    'success': False,
                    'error': 'Club ID or email already exists'
                }), 409
            
            # Insert new club
            club_doc = {
                'club_id': club_id,
                'club_name': club_name,
                'email': email,
                'password': password,  # In production, hash this!
                'description': description,
                'color': color,
                'created_at': datetime.utcnow(),
                'events_count': 0,
                'members_count': 0
            }
            
            db.insert_one('clubs', club_doc)
        
        # Also add to in-memory dict for demo
        DEMO_CLUBS[club_id] = {
            'password': password,
            'name': club_name,
            'id': club_id,
            'email': email,
            'description': description,
            'color': color
        }
        
        return jsonify({
            'success': True,
            'message': 'Club registered successfully',
            'data': {
                'club_id': club_id,
                'club_name': club_name,
                'email': email
            }
        }), 201
    
    except Exception as e:
        print(f"Signup error: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
