import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText, CheckCircle2, XCircle, Search, Database, BarChart3, Cpu, Sparkles, Zap, Brain } from 'lucide-react';

interface HeroProps {
  onNavigate: () => void;
}

interface Candidate {
  id: string;
  name: string;
  role: string;
  skills: { name: string; level: number; req: number }[];
  pros: string[];
  cons: string[];
  exp: number;
  score: number;
  status: 'pending' | 'analyzing' | 'match' | 'reject';
}

// Updated Mock Data to reflect "Best Employees" (High Performers)
const mockCandidates: Candidate[] = [
  { 
    id: 'ID-9021', 
    name: 'Alex Morgan', 
    role: 'Principal Architect', 
    skills: [{name:'System Design', level:99, req:90}, {name:'Cloud Native', level:98, req:85}, {name:'Leadership', level:96, req:80}], 
    pros: ['Top 1% Global Talent', 'Ex-Google Tech Lead', 'Scaling Expert'],
    cons: ['Remote Only'],
    exp: 12, 
    score: 99, 
    status: 'pending' 
  },
  { 
    id: 'ID-9022', 
    name: 'Sarah Jones', 
    role: 'Senior Frontend', 
    skills: [{name:'React/Next', level:97, req:90}, {name:'UX Patterns', level:95, req:85}, {name:'Perf Opt', level:92, req:80}], 
    pros: ['Open Source Creator', 'Fast Execution', 'Design System Pro'],
    cons: ['High Salary Req'],
    exp: 7, 
    score: 97, 
    status: 'pending' 
  },
  { 
    id: 'ID-9024', 
    name: 'Emily Wong', 
    role: 'Staff Engineer', 
    skills: [{name:'Go/Rust', level:98, req:80}, {name:'Kubernetes', level:96, req:75}, {name:'Dist. Systems', level:97, req:85}], 
    pros: ['Infrastructure Wizard', 'Team Multiplier', 'Tech Blogger'],
    cons: ['Strict Availability'],
    exp: 10, 
    score: 98, 
    status: 'pending' 
  },
  { 
    id: 'ID-9025', 
    name: 'David Kim', 
    role: 'SRE Specialist', 
    skills: [{name:'Terraform', level:95, req:85}, {name:'Observability', level:92, req:80}, {name:'Incident Mgmt', level:94, req:75}], 
    pros: ['Reliability Focus', 'On-Call Veteran', 'Automation Expert'],
    cons: ['Limited Frontend'],
    exp: 6, 
    score: 95, 
    status: 'pending' 
  },
  { 
    id: 'ID-9026', 
    name: 'Lisa Chen', 
    role: 'Product Lead', 
    skills: [{name:'Strategy', level:96, req:90}, {name:'Data Analysis', level:98, req:85}, {name:'Growth', level:92, req:80}], 
    pros: ['Visionary Thinker', 'Ex-Startup Founder', 'Data Driven'],
    cons: ['Non-Technical'],
    exp: 8, 
    score: 96, 
    status: 'pending' 
  }
];

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'parsing' | 'analyzing' | 'scoring'>('idle');
  const [displayedScore, setDisplayedScore] = useState(0);

  // Main processing loop
  useEffect(() => {
    let timeout: any;

    const processCandidate = async () => {
      // 1. Reset Phase
      setPhase('parsing');
      setDisplayedScore(0);
      const current = candidates[activeIndex];
      
      // Update status to analyzing
      setCandidates(prev => prev.map((c, i) => i === activeIndex ? { ...c, status: 'analyzing' } : c));

      // 2. Parsing Phase (1.0s) - Faster feel
      await new Promise(r => setTimeout(r, 1000));
      setPhase('analyzing');

      // 3. Analysis Phase (1.5s)
      await new Promise(r => setTimeout(r, 1500));
      setPhase('scoring');

      // 4. Scoring Phase (Score count up)
      const targetScore = current.score;
      const duration = 1000;
      const steps = 20;
      const stepTime = duration / steps;
      
      for (let i = 0; i <= steps; i++) {
          setDisplayedScore(Math.round((targetScore / steps) * i));
          await new Promise(r => setTimeout(r, stepTime));
      }

      // 5. Finalize
      await new Promise(r => setTimeout(r, 500));
      const finalStatus = 'match'; // All are matches in this "Best Employee" demo
      setCandidates(prev => prev.map((c, i) => i === activeIndex ? { 
          ...c, 
          status: finalStatus
      } : c));
      
      // 6. Next Candidate
      await new Promise(r => setTimeout(r, 1000));
      setActiveIndex(prev => (prev + 1) % candidates.length);
      
      // If looped back to start, reset statuses for demo continuity
      if (activeIndex === candidates.length - 1) {
          setCandidates(mockCandidates);
      }
    };

    processCandidate();

    return () => clearTimeout(timeout);
  }, [activeIndex]);

  const activeCandidate = candidates[activeIndex];

  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F2F2F]/50 border border-[#FFCB74]/20 text-[#FFCB74] text-xs font-medium mb-8 backdrop-blur-sm animate-fade-in-up hover:bg-[#2F2F2F]/80 transition-colors cursor-default">
        <span className="w-2 h-2 rounded-full bg-[#FFCB74] animate-pulse"></span>
        <span>Powered by Gemini 1.5 Pro</span>
        <ArrowRight size={12} />
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1] animate-slide-up" style={{animationDelay: '0.1s'}}>
        Find the <span className="gold-gradient-text">Best Employees</span> <br />
        with Smart AI Ranking.
      </h1>

      {/* Subheadline */}
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
        Upload resumes in <span className="text-[#F6F6F6] font-medium">bulk</span> and let our <span className="text-[#F6F6F6] font-medium">Gemini-powered engine</span> provide detailed <span className="text-[#F6F6F6] font-medium">Pros & Cons</span> analysis instantly.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 animate-slide-up" style={{animationDelay: '0.3s'}}>
        <button onClick={onNavigate} className="bg-[#FFCB74] hover:bg-[#eebb55] text-[#111111] px-8 py-3.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(255,203,116,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,203,116,0.5)]">
          Start Bulk Scanning
        </button>
        <button onClick={onNavigate} className="text-[#F6F6F6] hover:text-[#FFCB74] font-medium flex items-center gap-2 px-6 py-3.5 transition-colors group">
          See Sample Report <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* DASHBOARD VISUALIZATION */}
      <div className="relative w-full max-w-6xl mx-auto h-[680px] md:h-[600px] glass-card rounded-3xl border border-[#2F2F2F] p-2 md:p-3 animate-slide-up hover:border-[#FFCB74]/30 transition-colors duration-500 overflow-hidden shadow-2xl" style={{animationDelay: '0.4s'}}>
        
        {/* Background Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

        {/* 3x4 GRID SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[repeat(9,minmax(0,1fr))] md:grid-rows-[1fr_1fr_1fr] gap-2 md:gap-3 w-full h-full relative z-10">
            
            {/* MODULE 1: BULK SCANNER (Left Panel - Full Height) */}
            <div className="row-span-3 md:row-span-3 col-span-1 bg-[#111111]/60 border border-white/5 rounded-xl overflow-hidden flex flex-col backdrop-blur-sm relative">
                <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1.5">
                        <Database size={12} className="text-[#FFCB74]" /> Bulk Scanner
                    </span>
                    <span className="text-[9px] bg-[#2F2F2F] px-1.5 py-0.5 rounded text-gray-400">Queue: 50+</span>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
                    {candidates.map((c, i) => (
                        <div 
                            key={c.id} 
                            className={`p-3 rounded-lg border transition-all duration-300 relative overflow-hidden group
                            ${i === activeIndex 
                                ? 'bg-[#FFCB74]/10 border-[#FFCB74]/50 shadow-[0_0_15px_-5px_rgba(255,203,116,0.2)]' 
                                : c.status === 'match' 
                                    ? 'bg-green-500/5 border-green-500/20 opacity-60' 
                                    : 'bg-[#1a1a1a] border-white/5 opacity-50'
                            }`}
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                <div className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold transition-colors
                                    ${i === activeIndex ? 'bg-[#FFCB74] text-black' : 'bg-[#2F2F2F] text-gray-400'}
                                `}>
                                    {c.status === 'match' ? <CheckCircle2 size={16} /> : <FileText size={14} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                      <div className={`text-xs font-bold truncate ${i === activeIndex ? 'text-white' : 'text-gray-400'}`}>{c.name}</div>
                                      <div className="text-[9px] font-mono text-gray-600">
                                          {c.status === 'analyzing' ? 'SCANNING' : c.status === 'match' ? 'DONE' : 'QUEUED'}
                                      </div>
                                    </div>
                                    <div className="text-[10px] text-gray-600 truncate">{c.role}</div>
                                </div>
                            </div>
                            {i === activeIndex && phase !== 'idle' && (
                                <div className="absolute bottom-0 left-0 h-[2px] bg-[#FFCB74] transition-all duration-300" style={{width: phase === 'parsing' ? '30%' : phase === 'analyzing' ? '70%' : '100%'}}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* MODULE 2: GEMINI ANALYSIS (Center Top - 2 Cols) */}
            <div className="row-span-1 md:row-span-2 col-span-1 md:col-span-2 bg-[#111111]/80 border border-white/5 rounded-xl overflow-hidden relative flex flex-col">
                <div className="absolute top-0 left-0 w-full p-2.5 flex justify-between items-center z-20 border-b border-white/5 bg-[#111111]">
                    <div className="flex items-center gap-2">
                        <Sparkles size={12} className="text-[#FFCB74]" />
                        <span className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">Gemini AI Analysis</span>
                    </div>
                    <div className="px-1.5 py-0.5 rounded bg-[#FFCB74]/20 border border-[#FFCB74]/30 text-[9px] font-bold text-[#FFCB74]">Powered by Gemini 1.5</div>
                </div>

                <div className="flex-1 flex relative mt-8">
                     {/* Left: Document Scan Visual */}
                     <div className="w-1/3 border-r border-white/5 p-4 flex items-center justify-center relative overflow-hidden bg-black/20">
                        <div className="w-20 h-28 bg-[#1F1F1F] border border-gray-700 rounded p-2 relative shadow-lg transform transition-transform duration-500 hover:scale-105">
                            <div className="space-y-2 opacity-40">
                                <div className="h-1.5 w-1/3 bg-gray-500 rounded-sm"></div>
                                <div className="h-1.5 w-full bg-gray-600 rounded-sm"></div>
                                <div className="h-1.5 w-full bg-gray-600 rounded-sm"></div>
                                <div className="h-1.5 w-3/4 bg-gray-600 rounded-sm"></div>
                                <div className="h-1.5 w-full bg-gray-600 rounded-sm mt-2"></div>
                            </div>
                            {/* Scanning Laser */}
                            {phase === 'parsing' && (
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#FFCB74] shadow-[0_0_10px_#FFCB74] animate-scan z-10 opacity-80"></div>
                            )}
                        </div>
                     </div>

                     {/* Right: Analysis Report (Recruiter View) */}
                     <div className="w-2/3 p-4 text-[10px] overflow-hidden relative bg-[#0a0a0a]">
                        {phase !== 'idle' ? (
                            <div className="space-y-3">
                                {/* Header */}
                                <div className="flex items-center gap-2 border-b border-gray-800 pb-2 animate-fade-in-up" style={{animationDelay: '0s'}}>
                                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                                        <FileText size={12} />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-xs">{activeCandidate.name}</div>
                                        <div className="text-gray-500">{activeCandidate.role}</div>
                                    </div>
                                    <div className="ml-auto px-2 py-0.5 bg-green-900/30 text-green-400 rounded border border-green-900/50 font-bold">
                                        Highly Recommended
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                                    <div className="text-gray-500 font-bold mb-1">EXECUTIVE SUMMARY</div>
                                    <p className="text-gray-300 leading-relaxed">
                                        <span className="text-[#FFCB74] font-medium">Top 1% Talent Detected.</span> Candidate demonstrates exceptional proficiency in {activeCandidate.skills[0].name} and {activeCandidate.skills[1].name}.
                                        The career trajectory shows consistent high-impact delivery in complex environments.
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                                    <div className="text-gray-500 font-bold mb-1">KEY ATTRIBUTES</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="bg-[#2F2F2F] text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">High Growth Potential</span>
                                        <span className="bg-[#2F2F2F] text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">Leadership Material</span>
                                        <span className="bg-[#2F2F2F] text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">Tech Lead</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-700 flex-col gap-2">
                                <Loader2 size={16} className="animate-spin" />
                                <span>Waiting for resume stream...</span>
                            </div>
                        )}
                     </div>
                </div>
            </div>

            {/* MODULE 3: SMART RANK SCORE (Right Top) */}
            <div className="row-span-1 col-span-1 bg-[#111111]/80 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden group hover:border-[#FFCB74]/30 transition-colors">
                 <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <Zap size={12} className="text-[#FFCB74]" />
                    <span className="text-[9px] uppercase font-bold text-gray-300">Smart Rank Score</span>
                </div>

                 <div className="relative z-10 text-center mt-2 flex flex-col items-center justify-center h-full">
                    <div className="text-4xl font-black text-[#F6F6F6] tabular-nums tracking-tighter leading-none">
                        {displayedScore}<span className="text-lg text-[#FFCB74]">%</span>
                    </div>
                    <div className="text-[9px] text-gray-500 mt-1 font-medium">MATCH PROBABILITY</div>
                 </div>
                 
                 {/* Glow effect */}
                 <div className="absolute bottom-[-20%] left-[50%] -translate-x-1/2 w-24 h-24 bg-[#FFCB74] opacity-5 blur-xl rounded-full"></div>
            </div>

            {/* MODULE 4: PROS & CONS (Right Middle) */}
            <div className="row-span-1 col-span-1 bg-[#111111]/80 border border-white/5 rounded-xl p-3 relative overflow-hidden flex flex-col">
                <div className="flex items-center gap-1.5 mb-2 z-10">
                    <Search size={12} className="text-[#FFCB74]" />
                    <span className="text-[9px] uppercase font-bold text-gray-300">Pros & Cons Report</span>
                </div>
                
                <div className="flex-1 flex flex-col gap-1 relative z-10 overflow-hidden">
                    {phase === 'analyzing' || phase === 'scoring' ? (
                        <>
                           <div className="text-[8px] font-bold text-green-400/80 mb-0.5 flex items-center gap-1"><CheckCircle2 size={8} /> PROS</div>
                           {activeCandidate.pros.slice(0,2).map((p, i) => (
                             <div key={`p-${i}`} className="flex items-start gap-1.5 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                               <span className="text-[9px] text-gray-300 leading-tight border-l-2 border-green-500/50 pl-1.5">{p}</span>
                             </div>
                           ))}
                           
                           <div className="text-[8px] font-bold text-red-400/80 mt-1.5 mb-0.5 flex items-center gap-1"><XCircle size={8} /> CONS</div>
                           {activeCandidate.cons.slice(0,1).map((c, i) => (
                             <div key={`c-${i}`} className="flex items-start gap-1.5 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                               <span className="text-[9px] text-gray-300 leading-tight border-l-2 border-red-500/50 pl-1.5">{c}</span>
                             </div>
                           ))}
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] text-gray-600 animate-pulse">
                            Generating insights...
                        </div>
                    )}
                </div>
            </div>

            {/* MODULE 5: GENAI CORE (Bottom Center - 2 Cols) */}
            <div className="row-span-1 col-span-1 md:col-span-2 bg-[#111111]/80 border border-white/5 rounded-xl p-3 relative overflow-hidden flex flex-col">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,203,116,0.03),transparent)]"></div>
                 
                 <div className="flex items-center justify-between mb-1 z-10">
                    <div className="flex items-center gap-1.5">
                        <Brain size={12} className="text-[#FFCB74]" />
                        <span className="text-[9px] uppercase font-bold text-gray-300">GenAI Processing Core</span>
                    </div>
                </div>

                {/* Synapse Visualization */}
                <div className="flex-1 flex items-center justify-center relative">
                    <div className="w-full max-w-[320px] h-12 flex items-center justify-between relative z-10 px-4">
                        {/* Input Node */}
                        <div className="flex flex-col items-center gap-1">
                            <div className={`w-8 h-8 rounded-full border border-gray-600 bg-[#1a1a1a] flex items-center justify-center transition-all duration-300 ${phase !== 'idle' ? 'border-[#FFCB74] shadow-[0_0_10px_rgba(255,203,116,0.3)]' : ''}`}>
                                <FileText size={14} className="text-gray-400" />
                            </div>
                            <span className="text-[8px] text-gray-500">PDF Input</span>
                        </div>
                        
                        {/* Connecting Lines */}
                        <div className="flex-1 h-[1px] bg-gray-800 relative mx-2 mb-4 overflow-hidden">
                             {phase === 'analyzing' && (
                                 <div className="absolute top-0 left-0 w-1/2 h-full bg-[#FFCB74] shadow-[0_0_5px_#FFCB74] animate-[slide-right_1s_infinite]"></div>
                             )}
                        </div>
                        
                        {/* Processing Node (Center) */}
                        <div className="flex flex-col items-center gap-1 relative">
                            <div className={`w-10 h-10 rounded-full border-2 bg-[#111] flex items-center justify-center z-10 relative transition-all duration-300 ${phase === 'analyzing' ? 'border-[#FFCB74] scale-110' : 'border-gray-700'}`}>
                                <Cpu size={18} className={`${phase === 'analyzing' ? 'text-[#FFCB74] animate-pulse' : 'text-gray-500'}`} />
                            </div>
                            {phase === 'analyzing' && (
                                <div className="absolute top-0 left-0 w-10 h-10 rounded-full border border-[#FFCB74] animate-ping opacity-30"></div>
                            )}
                            <span className="text-[8px] text-[#FFCB74] font-bold">Gemini API</span>
                        </div>

                        {/* Connecting Lines */}
                        <div className="flex-1 h-[1px] bg-gray-800 relative mx-2 mb-4 overflow-hidden">
                             {phase === 'scoring' && (
                                 <div className="absolute top-0 left-0 w-1/2 h-full bg-[#FFCB74] shadow-[0_0_5px_#FFCB74] animate-[slide-right_1s_infinite]"></div>
                             )}
                        </div>

                        {/* Output Node */}
                        <div className="flex flex-col items-center gap-1">
                            <div className={`w-8 h-8 rounded-full border border-gray-600 bg-[#1a1a1a] flex items-center justify-center transition-all duration-300 ${phase === 'scoring' ? 'border-[#FFCB74] shadow-[0_0_10px_rgba(255,203,116,0.3)]' : ''}`}>
                                <Sparkles size={14} className="text-gray-400" />
                            </div>
                             <span className="text-[8px] text-gray-500">Ranked</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODULE 6: SKILLS (Right Bottom) */}
            <div className="row-span-1 col-span-1 bg-[#111111]/80 border border-white/5 rounded-xl p-3 flex flex-col relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                        <BarChart3 size={12} className="text-[#FFCB74]" />
                        <span className="text-[9px] uppercase font-bold text-gray-300">Skill Match</span>
                    </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center space-y-2">
                    {activeCandidate.skills.slice(0,2).map((skill, i) => (
                        <div key={i} className="space-y-1">
                            <div className="flex justify-between text-[8px] text-gray-400">
                                <span>{skill.name}</span>
                                <span className="text-green-400">
                                    {phase !== 'idle' ? `${skill.level}%` : '--'}
                                </span>
                            </div>
                            <div className="h-1 w-full bg-[#2F2F2F] rounded-full overflow-hidden flex">
                                <div 
                                    className="h-full bg-[#FFCB74] transition-all duration-1000" 
                                    style={{width: phase !== 'idle' ? `${skill.level}%` : '0%'}}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>

    </section>
  );
};

// Helper component for loading
const Loader2 = ({size, className}: {size: number, className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);

export default Hero;