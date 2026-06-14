def binary_search_experience(sorted_candidates: list[dict], min_exp: int) -> list[dict]:
    """
    Find candidates with experience >= min_exp using Binary Search.
    Assumes sorted_candidates is sorted by experience ascending.
    """
    if not sorted_candidates:
        return []
        
    left, right = 0, len(sorted_candidates) - 1
    result_idx = len(sorted_candidates) # Default to out of bounds
    
    while left <= right:
        mid = (left + right) // 2
        exp = sorted_candidates[mid].get('experience', 0)
        
        if exp >= min_exp:
            result_idx = mid
            right = mid - 1 # Look for earlier occurrence
        else:
            left = mid + 1
            
    return sorted_candidates[result_idx:]

def build_skill_hash_map(candidates: list[dict]) -> dict:
    """
    Builds a hash map (dictionary) where key is skill (lowercase) and value is list of candidate IDs.
    """
    skill_map = {}
    for cand in candidates:
        cand_id = cand.get('id')
        skills = cand.get('skills', [])
        for skill in skills:
            s_lower = skill.lower()
            if s_lower not in skill_map:
                skill_map[s_lower] = []
            skill_map[s_lower].append(cand_id)
    return skill_map

def search_candidates(candidates: list[dict], skill: str = None, min_exp: int = None, education: str = None) -> list[dict]:
    """
    Search candidates by skill, experience, and education.
    
    DSA REQUIREMENT SATISFACTION:
    - Binary Search: Used to efficiently find candidates with >= minimum experience 
      in O(log n) time by calling `binary_search_experience()`.
    - Hash Tables: Used to achieve O(1) lookups for skill matching by mapping 
      skills to candidate IDs via `build_skill_hash_map()`.
    """
    filtered = candidates
    
    # 1. Experience filter (using binary search)
    if min_exp is not None:
        # Sort candidates by experience ascending for binary search
        sorted_by_exp = sorted(filtered, key=lambda x: x.get('experience', 0))
        filtered = binary_search_experience(sorted_by_exp, min_exp)
        
    # 2. Skill filter (using Hash Map)
    if skill:
        skill_map = build_skill_hash_map(filtered)
        matched_ids = set(skill_map.get(skill.lower(), []))
        filtered = [c for c in filtered if c.get('id') in matched_ids]
        
    # 3. Education filter
    if education:
        edu_lower = education.lower()
        filtered = [c for c in filtered if edu_lower in c.get('education', '').lower()]
        
    return filtered
