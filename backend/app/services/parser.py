import io
import re
from PyPDF2 import PdfReader
import docx
import logging

logger = logging.getLogger(__name__)

def parse_resume(file_bytes: bytes, filename: str) -> str:
    """
    Extract text from uploaded PDF or DOCX files.
    """
    text = ""
    try:
        if filename.lower().endswith('.pdf'):
            reader = PdfReader(io.BytesIO(file_bytes))
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        elif filename.lower().endswith('.docx'):
            doc = docx.Document(io.BytesIO(file_bytes))
            for para in doc.paragraphs:
                text += para.text + "\n"
        else:
            raise ValueError("Unsupported file format. Please upload PDF or DOCX.")
    except Exception as e:
        logger.error(f"Error parsing {filename}: {e}", exc_info=True)
    return text.strip()

def is_valid_resume(text: str) -> bool:
    """
    Heuristic to determine if a document is likely a resume.
    Checks for common resume section headers.
    """
    text_lower = text.lower()
    keywords = ['experience', 'education', 'skills', 'summary', 'work history', 'employment', 'projects']
    match_count = sum(1 for kw in keywords if kw in text_lower)
    return match_count >= 2

def redact_pii(text: str) -> str:
    """
    Remove basic PII such as emails and phone numbers to reduce bias.
    """
    # Remove emails
    text = re.sub(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', '[EMAIL REDACTED]', text)
    # Remove phone numbers (basic pattern)
    text = re.sub(r'\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b', '[PHONE REDACTED]', text)
    return text

