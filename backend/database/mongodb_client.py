"""
MongoDB Client for database operations
"""
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
import os
from dotenv import load_dotenv

load_dotenv()


class MongoDBClient:
    """MongoDB client wrapper for database operations"""
    
    def __init__(self):
        self.uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
        self.db_name = os.getenv('MONGODB_DB_NAME', 'campusops')
        self.client = None
        self.db = None
        self._connect()
    
    def _connect(self):
        """Establish connection to MongoDB"""
        try:
            self.client = MongoClient(
                self.uri,
                serverSelectionTimeoutMS=5000
            )
            # Test the connection
            self.client.admin.command('ping')
            self.db = self.client[self.db_name]
            print(f"✅ Connected to MongoDB: {self.db_name}")
        except (ConnectionFailure, ServerSelectionTimeoutError) as e:
            print(f"⚠️  MongoDB connection failed: {e}")
            print("⚠️  Operating without database - some features will be limited")
            self.client = None
            self.db = None
    
    def is_connected(self):
        """Check if connected to MongoDB"""
        if self.client is None:
            return False
        try:
            self.client.admin.command('ping')
            return True
        except:
            return False
    
    def get_collection(self, collection_name):
        """Get a collection from the database"""
        if self.db is None:
            return None
        return self.db[collection_name]
    
    def insert_one(self, collection_name, document):
        """Insert a single document"""
        if self.db is None:
            return None
        collection = self.get_collection(collection_name)
        result = collection.insert_one(document)
        return result.inserted_id
    
    def find_one(self, collection_name, query):
        """Find a single document"""
        if self.db is None:
            return None
        collection = self.get_collection(collection_name)
        return collection.find_one(query)
    
    def find_many(self, collection_name, query=None, limit=100):
        """Find multiple documents"""
        if self.db is None:
            return []
        collection = self.get_collection(collection_name)
        query = query or {}
        return list(collection.find(query).limit(limit))
    
    def update_one(self, collection_name, query, update):
        """Update a single document"""
        if self.db is None:
            return None
        collection = self.get_collection(collection_name)
        result = collection.update_one(query, {'$set': update})
        return result.modified_count
    
    def delete_one(self, collection_name, query):
        """Delete a single document"""
        if self.db is None:
            return None
        collection = self.get_collection(collection_name)
        result = collection.delete_one(query)
        return result.deleted_count
    
    def close(self):
        """Close the database connection"""
        if self.client:
            self.client.close()
            print("MongoDB connection closed")


# Collections schema reference
COLLECTIONS = {
    'users': 'User accounts and authentication',
    'clubs': 'Club information and settings',
    'events': 'Event data and history',
    'budgets': 'Budget records and financial data',
    'feedback': 'Feedback submissions and analysis',
    'documents': 'Generated documents (MOUs, proposals, reports)',
    'files': 'File metadata (actual files in GridFS)'
}
