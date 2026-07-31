def generate_suggestions(ats_score, missing_skills):

    suggestions = []

    if ats_score < 40:
        suggestions.append("Improve your resume summary.")
        suggestions.append("Add more technical skills.")
        suggestions.append("Add personal or academic projects.")
        suggestions.append("Add certifications.")

    elif ats_score < 70:
        suggestions.append("Add more relevant skills.")
        suggestions.append("Improve project descriptions.")
        suggestions.append("Add GitHub and LinkedIn profile.")

    else:
        suggestions.append("Your resume is well optimized.")
        suggestions.append("Keep updating your latest projects.")

    if len(missing_skills) > 0:
        suggestions.append(
            "Learn: " + ", ".join(missing_skills[:5])
        )

    return suggestions