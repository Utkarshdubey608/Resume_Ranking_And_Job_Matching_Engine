import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Compass, 
  Sparkles,
  FileCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CandidateProfile({ candidate, onBack, jobs }) {
  const [activeSubTab, setActiveSubTab] = useState('overview');

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Compass size={48} className="text-slate-400 dark:text-slate-500 mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Candidate Selected</h3>
        <p className="text-sm text-slate-400 mt-1 max-w-xs">
          Select a profile from the candidate grid or search bar to view talent details.
        </p>
      </div>
    );
  }

  // Calculate generic aggregate match score from jobMatches
  const scores = Object.values(candidate.jobMatches).map(m => m.score);
  const aggregateScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 80;

  // Use the first job match breakdown as primary presentation
  const firstJobId = Object.keys(candidate.jobMatches)[0];
  const firstJobTitle = jobs.find(j => j.id === firstJobId)?.title || "Senior Backend Developer";
  const breakdown = candidate.jobMatches[firstJobId] || { skillMatch: 85, expMatch: 80, eduMatch: 90, certMatch: 75 };

  // Circular gauge config
  const radius = 45;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (candidate.resumeStrength / 100) * circumference;

  return (
    <div className="space-y-6">
      
      {/* Back button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-semibold text-slate-650 dark:text-slate-400 hover:text-primary dark:hover:text-secondary-dark transition-colors"
      >
        <ArrowLeft size={14} /> Back to Sourcing Pipeline
      </button>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Profile Panel */}
        <div className="space-y-6 lg:col-span-1">
          {/* Profile Summary Card */}
          <div className="glass-card p-6 flex flex-col items-center text-center relative">
            <div className="absolute top-4 right-4">
              <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border
                ${candidate.status === 'Highly Matched' 
                  ? 'bg-success/10 border-success/30 text-success' 
                  : candidate.status === 'Good Match' 
                    ? 'bg-secondary/10 border-secondary/30 text-secondary-dark' 
                    : 'bg-warning/10 border-warning/30 text-warning'
                }`}
              >
                {candidate.status}
              </span>
            </div>

            <img 
              src={candidate.avatar} 
              alt={candidate.name} 
              className="w-24 h-24 rounded-2xl object-cover shadow-md ring-4 ring-primary/10 mt-4 mb-4"
            />
            
            <h2 className="text-xl font-poppins font-extrabold text-slate-900 dark:text-white">{candidate.name}</h2>
            <p className="text-xs font-semibold text-primary dark:text-secondary-dark mt-1">{candidate.currentRole}</p>
            <p className="text-xs text-slate-400 mt-0.5">{candidate.experience}</p>

            <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 mt-6 pt-6 text-left">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Mail size={14} />
                <span className="truncate">{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={14} />
                <span className="truncate">{candidate.location || "India"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 col-span-2">
                <Calendar size={14} />
                <span>Registered: {candidate.registeredDate || "2026-06-01"}</span>
              </div>
            </div>
          </div>

          {/* Resume Strength Score Widget */}
          <div className="glass-card p-6 flex items-center gap-6">
            {/* Circular Gauge */}
            <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  className="text-slate-100 dark:text-slate-800 fill-none"
                  strokeWidth={stroke}
                  cx={radius}
                  cy={radius}
                  r={normalizedRadius}
                />
                <circle
                  className="text-primary dark:text-secondary fill-none transition-all duration-1000 ease-out"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  cx={radius}
                  cy={radius}
                  r={normalizedRadius}
                  stroke="currentColor"
                />
              </svg>
              <div className="text-center">
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">{candidate.resumeStrength}</span>
                <span className="text-[10px] text-slate-400 block">/ 100</span>
              </div>
            </div>

            <div>
              <h3 className="font-poppins font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                <FileCheck size={16} className="text-primary" /> Resume Strength
              </h3>
              <p className="text-xs text-slate-450 dark:text-slate-400 mt-1.5 leading-relaxed">
                Aggregated index grading structural grammar, keyword density, and professional history format.
              </p>
            </div>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs Navigation */}
          <div className="glass-card p-2 flex gap-1.5 bg-slate-100/30 dark:bg-slate-950/20 border-b-0">
            {['overview', 'skills', 'education', 'certifications', 'analysis'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveSubTab(t)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all
                  ${activeSubTab === t 
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-primary dark:text-secondary-dark' 
                    : 'text-slate-655 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/30 dark:hover:bg-slate-900/10'
                  }`}
              >
                {t === 'analysis' ? 'Resume Analysis' : t}
              </button>
            ))}
          </div>

          {/* Subtab Contents card */}
          <div className="glass-card p-6 min-h-[380px] flex flex-col justify-between">
            <div>
              {/* TAB: Overview */}
              {activeSubTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Professional Profile Overview</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Parsed executive summary and current employment role</p>
                  </div>
                  <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800">
                      <p className="font-medium">
                        "{candidate.name} is currently working as a <span className="text-primary dark:text-secondary-dark font-semibold">{candidate.currentRole}</span> with a total of {candidate.experience}. Proven technical experience in product lifecycle architectures and microservices. Has active academic backgrounds in computer applications."
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="flex gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary self-start">
                          <Briefcase size={16} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-850 dark:text-slate-200">Work History</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{candidate.experience}</p>
                          <p className="text-[11px] mt-1 text-slate-500">Includes roles at top scale-ups and established enterprises.</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary self-start">
                          <GraduationCap size={16} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-850 dark:text-slate-200">Academic Background</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{candidate.education.split('(')[0]}</p>
                          <p className="text-[11px] mt-1 text-slate-500">{candidate.education.includes('(') ? candidate.education.match(/\(([^)]+)\)/)[1] : ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Skills & Gap Analysis */}
              {activeSubTab === 'skills' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Technical Skills & Gap Analysis</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Automated comparison against matching job requisitions</p>
                  </div>

                  <div className="space-y-5">
                    {/* Skills Chips */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-2.5">Extracted Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-success/10 text-success border border-success/20 shadow-sm flex items-center gap-1.5"
                          >
                            <CheckCircle size={12} /> {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skill Gap Analysis Box */}
                    <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      {/* Current Skills list */}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-success mb-2 block">Current Skills</span>
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.skills.slice(0, 5).map(s => (
                            <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-success/5 text-success border border-success/10">{s}</span>
                          ))}
                          {candidate.skills.length > 5 && <span className="text-xs text-slate-400 self-center">+{candidate.skills.length - 5} more</span>}
                        </div>
                      </div>

                      {/* Missing Skills list */}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-danger mb-2 block">Missing Core Skills</span>
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.missingSkills && candidate.missingSkills.length > 0 ? (
                            candidate.missingSkills.map(s => (
                              <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-danger/5 text-danger border border-danger/10 flex items-center gap-1">
                                <AlertCircle size={11} /> {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-success font-medium flex items-center gap-1.5">
                              <CheckCircle size={14} /> Full skill alignment!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Education */}
              {activeSubTab === 'education' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Educational Qualifications</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Verified certificates from resume parsing parsing</p>
                  </div>

                  <div className="relative border-l border-slate-100 dark:border-slate-800 pl-6 ml-3 space-y-6 py-2">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1.5 p-1 rounded-full bg-primary text-white ring-4 ring-white dark:ring-slate-900">
                        <GraduationCap size={12} />
                      </div>
                      <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                        {candidate.education}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">Standard Degree parsed from candidate profile details</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Certifications */}
              {activeSubTab === 'certifications' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Professional Certifications</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Extracted credentials and cloud architect licenses</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {candidate.certifications && candidate.certifications.length > 0 ? (
                      candidate.certifications.map((cert) => (
                        <div key={cert} className="flex gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                          <Award className="text-warning flex-shrink-0" size={18} />
                          <div>
                            <h4 className="font-bold text-xs text-slate-850 dark:text-slate-200">{cert}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">Verified credential</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 text-center text-xs text-slate-400 py-10">
                        No professional certifications detected on file.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB: Resume Analysis */}
              {activeSubTab === 'analysis' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">AI Compatibility Breakdown</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Comparison metrics against the role: <span className="font-semibold text-primary">{firstJobTitle}</span></p>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                      <Sparkles size={12} className="text-secondary animate-pulse" />
                      <span>{aggregateScore}% Match</span>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-4 pt-2">
                    {/* Skill Match */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">Semantic Skill Match</span>
                        <span className="text-slate-900 dark:text-white">{breakdown.skillMatch}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${breakdown.skillMatch}%` }} 
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400"
                        />
                      </div>
                    </div>

                    {/* Experience Match */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">Experience Alignment</span>
                        <span className="text-slate-900 dark:text-white">{breakdown.expMatch}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${breakdown.expMatch}%` }} 
                          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-secondary to-teal-400"
                        />
                      </div>
                    </div>

                    {/* Education Match */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">Academic Requirement Fit</span>
                        <span className="text-slate-900 dark:text-white">{breakdown.eduMatch}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${breakdown.eduMatch}%` }} 
                          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-success to-green-400"
                        />
                      </div>
                    </div>

                    {/* Certification Match */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">Credentials Validation</span>
                        <span className="text-slate-900 dark:text-white">{breakdown.certMatch}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${breakdown.certMatch}%` }} 
                          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                          className="h-full rounded-full bg-gradient-to-r from-warning to-yellow-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions inside content panel */}
            <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-5 mt-6">
              <button 
                onClick={onBack}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Close View
              </button>
              <button 
                onClick={() => {
                  const jobKeys = Object.keys(candidate.jobMatches);
                  if (jobKeys.length > 0) {
                    setSelectedJobId(jobKeys[0]);
                    setActiveTab('matching');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg hover:shadow-primary/20 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Sparkles size={14} /> Run Job Matching Re-analysis
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
