import pdfplumber
import docx
import re

def extract_text(file_path):
    text = ""

    if file_path.endswith(".pdf"):
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

    elif file_path.endswith(".docx"):
        doc = docx.Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"

    return text


def extract_resume_details(text):

    print("\n========== RESUME TEXT ==========\n")
    print(text)
    print("\n=================================\n")

    lines = [line.strip() for line in text.split("\n") if line.strip()]

    name = lines[0] if lines else "Not Found"

    email = "Not Found"
    phone = "Not Found"

    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    phone_match = re.search(r'(\+91[- ]?)?[6-9]\d{9}', text)

    print("EMAIL MATCH:", email_match)
    print("PHONE MATCH:", phone_match)

    if email_match:
        email = email_match.group()

    if phone_match:
        phone = phone_match.group()

    return {
        "name": name,
        "email": email,
        "phone": phone
    }