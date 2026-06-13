import React, { useState, useEffect } from 'react';
import { Award, Trophy, Users, ShieldAlert, Sparkles, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Rankings({ 
  candidates, 
  jobs, 
  selectedJobId, 
  setSelectedJobId,
  setSelectedCandidate,
  setActiveTab 
}) {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedExpRange, setSelectedExpRange] = useState('All');

  // Set default job if none active
  useEffect(() => {
    if (!selectedJobId && jobs.length > 0) {
      setSelectedJobId(jobs[0].id);
    }
  }, [jobs, selectedJobId, setSelectedJobId]);

  const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  if (!activeJob) {
    return (
      <div className="p-6 text-center text-slate-400">
        No active jobs to calculate rankings.
      </div>
    );
  }

  // Get departments
  const departments = ['All', ...new Set(jobs.map(j => j.department))];

  // Filters candidates & sort
  const rankedCandidates = candidates
    .map(c => {
      const match = c.jobMatches[activeJob.id] || { score: 0 };
      return {
        ...c,
        jobScore: match.score
      };
    })
    // Apply filters
    .filter(c => {
      // Dept filter: we match departments by job description or candidate background
      const matchesDept = selectedDept === 'All' || activeJob.department === selectedDept;

      // Exp filter
      const yStr = c.experience.match(/\d+/);
      const years = yStr ? parseInt(yStr[0], 10) : 0;
      let matchesExp = true;
      if (selectedExpRange === '0-3') matchesExp = years <= 3;
      else if (selectedExpRange === '4-6') matchesExp = years >= 4 && years <= 6;
      else if (selectedExpRange === '7+') matchesExp = years >= 7;

      return matchesDept && matchesExp;
    })
    .sort((a, b) => b.jobScore - a.jobScore);

  const podiumCandidates = rankedCandidates.slice(0, 3);
  const remainingCandidates = rankedCandidates.slice(3);

  // Pedestal layouts: index 0 is 1st (Gold), index 1 is 2nd (Silver), index 2 is 3rd (Bronze)
  // Let's arrange them visually as: [Silver, Gold, Bronze] for standard podium aesthetics
  const getPodiumOrder = () => {
    const arr = [];
    if (podiumCandidates[1]) arr.push({ item: podiumCandidates[1], place: 2, label: 'Silver', color: 'border-slate-350 bg-slate-100/10 text-slate-400 shadow-slate-350/10' });
    if (podiumCandidates[0]) arr.push({ item: podiumCandidates[0], place: 1, label: 'Gold', color: 'border-yellow-400 bg-yellow-50/5 text-yellow-500 shadow-yellow-500/10' });
    if (podiumCandidates[2]) arr.push({ item: podiumCandidates[2], place: 3, label: 'Bronze', color: 'border-amber-600 bg-amber-50/5 text-amber-700 shadow-amber-600/10' });
    return arr;
  };

  const getPodiumOrderIndex = (place) => {
    if (place === 1) return 1; // Center
    if (place === 2) return 0; // Left
    return 2; // Right
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Job Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Trophy className="text-yellow-500" /> Talent Leaderboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Top ranked candidates matching active project openings
          </p>
        </div>

        {/* Filters Panel */}
        <div className="glass-card p-1.5 flex flex-wrap items-center gap-3 bg-slate-50/50 dark:bg-slate-900/20 text-xs">
          
          {/* Job Select */}
          <div className="flex items-center gap-1.5 border-r border-slate-200/60 dark:border-slate-800 pr-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Job Target</span>
            <select 
              value={selectedJobId} 
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 font-semibold"
            >
              {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
            </select>
          </div>

          {/* Department Select */}
          <div className="flex items-center gap-1.5 border-r border-slate-200/60 dark:border-slate-800 pr-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Dept</span>
            <select 
              value={selectedDept} 
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 font-semibold"
            >
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Exp Select */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Experience</span>
            <select 
              value={selectedExpRange} 
              onChange={(e) => setSelectedExpRange(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 font-semibold"
            >
              <option value="All">All Ranges</option>
              <option value="0-3">0-3 Years</option>
              <option value="4-6">4-6 Years</option>
              <option value="7+">7+ Years</option>
            </select>
          </div>

        </div>
      </div>

      {/* Podium Section (Top 3 Cards) */}
      {podiumCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end justify-center pt-8">
          
          {/* Silver - 2nd place (rendered first on desktops for centering 1st place) */}
          {podiumCandidates[1] && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                setSelectedCandidate(podiumCandidates[1]);
                setActiveTab('profile');
              }}
              className="glass-card p-6 border-2 border-slate-300 dark:border-slate-700/60 hover:-translate-y-1 hover:shadow-xl cursor-pointer text-center flex flex-col items-center h-[260px] justify-between relative order-2 md:order-1"
            >
              <div className="absolute -top-6 w-10 h-10 rounded-xl bg-slate-150 border-2 border-slate-300 text-slate-500 font-extrabold text-sm flex items-center justify-center shadow-lg dark:bg-slate-800 dark:text-slate-350">
                2nd
              </div>
              <div>
                <img 
                  src={podiumCandidates[1].avatar} 
                  alt={podiumCandidates[1].name} 
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-300 mt-2 mb-3"
                />
                <h3 className="font-poppins font-extrabold text-sm text-slate-800 dark:text-white truncate max-w-[150px]">
                  {podiumCandidates[1].name}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{podiumCandidates[1].currentRole}</p>
              </div>
              <div className="mt-4">
                <span className="text-xl font-black text-slate-800 dark:text-white">{podiumCandidates[1].jobScore}%</span>
                <span className="text-[10px] text-slate-400 block">Match score</span>
              </div>
            </motion.div>
          )}

          {/* Gold - 1st place (Centered and larger) */}
          {podiumCandidates[0] && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => {
                setSelectedCandidate(podiumCandidates[0]);
                setActiveTab('profile');
              }}
              className="glass-card p-6 border-2 border-yellow-400 dark:border-yellow-500/60 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-yellow-500/5 cursor-pointer text-center flex flex-col items-center h-[300px] justify-between relative order-1 md:order-2 z-10"
            >
              <div className="absolute -top-7 w-12 h-12 rounded-2xl bg-yellow-400 border-2 border-yellow-500 text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <Trophy size={20} className="animate-pulse" />
              </div>
              <div>
                <img 
                  src={podiumCandidates[0].avatar} 
                  alt={podiumCandidates[0].name} 
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-yellow-400 mt-2 mb-3 shadow-md"
                />
                <h3 className="font-poppins font-extrabold text-base text-slate-900 dark:text-white truncate max-w-[180px]">
                  {podiumCandidates[0].name}
                </h3>
                <p className="text-xs font-semibold text-primary dark:text-secondary-dark mt-0.5">{podiumCandidates[0].currentRole}</p>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-yellow-500 dark:text-yellow-400">{podiumCandidates[0].jobScore}%</span>
                <span className="text-[10px] text-slate-400 block font-medium">Top Match Winner</span>
              </div>
            </motion.div>
          )}

          {/* Bronze - 3rd place */}
          {podiumCandidates[2] && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => {
                setSelectedCandidate(podiumCandidates[2]);
                setActiveTab('profile');
              }}
              className="glass-card p-6 border-2 border-amber-600 dark:border-amber-700/60 hover:-translate-y-1 hover:shadow-xl cursor-pointer text-center flex flex-col items-center h-[240px] justify-between relative order-3"
            >
              <div className="absolute -top-6 w-10 h-10 rounded-xl bg-amber-700 border-2 border-amber-800 text-white font-extrabold text-sm flex items-center justify-center shadow-lg">
                3rd
              </div>
              <div>
                <img 
                  src={podiumCandidates[2].avatar} 
                  alt={podiumCandidates[2].name} 
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-600 mt-2 mb-2"
                />
                <h3 className="font-poppins font-extrabold text-sm text-slate-800 dark:text-white truncate max-w-[150px]">
                  {podiumCandidates[2].name}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{podiumCandidates[2].currentRole}</p>
              </div>
              <div className="mt-3">
                <span className="text-xl font-black text-slate-800 dark:text-white">{podiumCandidates[2].jobScore}%</span>
                <span className="text-[10px] text-slate-400 block font-medium">Match score</span>
              </div>
            </motion.div>
          )}

        </div>
      ) : (
        <div className="glass-card p-12 text-center text-slate-400">
          No candidates matched these filters.
        </div>
      )}

      {/* Rankings Table (Rank 4+) */}
      {remainingCandidates.length > 0 && (
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Sourcing Pipeline Rankings</h3>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 bg-slate-50/20 dark:bg-slate-900/10">
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-4">Candidate</th>
                  <th className="py-4 px-4 text-center">Score</th>
                  <th className="py-4 px-4">Experience</th>
                  <th className="py-4 px-6">Top Verified Skills</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {remainingCandidates.map((c, index) => {
                  const rank = index + 4;
                  return (
                    <tr 
                      key={c.id} 
                      onClick={() => {
                        setSelectedCandidate(c);
                        setActiveTab('profile');
                      }}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/20 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6 font-semibold text-slate-500">
                        #{rank}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors block">{c.name}</span>
                            <span className="text-[9px] text-slate-400 block">{c.currentRole}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center font-extrabold text-slate-850 dark:text-white">
                        {c.jobScore}%
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                        {c.experience}
                      </td>
                      <td className="py-4 px-6 max-w-[200px] truncate">
                        <div className="flex gap-1">
                          {c.skills.slice(0, 4).map(s => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium text-[9px] text-slate-600 dark:text-slate-400">{s}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
