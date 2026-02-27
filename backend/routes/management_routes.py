"""
Management Routes for Events, Members, Budget, and Reports
Provides CRUD operations for dashboard entities
"""

from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from datetime import datetime

bp = Blueprint('management', __name__, url_prefix='/api/management')


def serialize_doc(doc):
    """Convert MongoDB document to JSON-serializable format"""
    if doc is None:
        return None
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc


# ================================
# EVENTS ROUTES
# ================================

@bp.route('/events', methods=['GET'])
def get_events():
    """Get all events"""
    try:
        db = current_app.db.db
        events = list(db.events.find().sort('date', -1))
        return jsonify({
            'success': True,
            'count': len(events),
            'events': [serialize_doc(e) for e in events]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/events', methods=['POST'])
def create_event():
    """Create a new event"""
    try:
        data = request.json
        db = current_app.db.db
        
        # Validate required fields
        required_fields = ['name', 'date', 'venue']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'error': f'Missing required field: {field}'}), 400
        
        event = {
            'name': data['name'],
            'date': data['date'],
            'venue': data['venue'],
            'description': data.get('description', ''),
            'organizer': data.get('organizer', ''),
            'status': data.get('status', 'planned'),
            'budget_allocated': data.get('budget_allocated', 0),
            'attendees_expected': data.get('attendees_expected', 0),
            'category': data.get('category', 'General'),
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }
        
        result = db.events.insert_one(event)
        event['_id'] = str(result.inserted_id)
        
        return jsonify({
            'success': True,
            'message': 'Event created successfully',
            'event': event
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/events/<event_id>', methods=['PUT'])
def update_event(event_id):
    """Update an event"""
    try:
        data = request.json
        db = current_app.db.db
        
        # Remove _id if present
        data.pop('_id', None)
        data['updated_at'] = datetime.utcnow().isoformat()
        
        result = db.events.update_one(
            {'_id': ObjectId(event_id)},
            {'$set': data}
        )
        
        if result.matched_count == 0:
            return jsonify({'success': False, 'error': 'Event not found'}), 404
        
        updated_event = db.events.find_one({'_id': ObjectId(event_id)})
        
        return jsonify({
            'success': True,
            'message': 'Event updated successfully',
            'event': serialize_doc(updated_event)
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    """Delete an event"""
    try:
        db = current_app.db.db
        result = db.events.delete_one({'_id': ObjectId(event_id)})
        
        if result.deleted_count == 0:
            return jsonify({'success': False, 'error': 'Event not found'}), 404
        
        return jsonify({
            'success': True,
            'message': 'Event deleted successfully'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


# ================================
# MEMBERS ROUTES
# ================================

@bp.route('/members', methods=['GET'])
def get_members():
    """Get all members"""
    try:
        db = current_app.db.db
        members = list(db.members.find().sort('name', 1))
        return jsonify({
            'success': True,
            'count': len(members),
            'members': [serialize_doc(m) for m in members]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/members', methods=['POST'])
def create_member():
    """Create a new member"""
    try:
        data = request.json
        db = current_app.db.db
        
        # Validate required fields
        required_fields = ['name', 'email', 'role']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'error': f'Missing required field: {field}'}), 400
        
        # Check if email already exists
        if db.members.find_one({'email': data['email']}):
            return jsonify({'success': False, 'error': 'Email already exists'}), 400
        
        member = {
            'name': data['name'],
            'email': data['email'],
            'phone': data.get('phone', ''),
            'role': data['role'],
            'department': data.get('department', ''),
            'join_date': data.get('join_date', datetime.utcnow().isoformat()),
            'status': data.get('status', 'active'),
            'skills': data.get('skills', []),
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }
        
        result = db.members.insert_one(member)
        member['_id'] = str(result.inserted_id)
        
        return jsonify({
            'success': True,
            'message': 'Member added successfully',
            'member': member
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/members/<member_id>', methods=['PUT'])
def update_member(member_id):
    """Update a member"""
    try:
        data = request.json
        db = current_app.db.db
        
        # Remove _id if present
        data.pop('_id', None)
        data['updated_at'] = datetime.utcnow().isoformat()
        
        result = db.members.update_one(
            {'_id': ObjectId(member_id)},
            {'$set': data}
        )
        
        if result.matched_count == 0:
            return jsonify({'success': False, 'error': 'Member not found'}), 404
        
        updated_member = db.members.find_one({'_id': ObjectId(member_id)})
        
        return jsonify({
            'success': True,
            'message': 'Member updated successfully',
            'member': serialize_doc(updated_member)
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/members/<member_id>', methods=['DELETE'])
def delete_member(member_id):
    """Delete a member"""
    try:
        db = current_app.db.db
        result = db.members.delete_one({'_id': ObjectId(member_id)})
        
        if result.deleted_count == 0:
            return jsonify({'success': False, 'error': 'Member not found'}), 404
        
        return jsonify({
            'success': True,
            'message': 'Member deleted successfully'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


# ================================
# BUDGET ROUTES
# ================================

@bp.route('/budget', methods=['GET'])
def get_budget():
    """Get all budget items"""
    try:
        db = current_app.db.db
        budget_items = list(db.budget.find().sort('date', -1))
        
        # Calculate total
        total_income = sum(item['amount'] for item in budget_items if item.get('type') == 'income')
        total_expense = sum(item['amount'] for item in budget_items if item.get('type') == 'expense')
        balance = total_income - total_expense
        
        return jsonify({
            'success': True,
            'count': len(budget_items),
            'budget_items': [serialize_doc(b) for b in budget_items],
            'summary': {
                'total_income': total_income,
                'total_expense': total_expense,
                'balance': balance
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/budget', methods=['POST'])
def create_budget():
    """Create a new budget item"""
    try:
        data = request.json
        db = current_app.db.db
        
        # Validate required fields
        required_fields = ['title', 'amount', 'type', 'category']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'error': f'Missing required field: {field}'}), 400
        
        budget_item = {
            'title': data['title'],
            'amount': float(data['amount']),
            'type': data['type'],  # 'income' or 'expense'
            'category': data['category'],
            'description': data.get('description', ''),
            'date': data.get('date', datetime.utcnow().isoformat()),
            'status': data.get('status', 'pending'),
            'related_event': data.get('related_event', ''),
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }
        
        result = db.budget.insert_one(budget_item)
        budget_item['_id'] = str(result.inserted_id)
        
        return jsonify({
            'success': True,
            'message': 'Budget item created successfully',
            'budget_item': budget_item
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/budget/<budget_id>', methods=['PUT'])
def update_budget(budget_id):
    """Update a budget item"""
    try:
        data = request.json
        db = current_app.db.db
        
        # Remove _id if present
        data.pop('_id', None)
        if 'amount' in data:
            data['amount'] = float(data['amount'])
        data['updated_at'] = datetime.utcnow().isoformat()
        
        result = db.budget.update_one(
            {'_id': ObjectId(budget_id)},
            {'$set': data}
        )
        
        if result.matched_count == 0:
            return jsonify({'success': False, 'error': 'Budget item not found'}), 404
        
        updated_budget = db.budget.find_one({'_id': ObjectId(budget_id)})
        
        return jsonify({
            'success': True,
            'message': 'Budget item updated successfully',
            'budget_item': serialize_doc(updated_budget)
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/budget/<budget_id>', methods=['DELETE'])
def delete_budget(budget_id):
    """Delete a budget item"""
    try:
        db = current_app.db.db
        result = db.budget.delete_one({'_id': ObjectId(budget_id)})
        
        if result.deleted_count == 0:
            return jsonify({'success': False, 'error': 'Budget item not found'}), 404
        
        return jsonify({
            'success': True,
            'message': 'Budget item deleted successfully'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


# ================================
# REPORTS ROUTES
# ================================

@bp.route('/reports', methods=['GET'])
def get_reports():
    """Get all reports"""
    try:
        db = current_app.db.db
        reports = list(db.reports.find().sort('created_at', -1))
        return jsonify({
            'success': True,
            'count': len(reports),
            'reports': [serialize_doc(r) for r in reports]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/reports', methods=['POST'])
def create_report():
    """Create a new report"""
    try:
        data = request.json
        db = current_app.db.db
        
        # Validate required fields
        required_fields = ['title', 'type']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'error': f'Missing required field: {field}'}), 400
        
        report = {
            'title': data['title'],
            'type': data['type'],  # 'event', 'budget', 'feedback', etc.
            'content': data.get('content', ''),
            'summary': data.get('summary', ''),
            'generated_by': data.get('generated_by', 'System'),
            'related_event': data.get('related_event', ''),
            'file_path': data.get('file_path', ''),
            'status': data.get('status', 'draft'),
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }
        
        result = db.reports.insert_one(report)
        report['_id'] = str(result.inserted_id)
        
        return jsonify({
            'success': True,
            'message': 'Report created successfully',
            'report': report
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/reports/<report_id>', methods=['PUT'])
def update_report(report_id):
    """Update a report"""
    try:
        data = request.json
        db = current_app.db.db
        
        # Remove _id if present
        data.pop('_id', None)
        data['updated_at'] = datetime.utcnow().isoformat()
        
        result = db.reports.update_one(
            {'_id': ObjectId(report_id)},
            {'$set': data}
        )
        
        if result.matched_count == 0:
            return jsonify({'success': False, 'error': 'Report not found'}), 404
        
        updated_report = db.reports.find_one({'_id': ObjectId(report_id)})
        
        return jsonify({
            'success': True,
            'message': 'Report updated successfully',
            'report': serialize_doc(updated_report)
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@bp.route('/reports/<report_id>', methods=['DELETE'])
def delete_report(report_id):
    """Delete a report"""
    try:
        db = current_app.db.db
        result = db.reports.delete_one({'_id': ObjectId(report_id)})
        
        if result.deleted_count == 0:
            return jsonify({'success': False, 'error': 'Report not found'}), 404
        
        return jsonify({
            'success': True,
            'message': 'Report deleted successfully'
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


# ================================
# DASHBOARD STATS
# ================================

@bp.route('/stats', methods=['GET'])
def get_stats():
    """Get dashboard statistics"""
    try:
        db = current_app.db.db
        
        # Count documents in each collection
        events_count = db.events.count_documents({})
        members_count = db.members.count_documents({})
        reports_count = db.reports.count_documents({})
        
        # Calculate budget balance
        budget_items = list(db.budget.find())
        total_income = sum(item['amount'] for item in budget_items if item.get('type') == 'income')
        total_expense = sum(item['amount'] for item in budget_items if item.get('type') == 'expense')
        budget_balance = total_income - total_expense
        
        return jsonify({
            'success': True,
            'stats': {
                'events': events_count,
                'members': members_count,
                'budget': budget_balance,
                'reports': reports_count
            }
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
