// Seed data for SmartHire AI Platform

export const initialJobs = [
  {
    id: "JOB-001",
    title: "Senior Backend Developer",
    department: "Engineering",
    requiredSkills: ["Python", "FastAPI", "SQL", "Docker", "AWS", "Kubernetes"],
    experience: "5+ years",
    education: "B.S. or M.S. in Computer Science",
    description: "We are looking for a Senior Backend Developer to design, build, and maintain our high-performance microservices, API layers, and AI pipeline infrastructure. You will optimize database queries and manage containerized deployments.",
    matchingCandidatesCount: 5
  },
  {
    id: "JOB-002",
    title: "Lead Frontend Engineer",
    department: "Engineering",
    requiredSkills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js", "GraphQL"],
    experience: "6+ years",
    education: "B.S. in Computer Science or equivalent",
    description: "Join our core UI platform team to lead the frontend development of our Next.js application. You will create highly aesthetic, fast, and accessible user interfaces, collaborating closely with product designers.",
    matchingCandidatesCount: 4
  },
  {
    id: "JOB-003",
    title: "Cloud DevOps Architect",
    department: "Platform Operations",
    requiredSkills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Python", "Go"],
    experience: "7+ years",
    education: "B.S. in Computer Science or related engineering field",
    description: "Scale our multi-region Kubernetes clusters on AWS. Automate infrastructure using Terraform, build resilient CI/CD release pipelines, and secure cloud environments.",
    matchingCandidatesCount: 3
  },
  {
    id: "JOB-004",
    title: "Machine Learning Engineer",
    department: "AI Research",
    requiredSkills: ["Python", "PyTorch", "FastAPI", "SQL", "Docker", "Hugging Face", "LLMs"],
    experience: "3+ years",
    education: "M.S. or Ph.D. in Computer Science / ML / Statistics",
    description: "Design and implement custom machine learning pipelines for text parsing, clustering, and embedding-based search. Help integrate LLMs to automate candidate ranking.",
    matchingCandidatesCount: 3
  }
];

