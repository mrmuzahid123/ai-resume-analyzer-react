import re

def extract_skills(text):

    skills_list = [
        "Python",
        "Java",
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "Flask",
        "Django",
        "MongoDB",
        "MySQL",
        "SQL",
        "HTML",
        "CSS",
        "Bootstrap",
        "Tailwind CSS",
        "Git",
        "GitHub",
        "C",
        "C++",
        "PHP",
        "Oracle",
        "PostgreSQL",
        "REST API"
    ]

    found_skills = []

    text = text.lower()

    for skill in skills_list:

        pattern = r"\b" + re.escape(skill.lower()) + r"\b"

        if re.search(pattern, text):
            found_skills.append(skill)

    return found_skills, skills_list