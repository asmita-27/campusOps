"""
Test script for Event Report Generator with Template Matching
Run this after starting the backend server to test the feature
"""
import requests
import json
import os

# Configuration
API_URL = "http://localhost:8000/api/events/generate"
TEMPLATE_PATH = "sample_event_template.txt"

# Test event descriptions
TEST_EVENTS = [
    {
        "name": "AI Workshop",
        "description": """Technical workshop on Artificial Intelligence and Machine Learning. 
3-day event with 200 participants. Includes hands-on sessions with Python and TensorFlow, 
guest lectures from industry experts, project presentations, and certification. 
Venue: College Auditorium. Budget: ₹50,000. 
Schedule: Day 1 - Introduction to AI, Day 2 - Deep Learning, Day 3 - Project Work.""",
        "type": "event_plan"
    },
    {
        "name": "Hackathon 2026",
        "description": """24-hour coding hackathon for students. 150 teams expected. 
Themes: Web Development, Mobile Apps, AI/ML, IoT. Prizes worth ₹2 lakhs. 
Food and refreshments provided. Mentors from top tech companies. 
Venue: Computer Science Block. Date: March 15-16, 2026.""",
        "type": "event_plan"
    },
    {
        "name": "Cultural Fest Summary",
        "description": """Annual cultural fest concluded successfully with 500+ participants. 
Multiple events: singing, dancing, drama, fashion show. Chief guest: Famous actor. 
Sponsorship: ₹1 lakh. High student engagement. Social media reach: 50K impressions. 
Overall satisfaction: 4.5/5. Date: February 20-21, 2026.""",
        "type": "summary"
    }
]


def test_without_template(event):
    """Test report generation WITHOUT template"""
    print(f"\n{'='*60}")
    print(f"TEST: {event['name']} (WITHOUT TEMPLATE)")
    print('='*60)
    
    data = {
        'event_description': event['description'],
        'document_type': event['type']
    }
    
    try:
        response = requests.post(API_URL, data=data)
        result = response.json()
        
        if result.get('success'):
            print("✅ SUCCESS")
            print(f"Template Used: {result.get('metadata', {}).get('template_used', False)}")
            print("\nGenerated Content (first 500 chars):")
            print("-" * 60)
            content = result.get('data', {})
            if isinstance(content, dict):
                print(json.dumps(content, indent=2)[:500] + "...")
            else:
                print(str(content)[:500] + "...")
        else:
            print(f"❌ FAILED: {result.get('error')}")
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")


def test_with_template(event):
    """Test report generation WITH template"""
    print(f"\n{'='*60}")
    print(f"TEST: {event['name']} (WITH TEMPLATE)")
    print('='*60)
    
    if not os.path.exists(TEMPLATE_PATH):
        print(f"❌ Template file not found: {TEMPLATE_PATH}")
        print("   Please ensure sample_event_template.txt is in the project root")
        return
    
    data = {
        'event_description': event['description'],
        'document_type': event['type']
    }
    
    files = {
        'template': open(TEMPLATE_PATH, 'rb')
    }
    
    try:
        response = requests.post(API_URL, data=data, files=files)
        result = response.json()
        
        if result.get('success'):
            print("✅ SUCCESS")
            metadata = result.get('metadata', {})
            print(f"Template Used: {metadata.get('template_used', False)}")
            print(f"Template Format: {metadata.get('template_format', 'N/A')}")
            
            data_content = result.get('data', {})
            if isinstance(data_content, dict):
                print(f"Template Matched: {data_content.get('template_matched', False)}")
                print(f"Word Count: {data_content.get('word_count', 0)}")
                print(f"Sections Found: {len(data_content.get('template_sections', []))}")
                
                print("\nGenerated Content (first 800 chars):")
                print("-" * 60)
                content = data_content.get('content', '')
                print(content[:800] + "..." if len(content) > 800 else content)
            else:
                print("\nGenerated Content:")
                print("-" * 60)
                print(str(data_content)[:500] + "...")
        else:
            print(f"❌ FAILED: {result.get('error')}")
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
    finally:
        files['template'].close()


def check_server():
    """Check if backend server is running"""
    try:
        response = requests.get("http://localhost:8000/health", timeout=2)
        if response.status_code == 200:
            return True
    except:
        pass
    return False


def main():
    print("\n" + "="*60)
    print("  EVENT REPORT GENERATOR - TEMPLATE MATCHING TEST")
    print("="*60)
    
    # Check server
    print("\nChecking backend server...")
    if not check_server():
        print("❌ Backend server is not running!")
        print("   Please start the server: cd backend && python main.py")
        return
    print("✅ Backend server is running")
    
    # Check template file
    if os.path.exists(TEMPLATE_PATH):
        print(f"✅ Template file found: {TEMPLATE_PATH}")
    else:
        print(f"⚠️  Template file not found: {TEMPLATE_PATH}")
        print("   Template tests will be skipped")
    
    # Run tests
    print("\n" + "="*60)
    print("STARTING TESTS")
    print("="*60)
    
    for event in TEST_EVENTS[:2]:  # Test first 2 events
        # Test without template
        test_without_template(event)
        
        # Test with template
        if os.path.exists(TEMPLATE_PATH):
            test_with_template(event)
    
    # Final summary
    print("\n" + "="*60)
    print("TEST COMPLETED")
    print("="*60)
    print("\n📊 Compare the outputs:")
    print("   - WITHOUT template: JSON format (default)")
    print("   - WITH template: Matches sample_event_template.txt structure")
    print("\n💡 Next Steps:")
    print("   1. Test in the web UI (Dashboard → Event Report Generator)")
    print("   2. Upload your own club's template")
    print("   3. Compare AI output with your template format")
    print("\n📖 Read TEMPLATE_MATCHING_GUIDE.md for detailed documentation\n")


if __name__ == "__main__":
    main()
