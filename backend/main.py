"""
CampusOps Backend - Flask Application
Main entry point for the Flask API server
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Import configuration and services
from config import Config
from database.mongodb_client import MongoDBClient
from services.llm_service import LLMService
from routes import event_routes, feedback_routes, rag_routes, auth_routes

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for frontend communication
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000", "http://localhost:3001"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize services
db_client = MongoDBClient()
llm_service = LLMService()

# Make services available to routes
app.db = db_client
app.llm = llm_service

# Register blueprints
app.register_blueprint(event_routes.bp)
app.register_blueprint(feedback_routes.bp)
app.register_blueprint(rag_routes.bp)
app.register_blueprint(auth_routes.bp)


@app.route('/', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'CampusOps API is running',
        'version': '1.0.0',
        'services': {
            'database': db_client.is_connected(),
            'llm': llm_service.is_available()
        }
    }), 200


@app.route('/test', methods=['GET'])
def test():
    """Test endpoint"""
    return jsonify({
        'message': 'Test endpoint working!',
        'mongo_connected': db_client.is_connected()
    }), 200


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500


if __name__ == '__main__':
    # Print startup information
    print("=" * 50)
    print("🚀 Starting CampusOps Backend Server")
    print("=" * 50)
    print(f"Environment: {os.getenv('FLASK_ENV', 'production')}")
    print(f"MongoDB: {db_client.is_connected()}")
    print(f"LLM Service: {llm_service.is_available()}")
    print(f"Server: http://{app.config['HOST']}:{app.config['PORT']}")
    print("=" * 50)
    
    # Run the app
    app.run(
        host=app.config['HOST'],
        port=app.config['PORT'],
        debug=app.config['DEBUG']
    )
