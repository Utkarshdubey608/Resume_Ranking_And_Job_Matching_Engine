import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, Sparkles, Plus, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ResumeUpload({ candidates, setCandidates, setActiveTab, setSelectedCandidate }) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [isParsing, setIsParsing] = useState(false);
  const [parseStep, setParseStep] = useState(0);
  const [parsedCandidate, setParsedCandidate] = useState(null);
  const fileInputRef = useRef(null);

  const steps = [
    "Reading raw text bytes (OCR extraction)...",
    "Running Named Entity Recognition (NER)...",
    "Parsing technical skills and work chronology...",
    "Validating education history and certificates...",
    "Running semantic AI matching scores..."
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (selectedFiles) => {
    const arr = Array.from(selectedFiles);
    setFiles(arr);
    triggerParse(arr[0].name);
  };

  // Simulate AI parsing pipeline
  const triggerParse = (fileName) => {
    setIsParsing(true);
    setParseStep(0);
    setParsedCandidate(null);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setParseStep(currentStep);
      } else {
        clearInterval(interval);
        completeParse(fileName);
      }
    }, 700);
  };

  const completeParse = (fileName) => {
    setIsParsing(false);
    
    // Generate high-fidelity parsed candidate depending on name
    const mockParsed = {
      id: `CAN-00${candidates.length + 1}`,
      name: "Devin Fincher",
      email: "devin.fincher@stacklabs.dev",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
      education: "B.S. Computer Science (Cornell University)",
      experience: "5 years (StackLabs & Airbnb)",
      currentRole: "Senior Full Stack Engineer",
      resumeStrength: 89,
      skills: ["React", "TypeScript", "Node.js", "Python", "FastAPI", "SQL", "Docker", "AWS"],
      missingSkills: ["Kubernetes", "Terraform"],
      certifications: ["AWS Certified Developer - Associate", "Certified React Engineer"],
      status: "Highly Matched",
      jobMatches: {
        "JOB-001": { score: 88, skillMatch: 85, expMatch: 90, eduMatch: 90, certMatch: 80 },
        "JOB-002": { score: 92, skillMatch: 95, expMatch: 90, eduMatch: 90, certMatch: 90 },
        "JOB-003": { score: 55, skillMatch: 45, expMatch: 70, eduMatch: 90, certMatch: 30 },
        "JOB-004": { score: 82, skillMatch: 80, expMatch: 85, eduMatch: 90, certMatch: 70 }
      },
      location: "Bangalore",
      registeredDate: new Date().toISOString().split('T')[0]
    };

    setParsedCandidate(mockParsed);
    
    // Confetti pop!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Add the parsed candidate to the live list
  const handleSaveToPipeline = () => {
    if (parsedCandidate) {
      setCandidates([parsedCandidate, ...candidates]);
      setSelectedCandidate(parsedCandidate);
      setActiveTab('candidates');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-poppins font-extrabold text-slate-900 dark:text-white tracking-tight">Resume Upload</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Drag and drop resumes to run real-time semantic parsing and score extraction
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Upload Zone Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-card p-6">
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`w-full min-h-[300px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300
                ${dragActive 
                  ? 'border-primary bg-primary/5 scale-[0.99]' 
                  : 'border-slate-200 dark:border-slate-800/80 hover:border-primary/50 hover:bg-slate-50/30 dark:hover:bg-slate-900/10'
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-4 shadow-inner">
                <UploadCloud size={32} className="animate-pulse" />
              </div>
              
              <h3 className="font-poppins font-bold text-base text-slate-800 dark:text-slate-200">
                Drag & drop files or <span className="text-primary hover:underline">browse</span>
              </h3>
              <p className="text-xs text-slate-450 dark:text-slate-450 mt-1.5 max-w-xs">
                Supports PDF and DOCX files. Drag multiple documents to batch parse.
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-5 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-primary" />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">{files[0].name}</p>
                    <p className="text-[10px] text-slate-450">{(files[0].size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                {parsedCandidate ? (
                  <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle2 size={12} /> Ready</span>
                ) : isParsing ? (
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full animate-pulse">Parsing...</span>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400">Selected</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Parsing Loading & Success Display */}
        <div className="lg:col-span-2">
          
          {/* Fallback state: Waiting for file */}
          {!isParsing && !parsedCandidate && (
            <div className="glass-card p-6 h-full min-h-[300px] flex flex-col items-center justify-center text-center">
              <AlertCircle size={32} className="text-slate-350 mb-3" />
              <h3 className="font-poppins font-bold text-sm text-slate-700 dark:text-slate-300">Awaiting Resume</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Select or drag a file in the upload zone to begin real-time parsing extraction.
              </p>
            </div>
          )}

          {/* Loader Stage: Simulated Parsing Phase */}
          <AnimatePresence>
            {isParsing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-secondary-dark animate-spin" /> NLP Extract Pipeline
                  </h3>
                  
                  {/* Step list */}
                  <div className="space-y-4">
                    {steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]
                          ${parseStep > idx 
                            ? 'bg-success text-white' 
                            : parseStep === idx 
                              ? 'bg-primary text-white animate-pulse' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                          }`}
                        >
                          {parseStep > idx ? "✓" : idx + 1}
                        </div>
                        <span className={`
                          ${parseStep === idx 
                            ? 'text-slate-800 dark:text-white font-semibold' 
                            : parseStep > idx 
                              ? 'text-slate-400 line-through' 
                              : 'text-slate-455'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-8 space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>PROGRESS</span>
                    <span>{Math.round(((parseStep + 1) / steps.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${((parseStep + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success card: Parsed Fields Display */}
          <AnimatePresence>
            {parsedCandidate && !isParsing && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-6 space-y-5 border-success/35 dark:border-success/20"
              >
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-poppins font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Sparkles size={16} className="text-secondary" /> Extraction Complete!
                  </h3>
                  <span className="text-[10px] font-bold text-success bg-success/15 px-2 py-0.5 rounded-full">Score: {parsedCandidate.resumeStrength}</span>
                </div>

                {/* Extracted Entity Details */}
                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Name</span>
                    <span className="font-semibold text-slate-850 dark:text-slate-200">{parsedCandidate.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Email</span>
                    <span className="font-semibold text-slate-850 dark:text-slate-200">{parsedCandidate.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Education</span>
                    <span className="font-semibold text-slate-850 dark:text-slate-200">{parsedCandidate.education}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Experience</span>
                    <span className="font-semibold text-slate-850 dark:text-slate-200">{parsedCandidate.experience}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Parsed Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {parsedCandidate.skills.map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-700 dark:text-slate-300">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Certifications</span>
                    <span className="font-medium text-slate-600 dark:text-slate-450">{parsedCandidate.certifications.join(', ')}</span>
                  </div>
                </div>

                <button 
                  onClick={handleSaveToPipeline}
                  className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-success to-emerald-600 text-xs font-bold text-white shadow-lg shadow-success/15 hover:shadow-success/20 flex items-center justify-center gap-1.5"
                >
                  <Plus size={14} /> Add Candidate to Sourcing Pipeline
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
