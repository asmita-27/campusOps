"""
LLM Service using Groq API
Handles all AI text generation tasks
"""
import os
from groq import Groq
from dotenv import load_dotenv
import json

load_dotenv()


class LLMService:
    """LLM service for AI-powered text generation"""
    
    def __init__(self):
        self.api_key = os.getenv('GROQ_API_KEY')
        self.client = None
        self.default_model = "llama-3.3-70b-versatile"
        
        if self.api_key:
            try:
                self.client = Groq(api_key=self.api_key)
                print("✅ Groq LLM Service initialized")
            except Exception as e:
                print(f"⚠️  Groq initialization failed: {e}")
                self.client = None
        else:
            print("⚠️  GROQ_API_KEY not found in environment")
    
    def is_available(self):
        """Check if LLM service is available"""
        return self.client is not None
    
    def generate_text(self, prompt, system_prompt=None, max_tokens=2000, temperature=0.7):
        """
        Generate text using Groq API
        
        Args:
            prompt: User prompt
            system_prompt: System prompt for context
            max_tokens: Maximum tokens in response
            temperature: Creativity level (0-1)
        
        Returns:
            Generated text string
        """
        if not self.is_available():
            return "LLM service is not available. Please check your API key."
        
        try:
            messages = []
            
            if system_prompt:
                messages.append({
                    "role": "system",
                    "content": system_prompt
                })
            
            messages.append({
                "role": "user",
                "content": prompt
            })
            
            response = self.client.chat.completions.create(
                model=self.default_model,
                messages=messages,
                max_tokens=max_tokens,
                temperature=temperature
            )
            
            return response.choices[0].message.content
        
        except Exception as e:
            print(f"Error in generate_text: {e}")
            return f"Error generating text: {str(e)}"
    
    def generate_json(self, prompt, system_prompt=None, max_tokens=2000):
        """
        Generate JSON output using Groq API
        
        Args:
            prompt: User prompt
            system_prompt: System prompt for context
            max_tokens: Maximum tokens in response
        
        Returns:
            Dictionary parsed from JSON response
        """
        if not system_prompt:
            system_prompt = "You are a helpful assistant that responds in valid JSON format."
        else:
            system_prompt += "\n\nIMPORTANT: Always respond with valid JSON only."
        
        text_response = self.generate_text(
            prompt=prompt,
            system_prompt=system_prompt,
            max_tokens=max_tokens,
            temperature=0.5
        )
        
        try:
            # Try to extract JSON from markdown code blocks
            if "```json" in text_response:
                json_str = text_response.split("```json")[1].split("```")[0].strip()
            elif "```" in text_response:
                json_str = text_response.split("```")[1].split("```")[0].strip()
            else:
                json_str = text_response.strip()
            
            return json.loads(json_str)
        
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            print(f"Response was: {text_response}")
            return {
                "error": "Failed to parse JSON response",
                "raw_response": text_response
            }
    
    def generate_event_report(self, event_description, document_type="event_plan"):
        """Generate event report/plan"""
        
        system_prompt = """You are an expert event planner and report generator. 
Generate comprehensive, professional event documentation in JSON format."""
        
        prompts = {
            "event_plan": f"""Create a detailed event plan for: {event_description}

Generate a JSON response with this structure:
{{
    "title": "Event title",
    "overview": "Brief overview",
    "objectives": ["objective 1", "objective 2", "objective 3"],
    "timeline": [
        {{"phase": "Planning", "duration": "2 weeks", "tasks": ["task1", "task2"]}},
        {{"phase": "Execution", "duration": "1 day", "tasks": ["task1", "task2"]}},
        {{"phase": "Follow-up", "duration": "1 week", "tasks": ["task1", "task2"]}}
    ],
    "resources": {{
        "venue": "venue details",
        "equipment": ["item1", "item2"],
        "staff": ["role1", "role2"]
    }},
    "budget_estimate": {{
        "venue": 5000,
        "catering": 3000,
        "marketing": 1000,
        "equipment": 2000,
        "miscellaneous": 1000,
        "total": 12000
    }},
    "risk_mitigation": ["risk 1 and solution", "risk 2 and solution"]
}}""",
            
            "summary": f"""Create an event summary for: {event_description}

Generate a JSON response with this structure:
{{
    "event_name": "Name",
    "date": "Date/Time",
    "attendance": "Number of attendees",
    "highlights": ["highlight 1", "highlight 2", "highlight 3"],
    "achievements": ["achievement 1", "achievement 2"],
    "key_takeaways": ["takeaway 1", "takeaway 2"],
    "feedback_summary": "Overall feedback",
    "next_steps": ["action 1", "action 2"]
}}""",
            
            "report": f"""Create a detailed event report for: {event_description}

Generate a JSON response with this structure:
{{
    "executive_summary": "Brief overview",
    "event_details": {{
        "name": "Event name",
        "date": "Date",
        "location": "Location",
        "attendance": "Number"
    }},
    "activities": ["activity 1", "activity 2", "activity 3"],
    "outcomes": {{
        "attendance_rate": "85%",
        "satisfaction_score": "4.5/5",
        "key_achievements": ["achievement 1", "achievement 2"]
    }},
    "financial_summary": {{
        "budget": 10000,
        "spent": 9500,
        "savings": 500
    }},
    "feedback_analysis": {{
        "positive": ["comment 1", "comment 2"],
        "improvements": ["suggestion 1", "suggestion 2"]
    }},
    "recommendations": ["recommendation 1", "recommendation 2"],
    "conclusion": "Final thoughts"
}}"""
        }
        
        prompt = prompts.get(document_type, prompts["event_plan"])
        return self.generate_json(prompt, system_prompt)
    
    def generate_event_report_with_template(self, event_description, document_type="event_plan", template_analysis=None):
        """
        Generate event report/plan matching a provided template style
        
        Args:
            event_description: Description of the event
            document_type: Type of document (event_plan, summary, report)
            template_analysis: Optional template analysis from TemplateAnalyzer
            
        Returns:
            dict: Generated report matching template style
        """
        
        # Try to use RAG to get standard templates
        try:
            from services.rag_service import RAGService
            import os
            
            backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            docs_folder = os.path.join(backend_dir, 'rag', 'source_docs')
            faiss_path = os.path.join(backend_dir, 'rag', 'index.faiss')
            meta_path = os.path.join(backend_dir, 'rag', 'metadata.pkl')
            
            # Initialize RAG service
            rag = RAGService(
                docs_folder=docs_folder,
                faiss_path=faiss_path,
                meta_path=meta_path,
                groq_api_key=self.api_key,
                embed_model=os.getenv('GROQ_EMBED_MODEL', 'nomic-embed-text-v1.5')
            )
            
            # Build index if it doesn't exist
            if not os.path.exists(faiss_path) or not os.path.exists(meta_path):
                print("Building RAG index for event templates...")
                rag.build()
            
            # Retrieve template based on document type
            query = f"{document_type} template format structure sections"
            retrieved_docs = rag.retrieve(query, top_k=2)
            
            # Combine retrieved templates
            template_context = "\n\n".join([doc['text'] for doc in retrieved_docs])
            
        except Exception as e:
            print(f"RAG retrieval failed: {e}")
            template_context = ""
        
        # If user provided custom template, use it
        if template_analysis and template_analysis.get('success'):
            from services.template_analyzer import TemplateAnalyzer
            analyzer = TemplateAnalyzer()
            template_instructions = analyzer.create_template_prompt(template_analysis)
        else:
            # Use RAG-retrieved template
            template_instructions = f"""Use this professional template format:

{template_context}

Replace placeholders like [EVENT_NAME], [DATE], [VENUE], etc. with actual details from the event description."""
        
        system_prompt = f"""You are an expert event planner and report generator.
You MUST generate documents in FORM-STYLE FORMAT with structured tables:

CRITICAL FORMAT RULES:
1. Start with: "Title: Event Report/Plan/Summary of Club/Committee [NAME] [ID]"
2. Use [TABLE: Description - 2 columns] markers before each table section
3. Tables must be in "Field Name | Value" format (2 columns for event details)
4. For Program Outcomes: use 4-column table format with ratings (0-3)
5. Use ## for section headers (like ## Photograph Section)
6. NO markdown narrative paragraphs - everything in tables or sections
7. Ensure all field names match institutional format (Name of the Club, Name of the Event, etc.)

Example format:
Title: Event Report of Club/Committee Tech Club FF 984

[TABLE: Event Details - 2 columns]
Name of the Club | Tech Innovation Club
Name of the Event | AI Workshop 2024
Student Vertical | Computer Science
...

[TABLE: Program Outcomes - 4 columns]
S.No. | Program Outcome | Rating (0-3) | Remarks
1 | Engineering knowledge: Apply... | 2 | Good application
..."""
        
        # Build enhanced prompts based on document type
        base_prompts = {
            "event_plan": f"""Create a detailed event plan for: {event_description}

{template_instructions}

CRITICAL REQUIREMENTS - FORM-STYLE FORMAT:
1. Start with "Title: Event Plan of Club/Committee [CLUB_NAME] [EVENT_ID]"
2. Use [TABLE: Event Details - 2 columns] for basic information
3. Use [TABLE: Timeline - 3 columns] for schedule (Phase | Duration | Activities)
4. Use [TABLE: Budget - 2 columns] for financial planning
5. Use [TABLE: Resources - 2 columns] for venue, equipment, staff needs
6. NO PARAGRAPHS - present all information in structured tables
7. Use ## for major section headers
8. Replace ALL placeholders with realistic, specific details from event description

Generate a complete, structured event plan in form-style format.""",
            
            "summary": f"""Create an event summary for: {event_description}

{template_instructions}

CRITICAL REQUIREMENTS - FORM-STYLE FORMAT:
1. Start with "Title: Event Summary of Club/Committee [CLUB_NAME] [EVENT_ID]"
2. Use [TABLE: Event Details - 2 columns] with fields:
   - Name of the Club
   - Name of the Event
   - Date
   - Time
   - Venue
   - Topic
3. Use [TABLE: Participation Overview - 2 columns]:
   - Number of Participants
   - Participant Profile
4. Use [TABLE: Activity Details - 2 columns]:
   - Activity Description
   - Moderator
   - Key Speakers
5. Use [TABLE: Outcomes and Achievements - 2 columns]:
   - Outcome
   - Achievement
6. Use [TABLE: Feedback Summary - 2 columns]:
   - Feedback Category (header row)
   - Content Quality | [feedback]
   - Organization | [feedback]
   - Overall Experience | [feedback]
7. NO PARAGRAPHS - present all information in structured tables
8. Replace ALL placeholders with realistic details from event description

Generate a complete, structured event summary in form-style format.""",
            
            "report": f"""Create a detailed event report for: {event_description}

{template_instructions}

CRITICAL REQUIREMENTS - FORM-STYLE FORMAT:
1. Start with "Title: Event Report of Club/Committee [CLUB_NAME] [EVENT_ID]"
2. Use [TABLE: Event Details - 2 columns] followed by field/value rows
3. Required fields in order:
   - Name of the Club
   - Name of the Event
   - Student Vertical (Engineering/Management/etc.)
   - Instalment (1/2/3)
   - Date and Time of the Event
   - Mode of the Event (Offline/Online) if Offline mention Venue
   - No. of Participants (Student and Faculty)
   - Duration of Event
   - Name of Guests (if any)
   - Designation of Guests
   - Nature of Guest (Internal/External)
   - Event Category
   - Event organized in collaboration with
   - Resource person details if any
   - Achievements & Highlights
4. Add [TABLE: Program Outcomes - 4 columns] section with 11 rows:
   - S.No. | Program Outcome | Rating (0-3) | Remarks
   - Include all 11 PO questions (Engineering knowledge, Problem analysis, etc.)
5. Add photo sections:
   - ## GEO-Tagged Photograph Section (mention minimum 3)
   - ## Non GEO-Tagged Photograph Section (mention minimum 3)
6. NO PARAGRAPHS - only tables, bullet points for photos, and section headers
7. Follow the EXACT template structure from RAG retrieval

Generate a complete, institutional form-style event report."""
        }
        
        prompt = base_prompts.get(document_type, base_prompts["event_plan"])
        
        # Generate with longer response for detailed templates
        text_response = self.generate_text(
            prompt=prompt,
            system_prompt=system_prompt,
            max_tokens=4000,  # Increased for template-matched content
            temperature=0.7
        )
        
        # Return formatted response
        return {
            'success': True,
            'content': text_response,
            'template_matched': True,
            'template_format': template_analysis.get('format') if template_analysis else 'Standard RAG Template',
            'template_sections': template_analysis.get('structure', {}).get('common_sections', []) if template_analysis else [],
            'metadata': {
                'document_type': document_type,
                'event_description': event_description,
                'word_count': len(text_response.split()),
                'rag_used': len(template_context) > 0
            }
        }
    
    def analyze_feedback(self, feedback_text):
        """Analyze feedback text and extract insights"""
        
        system_prompt = """You are an expert at analyzing feedback and extracting insights.
Provide sentiment analysis, key themes, and actionable recommendations."""
        
        prompt = f"""Analyze this feedback data and provide insights:

{feedback_text}

Generate a JSON response with this structure:
{{
    "overall_sentiment": "positive/neutral/negative",
    "satisfaction_score": 4.2,
    "total_responses": 50,
    "sentiment_distribution": {{
        "positive": 35,
        "neutral": 10,
        "negative": 5
    }},
    "top_praises": ["praise 1", "praise 2", "praise 3"],
    "top_issues": ["issue 1", "issue 2", "issue 3"],
    "key_themes": ["theme 1", "theme 2", "theme 3"],
    "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
    "summary": "Overall analysis summary"
}}"""
        
        return self.generate_json(prompt, system_prompt)
