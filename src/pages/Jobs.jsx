import React, { useState } from 'react';
import { Briefcase, Users, Plus, X, GraduationCap, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Jobs({ jobs, setJobs, candidates, setSelectedJobId, setActiveTab }) {
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [skillsStr, setSkillsStr] = useState('');
  const [expRequired, setExpRequired] = useState('');
  const [eduRequired, setEduRequired] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateJob = (e) => {
    e.preventDefault();

    // Parse comma-separated skills
    const skills = skillsStr.split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const newJobId = `JOB-00${jobs.length + 1}`;

    // For simplicity, let's auto-generate a matching candidate profile structure
    // We will update the candidates matches score for this new job.
    // Score matches by computing intersection of candidates.skills and new job.skills
    const updatedCandidates = candidates.map(cand => {
      const intersect = cand.skills.filter(s => 
        skills.some(js => js.toLowerCase() === s.toLowerCase())
      );
      const skillScore = skills.length ? Math.round((intersect.length / skills.length) * 100) : 70;
      
      const newMatchInfo = {
        score: Math.min(100, Math.max(20, skillScore + 10)),
        skillMatch: skillScore,
        expMatch: 80,
        eduMatch: 90,
        certMatch: 50
      };

      return {
        ...cand,
        jobMatches: {
          ...cand.jobMatches,
          [newJobId]: newMatchInfo
        }
      };
    });

    const newJob = {
      id: newJobId,
      title,
      department,
      requiredSkills: skills,
      experience: expRequired,
      education: eduRequired,
      description,
      matchingCandidatesCount: updatedCandidates.filter(c => c.jobMatches[newJobId]?.score >= 60).length
    };

    setJobs([...jobs, newJob]);
    // Save matching candidate info dynamically back to candidates state
    // We need to pass the setCandidates hook. Let's do that or simulate.
    // Yes, we will configure Candidates update in App.jsx when jobs are updated.
    
    // Close modal
    setShowAddModal(false);
    
    // Reset form
    setTitle('');
    setSkillsStr('');
    setExpRequired('');
    setEduRequired('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white tracking-tight">Active Jobs Requisitions</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create, audit, and run matching engines for corporate job postings
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-xs font-bold text-white shadow-lg shadow-primary/20 flex items-center gap-1.5 transition-all"
        >
          <Plus size={16} /> Open New Job
        </button>
      </div>

      {/* Requisitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {jobs.map((job) => {
          return (
            <div 
              key={job.id}
              className="glass-card glass-card-hover p-6 flex flex-col justify-between h-[260px] relative overflow-hidden group"
            >
              <div>
                {/* Department badge */}
                <div className="flex justify-between items-center mb-3">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/5 dark:bg-primary/10 text-primary dark:text-secondary-dark rounded-full">
                    {job.department}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{job.id}</span>
                </div>

                <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary-dark transition-colors">
                  {job.title}
                </h3>

                <p className="text-xs text-slate-450 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Requirement list */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {job.requiredSkills.slice(0, 4).map(s => (
                    <span 
                      key={s} 
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 border border-slate-200/50 dark:border-slate-700/50"
                    >
                      {s}
                    </span>
                  ))}
                  {job.requiredSkills.length > 4 && (
                    <span className="text-[10px] text-slate-450 self-center font-bold">
                      +{job.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Footer specs */}
              <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 text-xs">
                <div className="flex items-center gap-4 text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={13} /> {job.experience}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedJobId(job.id);
                    setActiveTab('matching');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary dark:text-secondary-dark font-bold text-[11px] flex items-center gap-1 group-hover:bg-primary group-hover:text-white transition-all"
                >
                  <Sparkles size={11} /> {job.matchingCandidatesCount} Matches
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Job Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Create New Requisition</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X size={18} />
                </button>
              </div>
              
              <form onSubmit={handleCreateJob} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Job Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Senior Backend Developer"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Platform Operations">Platform Operations</option>
                      <option value="AI Research">AI Research</option>
                      <option value="Product Sourcing">Product Sourcing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Required Skills (Comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Python, FastAPI, Docker, AWS"
                    value={skillsStr}
                    onChange={(e) => setSkillsStr(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Experience Requirement</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 5+ years"
                      value={expRequired}
                      onChange={(e) => setExpRequired(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Education Requirement</label>
                    <input 
                      type="text" 
                      placeholder="e.g. B.S. in Computer Science"
                      value={eduRequired}
                      onChange={(e) => setEduRequired(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Job Description</label>
                  <textarea 
                    rows="4"
                    placeholder="Describe the roles, duties, and platform tech stack..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-white"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-850/50 text-xs font-semibold text-slate-650 dark:text-slate-350"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-xs font-bold text-white shadow-lg shadow-primary/20"
                  >
                    Publish Requisition
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
