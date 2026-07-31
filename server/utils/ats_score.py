def calculate_ats_score(found_skills, total_skills):

    if total_skills == 0:
        return 0

    score = (len(found_skills) / total_skills) * 100

    return round(score)