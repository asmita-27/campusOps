# Event Report Generator - Template Matching Feature

## 🎯 Overview

The Event Report Generator now supports **Template Matching** - a powerful feature that allows the AI to learn and replicate your club's specific documentation style! Upload your club's existing event plan/report template, and the AI will generate new reports that match your format exactly.

## ✨ Key Benefits

1. **Consistent Documentation Style**: All reports follow your club's established format
2. **Time Saving**: No need to manually format AI-generated content
3. **Professional Output**: Maintains your institution's documentation standards
4. **Flexible Input**: Supports TXT, DOCX, and PDF templates
5. **Smart Structure Recognition**: Automatically identifies:
   - Section headings and organization
   - Numbering styles (numeric, alphabetic, roman, bullets)
   - Formatting patterns (dates, tables, lists)
   - Language tone and formality level

## 📁 Supported Template Formats

| Format         | Extension | Best For                          |
| -------------- | --------- | --------------------------------- |
| Plain Text     | `.txt`    | Simple, structured documents      |
| Microsoft Word | `.docx`   | Rich formatting, tables, headings |
| PDF            | `.pdf`    | Final formatted documents         |

## 🚀 How to Use

### Step 1: Prepare Your Template

Create or find an existing event planning document from your club that represents your desired format. Good templates include:

- Past event plans
- Official club event documentation
- College-approved event formats
- MOU templates
- Budget proposal formats

**Example template sections:**

```
=================================
    CLUB NAME - EVENT PLAN
=================================

EVENT TITLE: [Name]
DATE: DD/MM/YYYY
VENUE: [Location]

SECTION 1: OVERVIEW
1.1 Introduction
   Description...

1.2 Objectives
   • Objective 1
   • Objective 2

SECTION 2: TIMELINE
...
```

### Step 2: Upload Template

1. Navigate to **Dashboard → Event Report Generator**
2. Fill in the event description
3. Click on **"Document Template (Optional)"** file input
4. Select your template file (.txt, .docx, or .pdf)
5. You'll see a confirmation showing the file name and size

### Step 3: Generate Report

1. Click **"Generate Report"** button
2. The AI will:
   - Analyze your template structure
   - Extract formatting patterns
   - Identify section organization
   - Match numbering/bullet styles
   - Generate content in YOUR format

### Step 4: Review & Use

The generated report will:

- ✅ Match your template's section structure
- ✅ Use the same numbering style
- ✅ Follow similar heading formats
- ✅ Maintain consistent tone and formality
- ✅ Include similar level of detail

## 🛠️ Technical Details

### How Template Matching Works

#### 1. Template Upload & Analysis

```
User uploads template → Backend receives file → TemplateAnalyzer processes
```

The `TemplateAnalyzer` service:

- Extracts text content from TXT/DOCX/PDF
- Identifies document structure and sections
- Detects numbering patterns and formatting
- Analyzes language style and tone

#### 2. Structure Extraction

The analyzer identifies:

**Section Patterns:**