export const initialCandidates = [
  {
    id: "CAN-001",
    name: "John Doe",
    email: "john.doe@techcorp.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    education: "M.S. Computer Science (Stanford University)",
    experience: "6 years (TechCorp, Inc. & Stripe)",
    currentRole: "Lead Backend Developer",
    resumeStrength: 91,
    skills: ["Python", "FastAPI", "SQL", "Docker", "AWS", "Redis", "Git", "PostgreSQL"],
    missingSkills: ["Kubernetes"],
    certifications: ["AWS Certified Solutions Architect", "FastAPI Specialist"],
    status: "Highly Matched", // Highly Matched, Good Match, Average Match
    jobMatches: {
      "JOB-001": { score: 94, skillMatch: 95, expMatch: 90, eduMatch: 95, certMatch: 100 },
      "JOB-002": { score: 45, skillMatch: 30, expMatch: 80, eduMatch: 80, certMatch: 0 },
      "JOB-003": { score: 82, skillMatch: 75, expMatch: 85, eduMatch: 90, certMatch: 80 },
      "JOB-004": { score: 88, skillMatch: 85, expMatch: 90, eduMatch: 95, certMatch: 80 }
    },
    location: "Bangalore",
    registeredDate: "2026-06-01"
  },
  {
    id: "CAN-002",
    name: "Alice Smith",
    email: "alice.smith@devmail.net",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    education: "B.S. Software Engineering (MIT)",
    experience: "7 years (Vercel & Figma)",
    currentRole: "Staff Frontend Architect",
    resumeStrength: 95,
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js", "GraphQL", "Git", "Node.js"],
    missingSkills: ["AWS", "Docker"],
    certifications: ["React Advanced Certification", "Vercel Frontend Expert"],
    status: "Highly Matched",
    jobMatches: {
      "JOB-001": { score: 52, skillMatch: 40, expMatch: 85, eduMatch: 80, certMatch: 0 },
      "JOB-002": { score: 97, skillMatch: 98, expMatch: 95, eduMatch: 95, certMatch: 100 },
      "JOB-003": { score: 41, skillMatch: 30, expMatch: 70, eduMatch: 80, certMatch: 0 },
      "JOB-004": { score: 55, skillMatch: 45, expMatch: 80, eduMatch: 85, certMatch: 0 }
    },
    location: "Mumbai",
    registeredDate: "2026-06-05"
  },
  {
    id: "CAN-003",
    name: "Bob Johnson",
    email: "bob.johnson@codeloop.io",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    education: "B.S. Computer Science (UT Austin)",
    experience: "4 years (Netflix)",
    currentRole: "Senior Backend Developer",
    resumeStrength: 82,
    skills: ["Python", "FastAPI", "SQL", "Django", "PostgreSQL", "Git", "Redis"],
    missingSkills: ["Docker", "AWS", "Kubernetes"],
    certifications: ["Python Software Foundation Certified Professional"],
    status: "Good Match",
    jobMatches: {
      "JOB-001": { score: 85, skillMatch: 80, expMatch: 85, eduMatch: 90, certMatch: 90 },
      "JOB-002": { score: 38, skillMatch: 20, expMatch: 65, eduMatch: 85, certMatch: 0 },
      "JOB-003": { score: 62, skillMatch: 50, expMatch: 75, eduMatch: 85, certMatch: 40 },
      "JOB-004": { score: 80, skillMatch: 78, expMatch: 80, eduMatch: 85, certMatch: 80 }
    },
    location: "Pune",
    registeredDate: "2026-06-10"
  },
  {
    id: "CAN-004",
    name: "Sarah Jenkins",
    email: "s.jenkins@cloudops.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    education: "B.S. Computer Systems (Georgia Tech)",
    experience: "8 years (AWS & HashiCorp)",
    currentRole: "Cloud Platform Lead",
    resumeStrength: 88,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Python", "Go", "Linux", "Bash"],
    missingSkills: ["SQL", "FastAPI"],
    certifications: ["AWS Certified DevOps Engineer - Professional", "HashiCorp Certified Terraform Associate"],
    status: "Highly Matched",
    jobMatches: {
      "JOB-001": { score: 78, skillMatch: 70, expMatch: 90, eduMatch: 85, certMatch: 70 },
      "JOB-002": { score: 32, skillMatch: 15, expMatch: 75, eduMatch: 80, certMatch: 0 },
      "JOB-003": { score: 96, skillMatch: 98, expMatch: 95, eduMatch: 90, certMatch: 100 },
      "JOB-004": { score: 72, skillMatch: 65, expMatch: 85, eduMatch: 85, certMatch: 50 }
    },
    location: "Hyderabad",
    registeredDate: "2026-05-20"
  },
  {
    id: "CAN-005",
    name: "David Lee",
    email: "david.l@webcraft.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    education: "Associate Degree in Web Development (DevAcademy)",
    experience: "3 years (Freelance)",
    currentRole: "Frontend UI Developer",
    resumeStrength: 68,
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Git"],
    missingSkills: ["TypeScript", "Next.js", "GraphQL", "Framer Motion"],
    certifications: ["Certified JavaScript Developer"],
    status: "Average Match",
    jobMatches: {
      "JOB-001": { score: 15, skillMatch: 5, expMatch: 40, eduMatch: 50, certMatch: 10 },
      "JOB-002": { score: 71, skillMatch: 70, expMatch: 65, eduMatch: 60, certMatch: 80 },
      "JOB-003": { score: 10, skillMatch: 5, expMatch: 30, eduMatch: 50, certMatch: 0 },
      "JOB-004": { score: 18, skillMatch: 10, expMatch: 40, eduMatch: 55, certMatch: 0 }
    },
    location: "Chennai",
    registeredDate: "2026-06-12"
  },
  {
    id: "CAN-006",
    name: "Priya Sharma",
    email: "priya.sharma@aimodels.org",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    education: "Ph.D. Data Science (IIT Bombay)",
    experience: "5 years (Microsoft Research)",
    currentRole: "Senior ML Engineer",
    resumeStrength: 93,
    skills: ["Python", "PyTorch", "TensorFlow", "FastAPI", "SQL", "Docker", "AWS", "Hugging Face", "LLMs"],
    missingSkills: ["Kubernetes", "Go"],
    certifications: ["Professional Machine Learning Engineer (GCP)", "DeepLearning.AI Tensorflow Developer"],
    status: "Highly Matched",
    jobMatches: {
      "JOB-001": { score: 86, skillMatch: 85, expMatch: 85, eduMatch: 100, certMatch: 80 },
      "JOB-002": { score: 40, skillMatch: 20, expMatch: 80, eduMatch: 90, certMatch: 0 },
      "JOB-003": { score: 68, skillMatch: 60, expMatch: 80, eduMatch: 95, certMatch: 50 },
      "JOB-004": { score: 98, skillMatch: 99, expMatch: 95, eduMatch: 100, certMatch: 100 }
    },
    location: "Delhi",
    registeredDate: "2026-06-08"
  },
  {
    id: "CAN-007",
    name: "Raj Patel",
    email: "raj.patel@gmail.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
    education: "B.Tech Information Technology (VIT University)",
    experience: "2 years (Infosys)",
    currentRole: "Software Engineer",
    resumeStrength: 72,
    skills: ["Python", "HTML", "CSS", "Git", "SQL", "JavaScript"],
    missingSkills: ["FastAPI", "Docker", "AWS", "Kubernetes"],
    certifications: ["SQL Essential Training"],
    status: "Average Match",
    jobMatches: {
      "JOB-001": { score: 65, skillMatch: 60, expMatch: 60, eduMatch: 80, certMatch: 70 },
      "JOB-002": { score: 58, skillMatch: 55, expMatch: 60, eduMatch: 80, certMatch: 40 },
      "JOB-003": { score: 28, skillMatch: 20, expMatch: 40, eduMatch: 80, certMatch: 0 },
      "JOB-004": { score: 60, skillMatch: 58, expMatch: 55, eduMatch: 80, certMatch: 50 }
    },
    location: "Ahmedabad",
    registeredDate: "2026-06-11"
  },
  {
    id: "CAN-008",
    name: "Emily Davis",
    email: "emily.d@devopscloud.io",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    education: "B.S. Software Engineering (Caltech)",
    experience: "4 years (DigitalOcean)",
    currentRole: "DevOps Engineer",
    resumeStrength: 85,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Python", "Linux", "Bash", "GitHub Actions", "Terraform"],
    missingSkills: ["Go"],
    certifications: ["Certified Kubernetes Administrator (CKA)", "AWS Certified Developer"],
    status: "Good Match",
    jobMatches: {
      "JOB-001": { score: 81, skillMatch: 78, expMatch: 80, eduMatch: 90, certMatch: 80 },
      "JOB-002": { score: 35, skillMatch: 20, expMatch: 70, eduMatch: 90, certMatch: 0 },
      "JOB-003": { score: 92, skillMatch: 90, expMatch: 90, eduMatch: 90, certMatch: 100 },
      "JOB-004": { score: 74, skillMatch: 70, expMatch: 80, eduMatch: 90, certMatch: 70 }
    },
    location: "Kolkata",
    registeredDate: "2026-06-03"
  }
];

