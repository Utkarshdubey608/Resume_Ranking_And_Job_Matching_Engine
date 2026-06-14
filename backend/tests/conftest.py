import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock
import sys
import os

# Add backend directory to sys.path so 'app' can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Mock supabase before importing main
import app.db.supabase as supabase_module

# Create a mock client
mock_supabase = MagicMock()
supabase_module.supabase = mock_supabase

from main import app

@pytest.fixture
def client():
    """
    TestClient for the FastAPI app.
    """
    return TestClient(app)

@pytest.fixture
def mock_db():
    """
    Fixture returning the mocked supabase client.
    Tests can use this to configure mock return values.
    """
    mock_supabase.reset_mock()
    return mock_supabase
