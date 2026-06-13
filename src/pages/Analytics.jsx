import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { BarChart3, MapPin, Sparkles, TrendingUp, Info } from 'lucide-react';
import { analyticsData } from '../mockData';

// Color definitions matching the design theme
const COLORS = ['#2563EB', '#14B8A6', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function Analytics() {
  const [activeCity, setActiveCity] = useState(null);

  // Recharts custom label for Pie Chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const RADIAN = Math.PI / 180;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-[10px] font-bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <BarChart3 className="text-primary" /> Talent Intelligence Analytics
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detailed metrics, funnel reports, and geographical demographic distributions
        </p>
      </div>

      {/* Primary 6 charts layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CHART 1: Candidate Growth */}
        <div className="glass-card p-5 h-[300px] flex flex-col justify-between">
          <div>
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Candidate Acquisition</h3>
            <p className="text-[10px] text-slate-400">Total pipeline growth over the last 6 months</p>
          </div>
          <div className="flex-1 w-full text-[10px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.candidateGrowth} margin={{ left: -25, right: 5, top: 5, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAcq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="candidates" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorAcq)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Top Extracted Skills */}
        <div className="glass-card p-5 h-[300px] flex flex-col justify-between">
          <div>
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Extracted Skills</h3>
            <p className="text-[10px] text-slate-400">Top 5 technical competencies detected in CVs</p>
          </div>
          <div className="flex-1 w-full text-[10px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.topSkills.slice(0, 5)} layout="vertical" margin={{ left: -15, right: 5, top: 5, bottom: 0 }}>
                <XAxis type="number" stroke="#94a3b8" hide />
                <YAxis dataKey="skill" type="category" stroke="#94a3b8" width={65} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#14B8A6" radius={[0, 4, 4, 0]} barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: Experience Distribution */}
        <div className="glass-card p-5 h-[300px] flex flex-col justify-between">
          <div>
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Experience Demographics</h3>
            <p className="text-[10px] text-slate-400">Distribution of talent by industry tenure</p>
          </div>
          <div className="flex-1 w-full text-[10px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.experienceDistribution} margin={{ left: -25, right: 5, top: 5, bottom: 0 }}>
                <XAxis dataKey="range" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: Education Distribution */}
        <div className="glass-card p-5 h-[300px] flex flex-col justify-between">
          <div>
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Academic Backgrounds</h3>
            <p className="text-[10px] text-slate-400">Highest verified degrees held by applicants</p>
          </div>
          <div className="flex-1 w-full text-[10px] mt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={analyticsData.educationDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={65}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.educationDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '9px', marginTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 5: Hiring Funnel */}
        <div className="glass-card p-5 h-[300px] flex flex-col justify-between">
          <div>
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Hiring Pipeline Funnel</h3>
            <p className="text-[10px] text-slate-400">Candidate flow density by structural hiring stages</p>
          </div>
          <div className="flex-1 w-full text-[10px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.hiringFunnel} layout="vertical" margin={{ left: -10, right: 10, top: 5, bottom: 0 }}>
                <XAxis type="number" stroke="#94a3b8" hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                  {analyticsData.hiringFunnel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 6: Match Score Distribution */}
        <div className="glass-card p-5 h-[300px] flex flex-col justify-between">
          <div>
            <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Match score Distribution</h3>
            <p className="text-[10px] text-slate-400">Frequency breakdown of applicant match ratings</p>
          </div>
          <div className="flex-1 w-full text-[10px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.matchScoreDistribution} margin={{ left: -25, right: 5, top: 5, bottom: 0 }}>
                <XAxis dataKey="scoreRange" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* India Sourcing Heatmap Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Heatmap Map outline visual */}
        <div className="glass-card p-6 lg:col-span-3 flex flex-col justify-between h-[450px]">
          <div>
            <h3 className="font-poppins font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
              <MapPin size={18} className="text-danger" /> India Sourcing Hubs
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Geographic candidate density density map</p>
          </div>

          {/* SVG map of India outline & plot indicators */}
          <div className="flex-1 relative flex items-center justify-center min-h-[300px]">
            {/* SVG outline representing India */}
            <svg 
              viewBox="0 0 400 450" 
              className="w-full h-full max-h-[320px] text-slate-200 dark:text-slate-800"
              fill="currentColor"
            >
              {/* Simplified India Path representation for layout beauty */}
              <path 
                d="M 180 50 L 195 70 L 210 65 L 215 85 L 235 95 L 245 110 L 260 120 L 280 125 L 300 135 L 305 150 L 295 170 L 320 200 L 290 220 L 295 240 L 280 250 L 255 260 L 240 280 L 230 300 L 220 320 L 210 350 L 205 380 L 200 410 L 190 390 L 180 370 L 175 350 L 165 330 L 155 310 L 145 290 L 140 270 L 115 250 L 105 230 L 120 215 L 110 190 L 130 170 L 140 145 L 145 125 L 150 100 L 160 85 L 170 65 Z" 
                className="fill-slate-100 dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="2.5"
              />

              {/* Pulsing city beacons */}
              {analyticsData.heatmapLocations.map((loc) => {
                const isHovered = activeCity?.city === loc.city;
                return (
                  <g 
                    key={loc.city}
                    onMouseEnter={() => setActiveCity(loc)}
                    onMouseLeave={() => setActiveCity(null)}
                    className="cursor-pointer"
                  >
                    <circle 
                      cx={loc.x} 
                      cy={loc.y} 
                      r={isHovered ? 12 : 7} 
                      className={`fill-primary/20 transition-all duration-300 ${isHovered ? 'animate-ping' : ''}`}
                    />
                    <circle 
                      cx={loc.x} 
                      cy={loc.y} 
                      r={isHovered ? 6 : 4} 
                      className="fill-primary stroke-white dark:stroke-slate-900"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover City Tooltip overlay inside the canvas */}
            {activeCity && (
              <div 
                className="absolute p-3 rounded-xl bg-slate-900/90 text-white text-xs border border-white/10 shadow-xl pointer-events-none animate-in fade-in zoom-in-95 duration-100"
                style={{ 
                  left: `${activeCity.x}px`, 
                  top: `${activeCity.y - 60}px` 
                }}
              >
                <h4 className="font-bold">{activeCity.city}</h4>
                <p className="text-[10px] text-secondary-dark font-medium mt-0.5">{activeCity.count} Candidates Sourced</p>
              </div>
            )}
          </div>
        </div>

        {/* Heatmap data cards list */}
        <div className="glass-card p-6 lg:col-span-2 flex flex-col justify-between h-[450px]">
          <div>
            <h3 className="font-poppins font-bold text-sm text-slate-850 dark:text-slate-200">Top Hub Distributions</h3>
            <p className="text-xs text-slate-400 mb-4">Ranked candidate distribution by hub centers</p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {analyticsData.heatmapLocations.map((loc) => {
              const isHovered = activeCity?.city === loc.city;
              return (
                <div
                  key={loc.city}
                  onMouseEnter={() => setActiveCity(loc)}
                  onMouseLeave={() => setActiveCity(null)}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-colors
                    ${isHovered 
                      ? 'bg-primary/10 border-primary' 
                      : 'bg-white/40 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800'
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin size={14} className="text-primary" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{loc.city}</span>
                  </div>
                  <span className="font-mono text-slate-500 font-semibold">{loc.count} CVs</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
