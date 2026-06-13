import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import CandidateProfile from './pages/CandidateProfile';
import ResumeUpload from './pages/ResumeUpload';
import Jobs from './pages/Jobs';
import JobMatching from './pages/JobMatching';
import Rankings from './pages/Rankings';
import Analytics from './pages/Analytics';
import AIInsights from './pages/AIInsights';
import Settings from './pages/Settings';

// Seed Data
import { initialCandidates, initialJobs } from './mockData';

export default function App() {
  const [user, setUser] = useState(null); // Auth session state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  // Live mutable states for data persistence
  const [candidates, setCandidates] = useState(initialCandidates);
  const [jobs, setJobs] = useState(initialJobs);

  // Profile inspection focus
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // Job selection binding for matching / rankings pages
  const [selectedJobId, setSelectedJobId] = useState('JOB-001');

  // Load and apply Dark Mode theme classes
  useEffect(() => {
    // Check local preferences
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  // If user is not authenticated, show the Login screen
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Filter candidates globally based on TopNav search query (if active)
  const getFilteredCandidatesForTab = () => {
    if (!searchVal) return candidates;
    return candidates.filter(c => 
      c.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      c.email.toLowerCase().includes(searchVal.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchVal.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Sidebar Layout */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // Reset profile focus when navigating tabs
          setSelectedCandidate(null);
        }}
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
        onLogout={handleLogout}
        user={user}
      />

      {/* Main Content Layout Container */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300
          ${isSidebarCollapsed ? 'pl-20' : 'pl-64'}`}
      >
        {/* Top Navigation Bar */}
        <TopNav 
          searchVal={searchVal}
          setSearchVal={(val) => {
            setSearchVal(val);
            // Route user automatically to candidate table if they start typing a search query
            if (activeTab !== 'candidates') {
              setActiveTab('candidates');
            }
          }}
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          user={user}
        />

        {/* Dynamic Inner Panel Viewport */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          
          {/* Dashboard Panel */}
          {activeTab === 'dashboard' && (
            <Dashboard 
              candidates={candidates} 
              jobs={jobs}
              setActiveTab={setActiveTab}
              setSelectedCandidate={setSelectedCandidate}
              setSelectedJobId={setSelectedJobId}
            />
          )}

          {/* Candidate Management Grid */}
          {activeTab === 'candidates' && !selectedCandidate && (
            <Candidates 
              candidates={getFilteredCandidatesForTab()} 
              setCandidates={setCandidates}
              setSelectedCandidate={setSelectedCandidate}
              setActiveTab={setActiveTab}
              setSelectedJobId={setSelectedJobId}
              jobs={jobs}
            />
          )}

          {/* Candidate Profile Details (Inspecting a focus record) */}
          {(selectedCandidate || activeTab === 'profile') && (
            <CandidateProfile 
              candidate={selectedCandidate} 
              onBack={() => {
                setSelectedCandidate(null);
                setActiveTab('candidates');
              }}
              jobs={jobs}
            />
          )}

          {/* Resume Upload / Parser */}
          {activeTab === 'upload' && (
            <ResumeUpload 
              candidates={candidates}
              setCandidates={setCandidates}
              setActiveTab={setActiveTab}
              setSelectedCandidate={setSelectedCandidate}
            />
          )}

          {/* Active Job Requisitions */}
          {activeTab === 'jobs' && (
            <Jobs 
              jobs={jobs}
              setJobs={setJobs}
              candidates={candidates}
              setSelectedJobId={setSelectedJobId}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Vector Matching Comparisons */}
          {activeTab === 'matching' && (
            <JobMatching 
              jobs={jobs}
              candidates={candidates}
              selectedJobId={selectedJobId}
              setSelectedJobId={setSelectedJobId}
              setSelectedCandidate={setSelectedCandidate}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Sourcing Leaderboard Rankings */}
          {activeTab === 'rankings' && (
            <Rankings 
              candidates={candidates}
              jobs={jobs}
              selectedJobId={selectedJobId}
              setSelectedJobId={setSelectedJobId}
              setSelectedCandidate={setSelectedCandidate}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Sourcing Analytics */}
          {activeTab === 'analytics' && <Analytics />}

          {/* AI Insights & Predictions */}
          {activeTab === 'insights' && <AIInsights />}

          {/* User Settings */}
          {activeTab === 'settings' && (
            <Settings 
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode} 
              user={user}
              setUser={setUser}
            />
          )}

        </main>
      </div>
    </div>
  );
}
