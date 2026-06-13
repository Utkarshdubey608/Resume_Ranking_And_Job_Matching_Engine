import pytest

def test_read_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Resume Ranking & Job Matching API"}

def test_get_candidates(client, mock_db):
    # Mock supabase response
    class MockResponse:
        def __init__(self, data):
            self.data = data
            
    mock_db.table().select().execute.return_value = MockResponse([
        {"id": "1", "name": "John Doe", "skills": ["python"]}
    ])
    
    response = client.get("/candidates")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["name"] == "John Doe"

def test_create_job(client, mock_db):
    class MockResponse:
        def __init__(self, data):
            self.data = data
            
    mock_db.table().insert().execute.return_value = MockResponse([
        {"id": "1", "title": "Software Engineer"}
    ])
    
    response = client.post("/jobs", json={
        "title": "Software Engineer",
        "required_skills": ["python"],
        "required_experience": 2,
        "education": "BS"
    })
    
    assert response.status_code == 200
    assert response.json()["title"] == "Software Engineer"
