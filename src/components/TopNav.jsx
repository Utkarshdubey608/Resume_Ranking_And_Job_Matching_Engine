import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Sun, Moon, Sparkles, User, Settings, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function TopNav({ searchVal, setSearchVal, isDarkMode, setIsDarkMode, user }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Strong AI Match Detected",
      message: "John Doe matches 94% on Senior Backend Developer.",
      type: "match",
      time: "10m ago",
      unread: true
    },
    {
      id: 2,
      title: "Resume Parsed Successfully",
      message: "Priya Sharma's resume parsed: 9 core skills extracted.",
      type: "parse",
      time: "2h ago",
      unread: true
    },
    {
      id: 3,
      title: "Hiring Predictor Update",
      message: "Frontend dev shortage predicted for Q3. Sourcing recommended.",
      type: "alert",
      time: "1d ago",
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="sticky top-0 z-35 flex items-center justify-between h-16 px-6 bg-white/70 dark:bg-slate-950/60 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/40">
      {/* Global Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search candidates by name, skill, education..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
          {searchVal && (
            <button 
              onClick={() => setSearchVal('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Sparkles / Hackathon indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 dark:border-secondary/20 text-xs font-medium text-primary dark:text-secondary-dark shadow-sm">
          <Sparkles size={14} className="text-secondary animate-pulse" />
          <span>Demo Mode</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          title="Toggle Light/Dark Theme"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors relative"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead} 
                    className="text-xs font-semibold text-primary hover:text-primary-dark dark:text-secondary-dark"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-3.5 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-3
                        ${n.unread ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
                    >
                      <div className="mt-0.5">
                        {n.type === 'match' ? (
                          <CheckCircle2 size={16} className="text-success" />
                        ) : n.type === 'parse' ? (
                          <Sparkles size={16} className="text-secondary" />
                        ) : (
                          <ShieldAlert size={16} className="text-warning" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200">{n.title}</h4>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">{n.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"}
              alt="Profile"
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-primary/10"
            />
            <span className="hidden md:inline text-xs font-semibold text-slate-700 dark:text-slate-200 pr-1">
              {user?.name?.split(' ')[0] || 'Admin'}
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
              <div className="p-1.5">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left">
                  <User size={14} /> My Profile
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left">
                  <Settings size={14} /> Account Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
