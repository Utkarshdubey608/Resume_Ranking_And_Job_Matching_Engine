import React from 'react';
import { 
  Users, 
  Briefcase, 
  Cpu, 
  Target, 
  Plus, 
  UploadCloud, 
  GitCompare, 
  Award, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';

// Sparkline Mock Data for KPI cards
const kpiSparkData = [
  [ { val: 40 }, { val: 45 }, { val: 42 }, { val: 50 }, { val: 62 }, { val: 78 } ], // Total candidates
  [ { val: 12 }, { val: 15 }, { val: 14 }, { val: 16 }, { val: 18 }, { val: 22 } ], // Active jobs
  [ { val: 20 }, { val: 28 }, { val: 25 }, { val: 32 }, { val: 40 }, { val: 45 } ], // Matches generated
  [ { val: 72 }, { val: 74 }, { val: 73 }, { val: 75 }, { val: 76 }, { val: 78 } ], // Avg match score
];

export default function Dashboard({ 
  candidates, 
  jobs, 
  setActiveTab, 
  setSelectedCandidate, 
  setSelectedJobId 
}) {
  
  // Calculate aggregate metrics from live state
  const totalCandidates = candidates.length;
  const activeJobs = jobs.length;
  const avgMatchScore = Math.round(
    candidates.reduce((acc, curr) => {
      // average score across all matched jobs
      const scores = Object.values(curr.jobMatches).map(m => m.score);
      const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 70;
      return acc + avg;
    }, 0) / totalCandidates
  );
  
  // Hardcoded or dynamically aggregated analytics
  const candidateGrowthData = [
    { month: "Jan", count: 32 },
    { month: "Feb", count: 48 },
    { month: "Mar", count: 65 },
    { month: "Apr", count: 88 },
    { month: "May", count: 120 },
    { month: "Jun", count: totalCandidates },
  ];

  // Aggregate Skills Count
  const skillCountMap = {};
  candidates.forEach(c => {
    c.skills.forEach(s => {
      skillCountMap[s] = (skillCountMap[s] || 0) + 1;
    });
  });
  
  const skillData = Object.entries(skillCountMap)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const recentCandidates = [...candidates]
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

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

  // Sparkline generator
  const renderSparkline = (data, color) => (
    <div className="h-10 w-20">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line 
            type="monotone" 
            dataKey="val" 
            stroke={color} 
            strokeWidth={1.5} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time analytics and overview of your recruiting pipeline
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Total Candidates */}
        <motion.div variants={itemVariants} className="glass-card glass-card-hover p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Users size={20} />
            </div>
            <span className="text-xs font-bold text-success flex items-center gap-0.5">
              <TrendingUp size={12} /> +14.2%
            </span>
          </div>
          <div className="flex items-end justify-between mt-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Candidates</span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">{totalCandidates}</h3>
            </div>
            {renderSparkline(kpiSparkData[0], '#2563EB')}
          </div>
        </motion.div>

        {/* KPI 2: Active Jobs */}
        <motion.div variants={itemVariants} className="glass-card glass-card-hover p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary">
              <Briefcase size={20} />
            </div>
            <span className="text-xs font-bold text-success flex items-center gap-0.5">
              <TrendingUp size={12} /> +8.3%
            </span>
          </div>
          <div className="flex items-end justify-between mt-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Active Jobs</span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">{activeJobs}</h3>
            </div>
            {renderSparkline(kpiSparkData[1], '#14B8A6')}
          </div>
        </motion.div>

        {/* KPI 3: Matches Generated Today */}
        <motion.div variants={itemVariants} className="glass-card glass-card-hover p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-success/10 text-success">
              <Cpu size={20} />
            </div>
            <span className="text-xs font-bold text-success flex items-center gap-0.5">
              <TrendingUp size={12} /> +22.4%
            </span>
          </div>
          <div className="flex items-end justify-between mt-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Matches Formed</span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">48</h3>
            </div>
            {renderSparkline(kpiSparkData[2], '#22C55E')}
          </div>
        </motion.div>

        {/* KPI 4: Average Match Score */}
        <motion.div variants={itemVariants} className="glass-card glass-card-hover p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-warning/10 text-warning">
              <Target size={20} />
            </div>
            <span className="text-xs font-bold text-success flex items-center gap-0.5">
              <TrendingUp size={12} /> +2.1%
            </span>
          </div>
          <div className="flex items-end justify-between mt-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Avg Match Score</span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">{avgMatchScore}%</h3>
            </div>
            {renderSparkline(kpiSparkData[3], '#F59E0B')}
          </div>
        </motion.div>

      </div>

      {/* Charts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Growth Chart */}
        <motion.div variants={itemVariants} className="glass-card p-6 lg:col-span-2 flex flex-col justify-between h-[360px]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Candidate Growth Chart</h3>
              <p className="text-xs text-slate-400">Monthly candidate registration registrations</p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-bold text-primary dark:text-secondary-dark bg-primary/5 dark:bg-primary/10 rounded-full uppercase">Monthly</span>
          </div>
          
          <div className="flex-1 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={candidateGrowthData} margin={{ left: -20, top: 10, bottom: 0, right: 10 }}>
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    borderColor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#2563EB" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#growthGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Skills Chart */}
        <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col justify-between h-[360px]">
          <div>
            <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Top Extracted Skills</h3>
            <p className="text-xs text-slate-400 mb-4">Most frequent technologies found in resume pipelines</p>
          </div>
          
          <div className="flex-1 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={skillData} 
                layout="vertical"
                margin={{ left: -10, right: 10, top: 0, bottom: 0 }}
              >
                <XAxis type="number" stroke="#94A3B8" fontSize={10} hide />
                <YAxis dataKey="skill" type="category" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    borderColor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="count" fill="#14B8A6" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>

      {/* Middle Grid: Recent Candidates & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Candidates Table */}
        <motion.div variants={itemVariants} className="glass-card p-6 lg:col-span-2 overflow-hidden">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white">Recent Candidate Registrations</h3>
              <p className="text-xs text-slate-400">Newly parsed profile pipelines</p>
            </div>
            <button 
              onClick={() => setActiveTab('candidates')} 
              className="text-xs font-semibold text-primary hover:text-primary-dark dark:text-secondary-dark flex items-center gap-1"
            >
              View all <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3">Candidate</th>
                  <th className="pb-3">Primary Skills</th>
                  <th className="pb-3">Experience</th>
                  <th className="pb-3 text-center">Avg Match</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs">
                {recentCandidates.map((c) => {
                  const scores = Object.values(c.jobMatches).map(m => m.score);
                  const displayScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 70;
                  
                  return (
                    <tr 
                      key={c.id} 
                      onClick={() => {
                        setSelectedCandidate(c);
                        setActiveTab('candidates');
                      }}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 cursor-pointer transition-colors"
                    >
                      <td className="py-3 flex items-center gap-3">
                        <img 
                          src={c.avatar} 
                          alt={c.name} 
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/10" 
                        />
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors block">
                            {c.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block">{c.email}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-600 dark:text-slate-400 max-w-[150px] truncate">
                        {c.skills.slice(0, 3).join(', ')}
                      </td>
                      <td className="py-3 text-slate-600 dark:text-slate-400">{c.experience.split(' ')[0]} years</td>
                      <td className="py-3 text-center font-bold text-slate-800 dark:text-slate-100">{displayScore}%</td>
                      <td className="py-3 text-right">{getStatusBadge(c.status)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions Panel */}
        <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white mb-1">Quick Sourcing Actions</h3>
            <p className="text-xs text-slate-400 mb-6">Manage talent pipelines instantly</p>
          </div>

          <div className="grid grid-cols-2 gap-4 flex-1">
            <button 
              onClick={() => setActiveTab('upload')}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-primary/20 dark:border-primary/10 hover:border-primary/50 hover:bg-primary/5 bg-primary/[0.02] text-primary transition-all group"
            >
              <UploadCloud size={24} className="mb-2 transition-transform group-hover:-translate-y-0.5" />
              <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">Upload Resume</span>
              <span className="text-[9px] text-slate-400 text-center mt-1">Parse PDF/Word</span>
            </button>

            <button 
              onClick={() => setActiveTab('jobs')}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-secondary/20 dark:border-secondary/10 hover:border-secondary/50 hover:bg-secondary/5 bg-secondary/[0.02] text-secondary transition-all group"
            >
              <Plus size={24} className="mb-2 transition-transform group-hover:scale-110" />
              <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">Create Job</span>
              <span className="text-[9px] text-slate-400 text-center mt-1">Open new requisition</span>
            </button>

            <button 
              onClick={() => {
                if (jobs.length > 0) setSelectedJobId(jobs[0].id);
                setActiveTab('matching');
              }}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-success/20 dark:border-dashed border-success/10 hover:border-success/50 hover:bg-success/5 bg-success/[0.02] text-success transition-all group"
            >
              <GitCompare size={24} className="mb-2 transition-transform group-hover:rotate-12" />
              <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">Run Matching</span>
              <span className="text-[9px] text-slate-400 text-center mt-1">Recalculate models</span>
            </button>

            <button 
              onClick={() => {
                if (jobs.length > 0) setSelectedJobId(jobs[0].id);
                setActiveTab('rankings');
              }}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-warning/20 dark:border-warning/10 hover:border-warning/50 hover:bg-warning/5 bg-warning/[0.02] text-warning transition-all group"
            >
              <Award size={24} className="mb-2 transition-transform group-hover:scale-105" />
              <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">View Rankings</span>
              <span className="text-[9px] text-slate-400 text-center mt-1">SaaS leaderboards</span>
            </button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