export const aiInsightsData = {
  inDemandSkill: {
    name: "Python",
    percentage: 78,
    trend: "+12% this month",
    description: "Required in 78% of active technical roles (Backend, AI/ML, DevOps scripting)."
  },
  hardestSkillToFind: {
    name: "Kubernetes",
    percentage: 12,
    trend: "High competition",
    description: "Only 12% of pipeline applicants possess verified production orchestration experience."
  },
  avgMatchScore: {
    value: "74%",
    trend: "+4.2% since Q1",
    description: "Average match rating across all active job applications."
  },
  highestRankedCandidate: {
    name: "Alice Smith",
    score: "97%",
    job: "Lead Frontend Engineer",
    description: "Matches 98% of the core interface engineering criteria."
  },
  recommendations: [
    {
      id: "REC-001",
      title: "Skill Upgrading Opportunity",
      type: "skill_gap",
      category: "Warning",
      message: "40% of applicants for the Senior Backend Developer role are missing 'Kubernetes'. Suggest updating job specs to include training paths, or focus searches on cloud engineers with orchestration skills."
    },
    {
      id: "REC-002",
      title: "Auto-Match Recommendation",
      type: "match",
      category: "Success",
      message: "John Doe matches 94% of criteria for the 'Senior Backend Developer' position. Recommend scheduling a screening round immediately."
    },
    {
      id: "REC-003",
      title: "Future Hiring Shortage Alert",
      type: "prediction",
      category: "Warning",
      message: "Model predicts a 20% deficit in Lead Frontend Engineer supply by Q3 based on seasonal regional developer migration data. Consider launching early sourcing campaigns in Bangalore."
    },
    {
      id: "REC-004",
      title: "Fast-Track Candidate Profile",
      type: "fast_track",
      category: "Success",
      message: "Priya Sharma possesses a Ph.D. from IIT Bombay and holds 98% compatibility with the ML Engineer posting. Resume scored 93/100 by parser."
    }
  ],
  skillGapTrends: [
    { skill: "Docker", missingCount: 4, demandCount: 12 },
    { skill: "AWS", missingCount: 3, demandCount: 15 },
    { skill: "Kubernetes", missingCount: 6, demandCount: 10 },
    { skill: "FastAPI", missingCount: 3, demandCount: 8 },
    { skill: "TypeScript", missingCount: 2, demandCount: 9 },
  ],
  hiringPredictions: [
    { month: "Jul", currentPipeline: 12, predictedNeeds: 14 },
    { month: "Aug", currentPipeline: 18, predictedNeeds: 15 },
    { month: "Sep", currentPipeline: 15, predictedNeeds: 22 },
    { month: "Oct", currentPipeline: 24, predictedNeeds: 25 },
    { month: "Nov", currentPipeline: 28, predictedNeeds: 27 },
    { month: "Dec", currentPipeline: 32, predictedNeeds: 30 },
  ]
};

