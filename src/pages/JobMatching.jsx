import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, GitCompare, HelpCircle, Trophy, User, ArrowRight } from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend,
  Tooltip
} from 'recharts';
import { motion } from 'framer-motion';

export default function JobMatching({ 
  jobs, 
  candidates, 
  selectedJobId, 
  setSelectedJobId,
  setSelectedCandidate,
  setActiveTab 
}) {
  const [activeCompareId, setActiveCompareId] = useState(null);

  // Fallback selected job if none is set
  useEffect(() => {
    if (!selectedJobId && jobs.length > 0) {
      setSelectedJobId(jobs[0].id);
    }
  }, [jobs, selectedJobId, setSelectedJobId]);

  const currentJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  if (!currentJob) {
    return (
      <div className="p-6 text-center text-slate-400">
        No jobs found. Open a new job requisition to run matching models.
      </div>
    );
  }

  // Get matching candidates with scores for this specific job
  const matchedCandidates = candidates
    .map(c => {
      const matchDetails = c.jobMatches[currentJob.id] || { score: 20, skillMatch: 10, expMatch: 30, eduMatch: 40, certMatch: 0 };
      return {
        ...c,
        matchInfo: matchDetails
      };
    })
    .sort((a, b) => b.matchInfo.score - a.matchInfo.score);

  // Set the primary compared candidate to the top matched candidate if not set
  useEffect(() => {
    if (matchedCandidates.length > 0 && !activeCompareId) {
      setActiveCompareId(matchedCandidates[0].id);
    }
  }, [matchedCandidates, activeCompareId]);

  const selectedComparedCandidate = candidates.find(c => c.id === activeCompareId) || matchedCandidates[0];

  // Radar chart data compilation
  let radarData = [];
  if (selectedComparedCandidate) {
    const compMatch = selectedComparedCandidate.jobMatches[currentJob.id] || { skillMatch: 50, expMatch: 50, eduMatch: 50, certMatch: 50 };
    
    // Compile data overlaying the Candidate vs Job Benchmark average
    radarData = [
      { subject: 'Skills Match', Candidate: compMatch.skillMatch, Benchmark: 85 },
      { subject: 'Experience Fit', Candidate: compMatch.expMatch, Benchmark: 80 },
      { subject: 'Education Fit', Candidate: compMatch.eduMatch, Benchmark: 90 },
      { subject: 'Certifications', Candidate: compMatch.certMatch, Benchmark: 75 },
    ];
  }

  const getRankMedal = (rank) => {
    switch (rank) {
      case 1:
        return <div className="w-6 h-6 rounded-full bg-yellow-400 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-yellow-500/20"><Trophy size={12} /></div>;
      case 2:
        return <div className="w-6 h-6 rounded-full bg-slate-350 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-slate-400/25">2</div>;
      case 3:
        return <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-md shadow-amber-700/20">3</div>;
      default:
        return <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs flex items-center justify-center">{rank}</div>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Job Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <GitCompare className="text-primary" /> Job Matching Engine
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare candidates using vector-based NLP similarity algorithms
          </p>
        </div>

        {/* Job selector dropdown */}
        <div className="glass-card p-1.5 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">Role Requisition</span>
          <select 
            value={selectedJobId} 
            onChange={(e) => {
              setSelectedJobId(e.target.value);
              // reset active compare candidate
              setActiveCompareId(null);
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 text-slate-800 dark:text-white focus:outline-none"
          >
            {jobs.map(j => (
              <option key={j.id} value={j.id}>{j.title} ({j.department})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Sourcing Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Panel: Sourcing Leaderboard Card Layout */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5 h-full max-h-[580px] flex flex-col justify-between">
            <div>
              <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">Match Leaderboard</h3>
              <p className="text-xs text-slate-400 mb-4">Ranked in descending compatibility order</p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {matchedCandidates.map((c, index) => {
                const rank = index + 1;
                const isSelected = c.id === activeCompareId;
                
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveCompareId(c.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between
                      ${isSelected 
                        ? 'bg-gradient-to-r from-primary/10 to-secondary/5 border-primary shadow-md' 
                        : 'bg-white/40 dark:bg-slate-900/30 border-slate-200/40 dark:border-slate-800/30 hover:bg-white dark:hover:bg-slate-900/50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {getRankMedal(rank)}
                      <img 
                        src={c.avatar} 
                        alt={c.name} 
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/10"
                      />
                      <div className="text-left">
                        <span className="font-bold text-slate-800 dark:text-slate-200 block">{c.name}</span>
                        <span className="text-[10px] text-slate-400 block">{c.currentRole}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-850 dark:text-white">{c.matchInfo.score}%</span>
                      <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">Fit</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Selected Candidate Breakdown & Radar Chart */}
        <div className="lg:col-span-3 space-y-6">
          {selectedComparedCandidate ? (
            <div className="glass-card p-6 space-y-6">
              
              {/* Profile brief */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedComparedCandidate.avatar} 
                    alt={selectedComparedCandidate.name} 
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary/20"
                  />
                  <div className="text-left">
                    <h3 className="font-poppins font-extrabold text-base text-slate-900 dark:text-white">
                      {selectedComparedCandidate.name}
                    </h3>
                    <p className="text-xs text-slate-450 dark:text-slate-400">{selectedComparedCandidate.currentRole} • {selectedComparedCandidate.experience}</p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedCandidate(selectedComparedCandidate);
                    setActiveTab('profile');
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-350 flex items-center gap-1"
                >
                  View Profile <ArrowRight size={13} />
                </button>
              </div>

              {/* Grid: Breakdown progress bars & Radar chart */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Breakdown metrics */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Match Vector Scores</h4>
                  
                  {/* Skills */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-350">
                      <span>Skills Match</span>
                      <span className="font-bold">{selectedComparedCandidate.jobMatches[currentJob.id]?.skillMatch || 70}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${selectedComparedCandidate.jobMatches[currentJob.id]?.skillMatch || 70}%` }}
                        className="h-full rounded-full bg-primary" 
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-350">
                      <span>Experience Fit</span>
                      <span className="font-bold">{selectedComparedCandidate.jobMatches[currentJob.id]?.expMatch || 70}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${selectedComparedCandidate.jobMatches[currentJob.id]?.expMatch || 70}%` }}
                        className="h-full rounded-full bg-secondary" 
                      />
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-350">
                      <span>Education Fit</span>
                      <span className="font-bold">{selectedComparedCandidate.jobMatches[currentJob.id]?.eduMatch || 70}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${selectedComparedCandidate.jobMatches[currentJob.id]?.eduMatch || 70}%` }}
                        className="h-full rounded-full bg-success" 
                      />
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-350">
                      <span>Certification Matching</span>
                      <span className="font-bold">{selectedComparedCandidate.jobMatches[currentJob.id]?.certMatch || 70}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${selectedComparedCandidate.jobMatches[currentJob.id]?.certMatch || 70}%` }}
                        className="h-full rounded-full bg-warning" 
                      />
                    </div>
                  </div>
                </div>

                {/* Radar Chart */}
                <div className="h-[240px] w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 9 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 9 }} />
                      <Radar 
                        name={selectedComparedCandidate.name} 
                        dataKey="Candidate" 
                        stroke="#2563EB" 
                        fill="#2563EB" 
                        fillOpacity={0.25} 
                      />
                      <Radar 
                        name="Benchmark" 
                        dataKey="Benchmark" 
                        stroke="#14B8A6" 
                        fill="#14B8A6" 
                        fillOpacity={0.05} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                          borderRadius: '12px',
                          color: '#fff',
                          fontSize: '10px'
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '10px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

              </div>
            </div>
          ) : (
            <div className="glass-card p-6 h-full flex items-center justify-center text-center text-slate-400">
              No comparison profiles selected.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
