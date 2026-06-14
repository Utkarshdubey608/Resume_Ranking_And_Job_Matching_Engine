# ==========================================
# BINARY SEARCH DEMONSTRATION FILE
# ==========================================
# This file is a standalone demonstration of the Binary Search algorithm 
# implemented in the Resume Ranking and Job Matching Engine.
# 
# Usage in project: We use Binary Search to efficiently find candidates 
# who meet a minimum experience requirement in O(log n) time.
# ==========================================

def binary_search_experience(sorted_candidates: list[dict], min_exp: int) -> list[dict]:
    """
    Find candidates with experience >= min_exp using Binary Search.
    Time Complexity: O(log n)
    Space Complexity: O(1)
    """
    if not sorted_candidates:
        return []
        
    left = 0
    right = len(sorted_candidates) - 1
    result_idx = len(sorted_candidates) # Default to out of bounds
    
    print(f"--- Starting Binary Search for minimum {min_exp} years of experience ---")
    
    while left <= right:
        mid = (left + right) // 2
        exp = sorted_candidates[mid].get('experience', 0)
        
        print(f"Checking index {mid} (Experience: {exp} years). Left: {left}, Right: {right}")
        
        if exp >= min_exp:
            # We found a candidate with enough experience!
            # But we want the FIRST occurrence, so we search the left half.
            print(f" -> {exp} >= {min_exp}. It's a match! Moving 'right' pointer to find earlier matches.")
            result_idx = mid
            right = mid - 1 
        else:
            # Not enough experience, we must search the right half.
            print(f" -> {exp} < {min_exp}. Not enough experience. Moving 'left' pointer.")
            left = mid + 1
            
    print(f"--- Binary Search Complete! First valid candidate is at index {result_idx} ---")
    return sorted_candidates[result_idx:]

# ==========================================
# TEST DATA (Sorted by experience ascending)
# ==========================================
if __name__ == "__main__":
    dummy_candidates = [
        {"name": "Alice", "experience": 1},
        {"name": "Bob", "experience": 2},
        {"name": "Charlie", "experience": 4},
        {"name": "David", "experience": 5},
        {"name": "Eve", "experience": 7},
        {"name": "Frank", "experience": 10},
    ]

    print("Initial Sorted Dataset:")
    for i, cand in enumerate(dummy_candidates):
        print(f"Index {i}: {cand['name']} - {cand['experience']} years")
    print("\n")

    # Let's search for candidates with at least 5 years of experience
    MIN_REQUIRED_EXPERIENCE = 5
    
    qualified_candidates = binary_search_experience(dummy_candidates, MIN_REQUIRED_EXPERIENCE)
    
    print("\nResults:")
    for cand in qualified_candidates:
        print(f"Qualified: {cand['name']} ({cand['experience']} years)")
