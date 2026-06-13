import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  HelpCircle, 
  AlertTriangle, 
  Lightbulb, 
  ShieldCheck, 
  BrainCircuit, 
  Zap, 
  Crown,
  Cpu
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { motion } from 'framer-motion';
import { aiInsightsData } from '../mockData';

export default function AIInsights() {
  
  // Custom tooltips for Recharts
  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-slate-950/90 text-white rounded-xl border border-white/10 text-xs shadow-2xl">
          <p className="font-bold">{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} style={{ color: p.color }} className="mt-0.5">
              {p.name}: {p.value} {p.name === 'missingCount' ? 'missing applicants' : 'job requisitions'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'skill_gap':
        return <Cpu className="text-warning animate-pulse" size={18} />;
      case 'match':
        return <Crown className="text-yellow-400" size={18} />;
      case 'prediction':
        return <TrendingUp className="text-secondary" size={18} />;
      default:
        return <Zap className="text-success" size={18} />;
    }
  };

  const getRecommendationBadgeColor = (category) => {
    if (category === 'Warning') return 'bg-warning/10 border-warning/20 text-warning';
    return 'bg-success/10 border-success/20 text-success';
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BrainCircuit className="text-primary" /> AI Talent Intelligence
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Futuristic predictive modeling, automated skills gap audits, and sourcing predictions
          </p>
        </div>

        {/* AI status beacon */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-xs font-semibold text-primary dark:text-secondary-dark shadow-sm">
          <Zap size={14} className="text-secondary animate-pulse" />
          <span>LLM Engine Active</span>
        </div>
      </div>

      {/* Futuristic Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: In Demand Skill */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="glass-card p-5 bg-gradient-to-br from-white to-primary/[0.02] dark:from-slate-900 dark:to-primary/[0.04] border-primary/25 relative overflow-hidden flex flex-col justify-between h-40 shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-[100px] blur-[20px] pointer-events-none"></div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Most In Demand</span>
            <div className="p-2 bg-primary/10 text-primary rounded-xl"><Sparkles size={16} /></div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-850 dark:text-white">{aiInsightsData.inDemandSkill.name}</h3>
            <p className="text-xs text-primary dark:text-secondary-dark font-semibold mt-1">{aiInsightsData.inDemandSkill.percentage}% of Requisitions</p>
            <p className="text-[10px] text-slate-450 mt-1 truncate">{aiInsightsData.inDemandSkill.description}</p>
          </div>
        </motion.div>

        {/* KPI 2: Hardest Skill to Source */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="glass-card p-5 bg-gradient-to-br from-white to-secondary/[0.02] dark:from-slate-900 dark:to-secondary/[0.04] border-secondary/25 relative overflow-hidden flex flex-col justify-between h-40 shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-bl-[100px] blur-[20px] pointer-events-none"></div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hardest To Source</span>
            <div className="p-2 bg-secondary/10 text-secondary rounded-xl"><AlertTriangle size={16} /></div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-850 dark:text-white">{aiInsightsData.hardestSkillToFind.name}</h3>
            <p className="text-xs text-secondary-dark font-semibold mt-1">Only {aiInsightsData.hardestSkillToFind.percentage}% Have It</p>
            <p className="text-[10px] text-slate-450 mt-1 truncate">{aiInsightsData.hardestSkillToFind.description}</p>
          </div>
        </motion.div>

        {/* KPI 3: Avg Match Score */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="glass-card p-5 bg-gradient-to-br from-white to-success/[0.02] dark:from-slate-900 dark:to-success/[0.04] border-success/25 relative overflow-hidden flex flex-col justify-between h-40 shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-bl-[100px] blur-[20px] pointer-events-none"></div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Candidate Match</span>
            <div className="p-2 bg-success/10 text-success rounded-xl"><Cpu size={16} /></div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-850 dark:text-white">{aiInsightsData.avgMatchScore.value}</h3>
            <p className="text-xs text-success font-semibold mt-1">{aiInsightsData.avgMatchScore.trend}</p>
            <p className="text-[10px] text-slate-455 mt-1 truncate">{aiInsightsData.avgMatchScore.description}</p>
          </div>
        </motion.div>

        {/* KPI 4: Highest Ranked Candidate */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="glass-card p-5 bg-gradient-to-br from-white to-warning/[0.02] dark:from-slate-900 dark:to-warning/[0.04] border-warning/25 relative overflow-hidden flex flex-col justify-between h-40 shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-warning/10 rounded-bl-[100px] blur-[20px] pointer-events-none"></div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Highest Vector Match</span>
            <div className="p-2 bg-warning/10 text-warning rounded-xl"><Crown size={16} /></div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-850 dark:text-white truncate max-w-[150px]">{aiInsightsData.highestRankedCandidate.name}</h3>
            <p className="text-xs text-warning font-semibold mt-1">{aiInsightsData.highestRankedCandidate.score} Fit</p>
            <p className="text-[10px] text-slate-450 mt-1 truncate">For: {aiInsightsData.highestRankedCandidate.job}</p>
          </div>
        </motion.div>

      </div>

      {/* Recommendations & Dynamic charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left: AI recommendations feed */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-card p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                <Lightbulb size={18} className="text-primary" /> Smart Recommendations Engine
              </h3>
              <p className="text-xs text-slate-400 mb-6">Automated notifications generated from pipeline vector analyses</p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs max-h-[380px]">
              {aiInsightsData.recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/60 flex gap-3.5 items-start"
                >
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-850 flex-shrink-0">
                    {getRecommendationIcon(rec.type)}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-xs text-slate-850 dark:text-slate-200">{rec.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${getRecommendationBadgeColor(rec.category)}`}>
                        {rec.category}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">{rec.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Charts Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Skill Gap Analysis chart */}
          <div className="glass-card p-5 h-[230px] flex flex-col justify-between">
            <div>
              <h3 className="font-poppins font-bold text-xs text-slate-800 dark:text-slate-200">Competency Deficit Trends</h3>
              <p className="text-[9px] text-slate-400">Missing applicant skills (Purple) vs Requisition demand (Green)</p>
            </div>
            
            <div className="flex-1 w-full text-[9px] mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aiInsightsData.skillGapTrends} margin={{ left: -25, right: 5, top: 5, bottom: 0 }}>
                  <XAxis dataKey="skill" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip content={renderCustomTooltip} />
                  <Bar dataKey="missingCount" name="Missing in CVs" fill="#8B5CF6" radius={[2, 2, 0, 0]} barSize={8} />
                  <Bar dataKey="demandCount" name="Job Openings" fill="#14B8A6" radius={[2, 2, 0, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hiring Sourcing Predictions chart */}
          <div className="glass-card p-5 h-[230px] flex flex-col justify-between">
            <div>
              <h3 className="font-poppins font-bold text-xs text-slate-800 dark:text-slate-200">Sourcing Pipeline Forecasts</h3>
              <p className="text-[9px] text-slate-400">Dual line comparing active pipeline vs forecasted demand</p>
            </div>

            <div className="flex-1 w-full text-[9px] mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aiInsightsData.hiringPredictions} margin={{ left: -25, right: 5, top: 5, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px', marginTop: '5px' }} />
                  <Line type="monotone" name="Current Pipeline" dataKey="currentPipeline" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" name="Predicted Need" dataKey="predictedNeeds" stroke="#14B8A6" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
