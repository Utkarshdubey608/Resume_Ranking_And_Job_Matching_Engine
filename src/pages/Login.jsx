import React, { useState } from 'react';
import { Mail, Lock, Sparkles, CheckCircle2, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('demo@smarthire.ai');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Sarah Jenkins',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
        role: 'Talent Acquisition Director'
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC] dark:bg-slate-950 font-sans">
      {/* Left side: Premium AI Sourcing Illustration & Visual Pitch */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#1E293B] to-[#0F172A] border-r border-slate-800/40 p-12 flex-col justify-between">
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-secondary/15 rounded-full blur-[90px] pointer-events-none"></div>
        
        {/* Header Branding */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white font-bold text-xl shadow-lg shadow-primary/30">
            S
          </div>
          <span className="font-poppins font-bold text-xl text-white tracking-wide">
            SmartHire AI
          </span>
        </div>

        {/* Dynamic Centerpiece */}
        <div className="relative z-10 flex flex-col items-center justify-center py-12">
          {/* Hologram-like Dashboard Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-2xl relative"
          >
            {/* Widget top bar */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary-dark flex items-center gap-1.5">
                <Sparkles size={11} className="animate-spin text-secondary-dark" /> AI matching engine
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-success animate-ping"></div>
            </div>

            {/* Score circle */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-4 border-white/5 bg-gradient-to-b from-white/10 to-transparent">
                <svg className="absolute w-full h-full -rotate-90">
                  <circle cx="56" cy="56" r="50" className="stroke-white/10 fill-none" strokeWidth="4" />
                  <circle cx="56" cy="56" r="50" className="stroke-primary fill-none stroke-dasharray-[314] stroke-dashoffset-[38] animate-pulse" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div className="text-center">
                  <span className="text-3xl font-extrabold text-white">92%</span>
                  <p className="text-[9px] text-slate-400">Match score</p>
                </div>
              </div>
            </div>

            {/* Simulated Candidate match lists */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center">JD</div>
                  <span className="text-xs font-semibold text-slate-200">John Doe</span>
                </div>
                <span className="text-[10px] font-bold text-success bg-success/15 px-2 py-0.5 rounded-full">94% Fit</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-teal-500 text-[10px] font-bold text-white flex items-center justify-center">AS</div>
                  <span className="text-xs font-semibold text-slate-200">Alice Smith</span>
                </div>
                <span className="text-[10px] font-bold text-success bg-success/15 px-2 py-0.5 rounded-full">97% Fit</span>
              </div>
            </div>
          </motion.div>

          {/* Floating UI Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-2"
          >
            <ShieldCheck size={16} className="text-success" />
            <span className="text-xs font-semibold text-white">GDPR Compliant</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-8 -left-6 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 size={16} className="text-secondary" />
            <span className="text-xs font-semibold text-white">10k+ Resumes Scanned</span>
          </motion.div>
        </div>

        {/* Pitch Copy */}
        <div className="relative z-10">
          <h2 className="text-2xl font-poppins font-bold text-white mb-2 leading-snug">
            Transform Recruitment with AI Powered Talent Intelligence
          </h2>
          <p className="text-sm text-slate-400 font-light max-w-md">
            Leverage advanced semantic parsing, dynamic resume ranking, and automated candidate matching algorithms to build high-performance teams in record time.
          </p>
        </div>
      </div>

      {/* Right side: Modern Auth Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          {/* Responsive Branding (mobile only) */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8 justify-center">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white font-bold text-lg shadow-md shadow-primary/20">
              S
            </div>
            <span className="font-poppins font-bold text-lg text-slate-800 dark:text-white">
              SmartHire AI
            </span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl font-poppins font-extrabold text-slate-950 dark:text-white mb-1.5 tracking-tight">
              Sign In
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Access your hiring command center
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-danger/10 border border-danger/20 text-xs font-semibold text-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Corporate Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-primary dark:text-secondary-dark hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-sm border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4.5 h-4.5 rounded border-slate-300 dark:border-slate-800 text-primary focus:ring-primary bg-white dark:bg-slate-900"
                />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 select-none">
                  Remember this device
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex justify-center items-center gap-2 relative overflow-hidden"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Assist */}
          <div className="mt-8 p-4 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10 text-center">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
              💡 <span className="font-bold text-primary dark:text-secondary-dark">Demo Credentials:</span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Email: <span className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded">demo@smarthire.ai</span> | Pass: <span className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded">password123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
