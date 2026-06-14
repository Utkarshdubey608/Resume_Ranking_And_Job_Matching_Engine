import csv
import json
import os
from typing import List, Dict

# Directory to save exports
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'data_exports')
os.makedirs(DATA_DIR, exist_ok=True)

class DataExporter:
    """
    Handles File Handling requirement:
    Store: Candidate records, Job records, Rankings
    Formats: CSV, JSON
    """
    
    @staticmethod
    def export_candidates(candidates: List[Dict]):
        # Export JSON
        json_path = os.path.join(DATA_DIR, 'candidates.json')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(candidates, f, indent=4)
            
        # Export CSV
        csv_path = os.path.join(DATA_DIR, 'candidates.csv')
        if candidates:
            keys = ['id', 'name', 'education', 'experience', 'skills', 'certifications']
            with open(csv_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=keys, extrasaction='ignore')
                writer.writeheader()
                for c in candidates:
                    # Convert lists to strings for CSV
                    row = c.copy()
                    if isinstance(row.get('skills'), list):
                        row['skills'] = ', '.join(row['skills'])
                    if isinstance(row.get('certifications'), list):
                        row['certifications'] = ', '.join(row['certifications'])
                    writer.writerow(row)

    @staticmethod
    def export_jobs(jobs: List[Dict]):
        # Export JSON
        json_path = os.path.join(DATA_DIR, 'jobs.json')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(jobs, f, indent=4)
            
        # Export CSV
        csv_path = os.path.join(DATA_DIR, 'jobs.csv')
        if jobs:
            keys = ['id', 'title', 'department', 'required_experience', 'required_skills', 'education']
            with open(csv_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=keys, extrasaction='ignore')
                writer.writeheader()
                for j in jobs:
                    row = j.copy()
                    if isinstance(row.get('required_skills'), list):
                        row['required_skills'] = ', '.join(row['required_skills'])
                    writer.writerow(row)

    @staticmethod
    def export_rankings(rankings: List[Dict]):
        # Export JSON
        json_path = os.path.join(DATA_DIR, 'rankings.json')
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(rankings, f, indent=4)
            
        # Export CSV
        csv_path = os.path.join(DATA_DIR, 'rankings.csv')
        if rankings:
            keys = ['candidate_id', 'job_id', 'score', 'rank']
            with open(csv_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=keys, extrasaction='ignore')
                writer.writeheader()
                writer.writerows(rankings)