export const analyticsData = {
  candidateGrowth: [
    { name: "Jan", candidates: 120 },
    { name: "Feb", candidates: 180 },
    { name: "Mar", candidates: 250 },
    { name: "Apr", candidates: 310 },
    { name: "May", candidates: 420 },
    { name: "Jun", candidates: 540 }
  ],
  topSkills: [
    { skill: "Python", count: 184 },
    { skill: "React", count: 156 },
    { skill: "AWS", count: 142 },
    { skill: "SQL", count: 130 },
    { skill: "Docker", count: 112 },
    { skill: "JavaScript", count: 98 },
    { skill: "Node.js", count: 86 },
    { skill: "Kubernetes", count: 54 },
    { skill: "FastAPI", count: 48 },
    { skill: "TypeScript", count: 42 }
  ],
  experienceDistribution: [
    { range: "0-2 Years", count: 12 },
    { range: "3-5 Years", count: 34 },
    { range: "6-8 Years", count: 45 },
    { range: "9-11 Years", count: 18 },
    { range: "12+ Years", count: 7 }
  ],
  educationDistribution: [
    { name: "Ph.D.", value: 5 },
    { name: "M.S. / M.Tech", value: 30 },
    { name: "B.S. / B.Tech", value: 55 },
    { name: "Diploma / Self", value: 10 }
  ],
  hiringFunnel: [
    { name: "Applied", value: 540, fill: "#3B82F6" },
    { name: "AI Screened", value: 380, fill: "#2563EB" },
    { name: "Shortlisted", value: 180, fill: "#1D4ED8" },
    { name: "Interviewing", value: 72, fill: "#14B8A6" },
    { name: "Offered", value: 24, fill: "#22C55E" }
  ],
  matchScoreDistribution: [
    { scoreRange: "90-100%", count: 15 },
    { scoreRange: "80-89%", count: 32 },
    { scoreRange: "70-79%", count: 48 },
    { scoreRange: "60-69%", count: 76 },
    { scoreRange: "50-59%", count: 110 },
    { scoreRange: "Under 50%", count: 259 }
  ],
  heatmapLocations: [
    { city: "Bangalore", x: 170, y: 360, count: 240 },
    { city: "Mumbai", x: 135, y: 280, count: 180 },
    { city: "Delhi NCR", x: 185, y: 150, count: 150 },
    { city: "Hyderabad", x: 180, y: 310, count: 110 },
    { city: "Pune", x: 140, y: 295, count: 95 },
    { city: "Chennai", x: 195, y: 380, count: 85 },
    { city: "Kolkata", x: 270, y: 240, count: 65 },
    { city: "Ahmedabad", x: 120, y: 235, count: 45 }
  ]
};
