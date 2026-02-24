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
