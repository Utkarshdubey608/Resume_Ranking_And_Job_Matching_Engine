import React, { useState } from 'react';
import { User, Shield, Moon, Bell, Database, Check, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings({ isDarkMode, setIsDarkMode, user, setUser }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [saveStatus, setSaveStatus] = useState(false);
  
  // Profile settings state
  const [name, setName] = useState(user?.name || 'Sarah Jenkins');
  const [email, setEmail] = useState(user?.email || 's.jenkins@smarthire.ai');
  const [role, setRole] = useState(user?.role || 'Talent Acquisition Director');
  
  // Notification options
  const [notifMatch, setNotifMatch] = useState(true);
  const [notifParse, setNotifParse] = useState(true);
  const [notifShortage, setNotifShortage] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaveStatus(true);
    
    // Save to user session state
    if (setUser) {
      setUser({
        ...user,
        name,
        email,
        role
      });
    }

    setTimeout(() => {
      setSaveStatus(false);
    }, 1500);
  };

  const menuItems = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Security & Auth', icon: Shield },
    { id: 'theme', label: 'Theme Settings', icon: Moon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data Management', icon: Database },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white tracking-tight">System Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure user profiles, notification priorities, and workspace rules
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Left: Navigation Tabs */}
        <div className="md:col-span-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs text-left transition-all
                  ${isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/20' 
                    : 'text-slate-600 dark:text-slate-450 hover:bg-slate-100/60 dark:hover:bg-slate-900/50 hover:text-slate-900'
                  }`}
              >
                <Icon size={15} /> {item.label}
              </button>
            );
          })}
        </div>

        {/* Right: Active settings page forms */}
        <div className="md:col-span-3">
          <div className="glass-card p-6 min-h-[380px] flex flex-col justify-between text-xs">
            
            <form onSubmit={handleSave} className="space-y-6">
              
              {/* SECTION: Profile Settings */}
              {activeSection === 'profile' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Corporate Profile Details</h3>
                    <p className="text-[10px] text-slate-450 mt-0.5">Manage user credentials and directory contact info</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-800 dark:text-white font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Role Title</label>
                      <input 
                        type="text" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-800 dark:text-white font-medium focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Corporate Email</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-850 dark:text-slate-400 font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: Security Settings */}
              {activeSection === 'security' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Security & Sign In</h3>
                    <p className="text-[10px] text-slate-450 mt-0.5">Manage session durations and password resets</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full sm:w-2/3 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">New Password</label>
                      <input type="password" placeholder="Min. 8 characters" className="w-full sm:w-2/3 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: Theme Preference */}
              {activeSection === 'theme' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Workspace Customization</h3>
                    <p className="text-[10px] text-slate-450 mt-0.5">Configure system colors and light/dark theme layouts</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Dark Mode Support</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Switches core canvases to deep slate styles</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none
                          ${isDarkMode ? 'bg-primary' : 'bg-slate-350'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Primary Color Accents</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Toggle interface branding color highlights</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary border-2 border-white cursor-pointer shadow-md" />
                        <span className="w-5 h-5 rounded-full bg-secondary border-2 border-transparent hover:border-white cursor-pointer" />
                        <span className="w-5 h-5 rounded-full bg-success border-2 border-transparent hover:border-white cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: Notification Rules */}
              {activeSection === 'notifications' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Notification Subscriptions</h3>
                    <p className="text-[10px] text-slate-450 mt-0.5">Receive alert summaries on matching event occurrences</p>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-900/5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifMatch} 
                        onChange={() => setNotifMatch(!notifMatch)}
                        className="w-4.5 h-4.5 rounded border-slate-350 text-primary mt-0.5" 
                      />
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Top Match Notifications</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Triggers immediate banners when applicants score &gt; 90%</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-900/5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifParse} 
                        onChange={() => setNotifParse(!notifParse)}
                        className="w-4.5 h-4.5 rounded border-slate-350 text-primary mt-0.5" 
                      />
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">OCR Parser Summary Logs</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Delivers a formatted extraction recap after every CV file upload</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-900/5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifShortage} 
                        onChange={() => setNotifShortage(!notifShortage)}
                        className="w-4.5 h-4.5 rounded border-slate-350 text-primary mt-0.5" 
                      />
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">Predictive Hiring Deficit Alerts</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Receive weekly forecasts alerting you of upcoming pipeline shortages</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* SECTION: Data Management */}
              {activeSection === 'data' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200">Database & Logs Management</h3>
                    <p className="text-[10px] text-slate-450 mt-0.5">Backup system registers or purge mock histories</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900/10">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">Export Candidates Registry</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Download full JSON profile databases</p>
                      <button 
                        type="button"
                        className="mt-3.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary dark:text-secondary-dark font-bold text-[10px]"
                      >
                        Download DB JSON
                      </button>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900/10">
                      <h4 className="font-bold text-danger">Purge Sourcing Pipeline</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Reset database to default seed mock values</p>
                      <button 
                        type="button"
                        onClick={() => {
                          if (window.confirm("Restore factory database seed configurations?")) {
                            window.location.reload();
                          }
                        }}
                        className="mt-3.5 px-3 py-1.5 rounded-lg bg-danger/10 text-danger font-bold text-[10px]"
                      >
                        Purge & Reset DB
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Footer */}
              {activeSection !== 'theme' && activeSection !== 'data' && (
                <div className="flex justify-end pt-5 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold flex items-center gap-1.5 shadow-lg shadow-primary/10"
                  >
                    {saveStatus ? (
                      <>
                        <Check size={14} /> Saved Changes
                      </>
                    ) : (
                      <>
                        <Save size={14} /> Save Preferences
                      </>
                    )}
                  </button>
                </div>
              )}

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