- Markdown headings (#, ##, ###)
- ALL CAPS HEADINGS
- Numbered sections (1., 2., 3.)
- Roman numerals (I., II., III.)
- Title case with colons

**Formatting Features:**

- Date formats (DD/MM/YYYY, MM-DD-YYYY)
- Bullet points (•, -, \*)
- Numbered lists
- Tables (DOCX only)
- Heading styles (DOCX only)

**Common Sections:**

- Introduction, Overview, Background
- Objectives, Goals
- Timeline, Schedule, Methodology
- Budget, Resources, Team
- Outcomes, Results, Conclusion

#### 3. AI Generation with Template Context

The LLM receives:

```python
{
    "event_description": "User's event details",
    "document_type": "event_plan|summary|report",
    "template_instructions": "Detailed formatting rules extracted from template"
}
```

The AI is instructed to:

- Match section structure EXACTLY
- Use identical numbering/bullet styles
- Follow heading format and capitalization
- Maintain similar detail level and formality
- Include all template sections

#### 4. Output Formatting

**With Template:**

```
Plain text output matching template format
Word count, section count, metadata included
```

**Without Template (Legacy):**

```json
{
  "title": "Event Title",
  "sections": {...},
  "budget": {...}
}
```

## 📋 Template Creation Best Practices

### DO ✅

- Use clear section headings
- Maintain consistent formatting throughout
- Include all standard sections your club uses
- Use realistic sample content
- Keep numbering/bullet styles consistent
- Add date/time formats if relevant

### DON'T ❌

- Mix multiple formatting styles
- Use inconsistent heading formats
- Include confusing or unclear sections
- Use overly complex nested structures
- Add irrelevant or placeholder text

## 🔧 API Reference

### Endpoint: `/api/events/generate`

**Method:** `POST`

**Content-Type:** `multipart/form-data`

**Parameters:**

| Parameter           | Type   | Required | Description                               |
| ------------------- | ------ | -------- | ----------------------------------------- |
| `event_description` | string | Yes      | Event details and requirements            |
| `document_type`     | string | Yes      | One of: `event_plan`, `summary`, `report` |
| `template`          | file   | No       | Template document (.txt, .docx, .pdf)     |
| `images`            | file[] | No       | Event images (optional)                   |

**Response:**

```json
{
  "success": true,
  "data": {
    "content": "Generated report text...",
    "template_matched": true,
    "template_format": "txt",
    "template_sections": ["Introduction", "Timeline", "Budget"],
    "word_count": 1250
  },
  "metadata": {
    "document_type": "event_plan",
    "template_used": true,
    "template_format": "txt"
  }
}
```

## 🧪 Testing the Feature

### Test with Sample Template

1. Use the provided `sample_event_template.txt` in the project root
2. Test event description:
   ```
   Technical workshop on AI and Machine Learning for 3 days.
   Expected 200 participants. Includes hands-on sessions,
   guest lectures, and project presentations. Budget: ₹50,000.
   ```
3. Generate and compare output to template format

### Validation Checklist

- [ ] Template file uploads successfully
- [ ] Template analysis completes without errors
- [ ] Generated report matches template structure
- [ ] Section headings match template style
- [ ] Numbering/bullets consistent with template
- [ ] Output is readable and well-formatted
- [ ] Metadata shows template_used: true

## 💡 Use Cases

### 1. Event Planning

**Template:** Past event plan with timeline, budget, resources
**Output:** New event plan with same structure but current event details

### 2. Event Summary

**Template:** Previous event summary format
**Output:** Summary of new event matching format

### 3. Budget Proposals

**Template:** College-approved budget format
**Output:** Budget proposal for new event in approved format

### 4. MOU Generation

**Template:** Standard MOU template
**Output:** New MOU with event-specific details

### 5. Sponsor Proposals

**Template:** Successful past sponsorship proposal
**Output:** New proposal matching winning format

## 🐛 Troubleshooting

### Template Upload Fails

**Issue:** "Template analysis failed"
**Solutions:**

- Check file format (.txt, .docx, .pdf only)
- Ensure file is not corrupted
- Verify file size < 10MB
- Check for special characters in filename

### Output Doesn't Match Template

**Issue:** Generated content structure differs
**Solutions:**

- Use clearer section headings in template
- Ensure template has consistent formatting
- Add more structure/sections to template
- Try a different template format (e.g., DOCX instead of PDF)

### Missing Sections

**Issue:** Some template sections not in output
**Solutions:**

- Make section headings more prominent
- Use clearer section identifiers
- Simplify template structure
- Provide more detailed event description

## 🔒 Security Notes

- Templates are stored in `uploads/templates/` directory
- Each template is analyzed once during upload
- Template content is not stored in database
- File uploads are validated for type and size
- Use secure_filename() to prevent path traversal

## 📊 Performance Tips

1. **Optimal Template Size:** 2-5 pages (500-2000 words)
2. **Best Format for Speed:** Plain text (.txt)
3. **Best Format for Accuracy:** Word document (.docx)
4. **Avoid:** Very large PDFs (>5MB), scanned images

## 🚀 Future Enhancements

- [ ] Template library for multiple event types
- [ ] Team template sharing
- [ ] Template version control
- [ ] Visual template preview
- [ ] Batch report generation
- [ ] Export to DOCX/PDF matching template format
- [ ] Template validation and quality scoring

## 📞 Support

If you encounter issues:

1. Check backend logs for error details
2. Verify template file format and content
3. Test with provided sample template first
4. Review backend/services/template_analyzer.py for debugging

---

**Version:** 1.0  
**Last Updated:** February 2026  
**Maintained By:** CampusOps Team
