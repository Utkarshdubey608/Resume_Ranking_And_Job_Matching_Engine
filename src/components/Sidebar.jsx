import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UploadCloud, 
  Briefcase, 
  GitCompare, 
  Award, 
  BarChart3, 
  BrainCircuit, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, onLogout, user }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'upload', label: 'Resume Upload', icon: UploadCloud },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'matching', label: 'Job Matching', icon: GitCompare },
    { id: 'rankings', label: 'Rankings', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'insights', label: 'AI Insights', icon: BrainCircuit },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 border-r 
        ${isCollapsed ? 'w-20' : 'w-64'} 
        bg-white/70 dark:bg-slate-950/60 backdrop-blur-md 
        border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between`}
    >
      <div>
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200/50 dark:border-slate-800/40">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-primary/20">
              S
            </div>
            {!isCollapsed && (
              <span className="font-poppins font-bold text-lg bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent truncate">
                SmartHire AI
              </span>
            )}
          </div>
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border border-slate-200/50 dark:border-slate-800/40 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 font-medium text-sm group relative
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/5 text-primary dark:text-secondary-dark border-l-4 border-primary' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
              >
                <Icon 
                  size={19} 
                  className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-110 
                    ${isActive ? 'text-primary dark:text-secondary-dark' : 'text-slate-500 dark:text-slate-400'}`} 
                />
                
                {!isCollapsed && <span className="truncate">{item.label}</span>}
                
                {/* Tooltip for collapsed mode */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 rounded bg-slate-950 text-white text-xs invisible opacity-0 -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Section / Logout */}
      <div className="p-3 border-t border-slate-200/50 dark:border-slate-800/40">
        {!isCollapsed && user && (
          <div className="flex items-center gap-3 p-2 mb-2 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
            <img 
              src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&h=80&q=80"} 
              alt={user.name} 
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div className="overflow-hidden">
              <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate">{user.name}</h4>
              <p className="text-[10px] text-slate-500 truncate">{user.role || 'HR Director'}</p>
            </div>
          </div>
        )}

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-danger hover:bg-danger/10 dark:hover:bg-danger/20 font-medium text-sm transition-all duration-200 group relative"
        >
          <LogOut size={19} className="flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
          {!isCollapsed && <span>Logout</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-4 px-2 py-1 rounded bg-danger text-white text-xs invisible opacity-0 -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
