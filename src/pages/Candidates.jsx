import React, { useState } from 'react';
import { Search, Eye, Edit2, Trash2, Award, ArrowUpRight, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Candidates({ 
  candidates, 
  setCandidates, 
  setSelectedCandidate, 
  setActiveTab,
  setSelectedJobId,
  jobs
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedExpRange, setSelectedExpRange] = useState('All');
  const [selectedEdu, setSelectedEdu] = useState('All');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Modal states for Editing
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editExp, setEditExp] = useState('');

  // Extract all unique skills across candidates for the filter dropdown
  const allSkills = ['All', ...new Set(candidates.flatMap(c => c.skills))].sort();

  // Handle deletions
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      setCandidates(candidates.filter(c => c.id !== id));
    }
  };

  // Open Edit Modal
  const openEditModal = (c) => {
    setEditingCandidate(c);
    setEditName(c.name);
    setEditRole(c.currentRole);
    setEditExp(c.experience);
  };

  // Save Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setCandidates(candidates.map(c => {
      if (c.id === editingCandidate.id) {
        return {
          ...c,
          name: editName,
          currentRole: editRole,
          experience: editExp
        };
      }
      return c;
    }));
    setEditingCandidate(null);
  };

  // Filters logic
  const filteredCandidates = candidates.filter(c => {
    // Search filter
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.education.toLowerCase().includes(searchTerm.toLowerCase());

    // Skill filter
    const matchesSkill = selectedSkill === 'All' || c.skills.includes(selectedSkill);

    // Experience filter (extract years number)
    const yStr = c.experience.match(/\d+/);
    const years = yStr ? parseInt(yStr[0], 10) : 0;
    let matchesExp = true;
    if (selectedExpRange === '0-3') matchesExp = years <= 3;
    else if (selectedExpRange === '4-6') matchesExp = years >= 4 && years <= 6;
    else if (selectedExpRange === '7+') matchesExp = years >= 7;

    // Education filter
    let matchesEdu = true;
    if (selectedEdu !== 'All') {
      matchesEdu = c.education.toLowerCase().includes(selectedEdu.toLowerCase());
    }

    return matchesSearch && matchesSkill && matchesExp && matchesEdu;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Highly Matched':
        return <span className="px-2.5 py-1 text-xs font-semibold text-success bg-success/10 border border-success/20 rounded-full">Highly Matched</span>;
      case 'Good Match':
        return <span className="px-2.5 py-1 text-xs font-semibold text-secondary-dark bg-secondary/15 border border-secondary/20 rounded-full">Good Match</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold text-warning bg-warning/10 border border-warning/20 rounded-full">Average Match</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white tracking-tight">Candidate Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Search, filter, and audit all applicants across your database
          </p>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search candidate by name, email, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all
                ${showAdvanced 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800/60 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>

            {/* Clear Filters helper */}
            {(searchTerm || selectedSkill !== 'All' || selectedExpRange !== 'All' || selectedEdu !== 'All') && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSkill('All');
                  setSelectedExpRange('All');
                  setSelectedEdu('All');
                }}
                className="text-xs text-danger font-semibold hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Skill Filter */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-1.5">Skill</label>
                  <select 
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 text-slate-750 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-1.5">Experience</label>
                  <select 
                    value={selectedExpRange}
                    onChange={(e) => setSelectedExpRange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 text-slate-750 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="All">All Experience Ranges</option>
                    <option value="0-3">Junior (0 - 3 years)</option>
                    <option value="4-6">Mid/Senior (4 - 6 years)</option>
                    <option value="7+">Lead/Principal (7+ years)</option>
                  </select>
                </div>

                {/* Education Filter */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-1.5">Education</label>
                  <select 
                    value={selectedEdu}
                    onChange={(e) => setSelectedEdu(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 text-slate-750 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="All">All Education Levels</option>
                    <option value="Ph.D.">Doctorate (Ph.D.)</option>
                    <option value="M.S.">Master's (M.S. / M.Tech)</option>
                    <option value="B.S.">Bachelor's (B.S. / B.Tech)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Candidates List Table Card */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/50 dark:border-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 bg-slate-50/20 dark:bg-slate-900/10">
                <th className="py-4 px-6">ID</th>
                <th className="py-4 px-4">Name</th>
                <th className="py-4 px-4">Education</th>
                <th className="py-4 px-4">Experience</th>
                <th className="py-4 px-4">Skills</th>
                <th className="py-4 px-4 text-center">Avg Match</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400 font-medium">
                    No candidates matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((c) => {
                  const scores = Object.values(c.jobMatches).map(m => m.score);
                  const displayScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 70;
                  
                  return (
                    <tr 
                      key={c.id} 
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      <td className="py-4 px-6 font-mono font-semibold text-slate-400 text-[10px]">
                        {c.id}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={c.avatar} 
                            alt={c.name} 
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/10" 
                          />
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-250 block">
                              {c.name}
                            </span>
                            <span className="text-[10px] text-slate-400 block">{c.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400 font-medium truncate max-w-[150px]">
                        {c.education.split('(')[0]}
                      </td>
                      <td className="py-4 px-4 text-slate-650 dark:text-slate-400">
                        {c.experience}
                      </td>
                      <td className="py-4 px-4 max-w-[200px]">
                        <div className="flex flex-wrap gap-1">
                          {c.skills.slice(0, 3).map((skill) => (
                            <span 
                              key={skill} 
                              className="px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 border border-slate-200/50 dark:border-slate-700/50"
                            >
                              {skill}
                            </span>
                          ))}
                          {c.skills.length > 3 && (
                            <span className="text-[9px] text-slate-450 font-semibold self-center ml-0.5">
                              +{c.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-slate-850 dark:text-slate-100">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-sm">{displayScore}%</span>
                          {getStatusBadge(c.status)}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedCandidate(c);
                              setActiveTab('profile');
                            }}
                            className="p-2 rounded-lg text-slate-500 dark:text-slate-450 hover:bg-primary/10 hover:text-primary transition-all"
                            title="View Profile"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => openEditModal(c)}
                            className="p-2 rounded-lg text-slate-500 dark:text-slate-450 hover:bg-secondary/10 hover:text-secondary-dark transition-all"
                            title="Edit Details"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => {
                              // Find matching job
                              const jobKeys = Object.keys(c.jobMatches);
                              if (jobKeys.length > 0) {
                                setSelectedJobId(jobKeys[0]);
                                setActiveTab('matching');
                              }
                            }}
                            className="p-2 rounded-lg text-slate-500 dark:text-slate-450 hover:bg-warning/10 hover:text-warning transition-all"
                            title="Rank Engine"
                          >
                            <Award size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="p-2 rounded-lg text-slate-500 dark:text-slate-450 hover:bg-danger/10 hover:text-danger transition-all"
                            title="Delete Candidate"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Candidate Modal */}
      {editingCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Edit Candidate Info</h3>
              <button 
                onClick={() => setEditingCandidate(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Current Role</label>
                <input 
                  type="text" 
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Experience Summary</label>
                <input 
                  type="text" 
                  value={editExp}
                  onChange={(e) => setEditExp(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setEditingCandidate(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-850/50 text-xs font-semibold text-slate-600 dark:text-slate-350"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-xs font-semibold text-white shadow-md shadow-primary/10"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
