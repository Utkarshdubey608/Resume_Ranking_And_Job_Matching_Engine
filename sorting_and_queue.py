import heapq

def rank_candidates_with_priority_queue(candidates: list[dict]) -> list[dict]:
    """
    Demonstrates both Sorting Algorithm (Heap Sort) and Queue (Priority Queue).
    
    1. QUEUE REQUIREMENT:
       Elements are enqueued (pushed) onto a Priority Queue. Unlike a standard FIFO queue,
       elements are dynamically positioned based on their priority (their score).
       
    2. SORTING ALGORITHM REQUIREMENT:
       Using a Heap Data Structure to push all elements, and then popping them one-by-one 
       constitutes a 'Heap Sort' algorithm. It runs in O(N log N) time complexity.
    """
    
    print("--- 1. Initializing Priority Queue (Max-Heap) ---")
    pq = [] # This list will act as our queue
    
    # ENQUEUE (Push) Phase
    for cand in candidates:
        name = cand['name']
        score = cand['score']
        
        # Python's heapq is a min-heap by default. 
        # To make it a max-heap (highest score pops first), we push negative scores.
        print(f"Enqueueing candidate: {name} with score {score}")
        heapq.heappush(pq, (-score, name, cand))
        
    print("\n--- 2. Queue Pop & Sorting Phase (Heap Sort) ---")
    ranked_list = []
    current_rank = 1
    
    # DEQUEUE (Pop) Phase
    # By popping from the Priority Queue, we extract items in perfectly sorted descending order.
    while pq:
        # Extract the highest priority item from the queue
        neg_score, name, cand_data = heapq.heappop(pq)
        
        # Revert the negative score
        original_score = -neg_score 
        
        cand_data['rank'] = current_rank
        ranked_list.append(cand_data)
        
        print(f"Dequeueing Rank #{current_rank}: {name} (Score: {original_score})")
        current_rank += 1
        
    print("\n--- 3. Sorting & Queuing Complete! ---")
    return ranked_list

# ==========================================
# TEST DATA (Unsorted)
# ==========================================
if __name__ == "__main__":
    dummy_candidates = [
        {"name": "Alice", "score": 65},
        {"name": "Bob", "score": 90},
        {"name": "Charlie", "score": 40},
        {"name": "David", "score": 75},
        {"name": "Utkarsh Dubey", "score": 92}, # Hardcoded high score!
    ]

    print("Initial Unsorted Candidates:")
    for cand in dummy_candidates:
        print(f"{cand['name']} - Score: {cand['score']}")
    print("\n")

    # Run the Queue-based Sorting Algorithm
    final_rankings = rank_candidates_with_priority_queue(dummy_candidates)
    
    print("\nFinal Sorted Leaderboard:")
    for cand in final_rankings:
        print(f"Rank {cand['rank']}: {cand['name']} (Score: {cand['score']})")
