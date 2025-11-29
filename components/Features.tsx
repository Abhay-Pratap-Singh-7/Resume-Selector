import React from 'react';
import { CheckCircle2, XCircle, Zap, UploadCloud, FileText, Sparkles, Brain, Cpu, TrendingUp, Layers, ListFilter } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Intelligence that goes <br />
          <span className="gold-gradient-text">deeper than keywords</span>
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg">
            Stop manually reading resumes. Our Gemini-powered engine finds the best employees by analyzing skills, ranking top talent, and providing detailed pros & cons.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Feature 1 - Pros & Cons Analysis (Top Left) */}
        <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-8 hover-glow-border transition-colors group relative overflow-hidden min-h-[400px] flex flex-col">
            <div className="relative z-10 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#111] border border-[#2F2F2F] flex items-center justify-center mb-4 group-hover:border-[#FFCB74]/50 transition-colors">
                    <ListFilter size={18} className="text-[#FFCB74]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Deep Pros & Cons Analysis</h3>
                <p className="text-gray-400 text-sm">Instant, unbiased breakdown of strengths and risks for every candidate.</p>
            </div>
            
            {/* Visual: Analysis Card */}
            <div className="relative flex-1 w-full bg-[#111111] border border-[#2F2F2F] rounded-xl overflow-hidden shadow-2xl p-5 flex flex-col gap-4 group-hover:-translate-y-1 transition-transform duration-500">
                <div className="flex items-center gap-3 border-b border-[#2F2F2F] pb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold text-gray-300">AM</div>
                    <div>
                        <div className="text-xs font-bold text-white">Alex Morgan</div>
                        <div className="text-[10px] text-gray-500">Principal Architect</div>
                    </div>
                    <div className="ml-auto px-2 py-0.5 bg-[#FFCB74]/10 text-[#FFCB74] text-[10px] font-bold rounded border border-[#FFCB74]/20 shadow-[0_0_10px_-5px_#FFCB74]">Top 1%</div>
                </div>

                <div className="space-y-2">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Strengths
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-green-500/5 border border-green-500/10 rounded-lg">
                        <CheckCircle2 size={14} className="text-green-500 mt-0.5" />
                        <span className="text-xs text-gray-300 leading-tight">10+ Years Cloud Native Experience with proven scaling at Google</span>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-green-500/5 border border-green-500/10 rounded-lg">
                        <CheckCircle2 size={14} className="text-green-500 mt-0.5" />
                        <span className="text-xs text-gray-300 leading-tight">Strong Technical Leadership</span>
                    </div>
                </div>

                <div className="space-y-2">
                     <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Risks
                    </div>
                     <div className="flex items-start gap-2 p-2 bg-red-500/5 border border-red-500/10 rounded-lg">
                        <XCircle size={14} className="text-red-500 mt-0.5" />
                        <span className="text-xs text-gray-300 leading-tight">Salary expectation is above budget</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Feature 2 - Smart Ranking (Top Right) */}
        <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-8 hover-glow-border transition-colors relative overflow-hidden min-h-[400px] flex flex-col group">
            <div className="relative z-10 mb-6">
                 <div className="w-10 h-10 rounded-full bg-[#111] border border-[#2F2F2F] flex items-center justify-center mb-4 group-hover:border-[#FFCB74]/50 transition-colors">
                    <TrendingUp size={18} className="text-[#FFCB74]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Smart Ranking Score</h3>
                <p className="text-gray-400 text-sm">Identify the best employees instantly with our context-aware scoring engine.</p>
            </div>
             
             {/* Visual: Leaderboard */}
             <div className="relative flex-1 w-full flex flex-col gap-2 group-hover:-translate-y-1 transition-transform duration-500">
                 {/* Item 1 - Top */}
                 <div className="bg-[#111] border border-[#FFCB74]/50 rounded-xl p-4 flex items-center gap-4 shadow-[0_0_20px_-5px_rgba(255,203,116,0.15)] relative overflow-hidden">
                     <div className="absolute left-0 top-0 h-full w-1 bg-[#FFCB74]"></div>
                     <div className="text-[#FFCB74] font-black text-xl italic">01</div>
                     <div className="w-10 h-10 rounded-full bg-[#FFCB74] flex items-center justify-center text-black font-bold text-sm shadow-lg">SJ</div>
                     <div className="flex-1">
                         <div className="flex justify-between items-end mb-1">
                            <div className="text-sm font-bold text-white">Sarah Jones</div>
                            <div className="text-xs text-[#FFCB74] font-mono">Match</div>
                         </div>
                         <div className="h-1.5 w-full bg-[#2F2F2F] rounded-full overflow-hidden">
                             <div className="h-full w-[98%] bg-[#FFCB74]"></div>
                         </div>
                     </div>
                     <div className="text-xl font-black text-white">98<span className="text-sm text-gray-500 font-normal">%</span></div>
                 </div>

                 {/* Item 2 */}
                 <div className="bg-[#111]/60 border border-[#2F2F2F] rounded-xl p-4 flex items-center gap-4">
                     <div className="text-gray-600 font-bold text-xl">02</div>
                     <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-gray-400 text-sm border border-[#333]">EW</div>
                     <div className="flex-1">
                         <div className="text-sm font-bold text-gray-300 mb-1">Emily Wong</div>
                         <div className="h-1.5 w-full bg-[#2F2F2F] rounded-full overflow-hidden">
                             <div className="h-full w-[85%] bg-gray-600"></div>
                         </div>
                     </div>
                     <div className="text-xl font-bold text-gray-500">85<span className="text-sm text-gray-700 font-normal">%</span></div>
                 </div>

                 {/* Item 3 */}
                 <div className="bg-[#111]/40 border border-[#2F2F2F] rounded-xl p-4 flex items-center gap-4 opacity-70">
                     <div className="text-gray-700 font-bold text-xl">03</div>
                     <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-gray-500 text-sm border border-[#333]">DK</div>
                     <div className="flex-1">
                         <div className="text-sm font-bold text-gray-500 mb-1">David Kim</div>
                         <div className="h-1.5 w-full bg-[#2F2F2F] rounded-full overflow-hidden">
                             <div className="h-full w-[72%] bg-gray-700"></div>
                         </div>
                     </div>
                     <div className="text-xl font-bold text-gray-600">72<span className="text-sm text-gray-800 font-normal">%</span></div>
                 </div>
             </div>
        </div>

        {/* Feature 3 - Latest Tech (Gemini) - Bottom Left */}
        <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-8 hover-glow-border transition-colors min-h-[320px] flex flex-col overflow-hidden relative group">
             <div className="relative z-10 mb-6">
                 <div className="w-10 h-10 rounded-full bg-[#111] border border-[#2F2F2F] flex items-center justify-center mb-4 group-hover:border-[#FFCB74]/50 transition-colors">
                    <Sparkles size={18} className="text-[#FFCB74]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Powered by Gemini 1.5</h3>
                <p className="text-gray-400 text-sm">Leveraging Google's latest multimodal AI to understand context, nuance, and potential.</p>
             </div>
             
             {/* Visual: Neural Core */}
             <div className="flex-1 flex items-center justify-center relative z-10 mt-2">
                 <div className="relative w-full max-w-[200px] h-[120px] flex items-center justify-center">
                    
                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-30">
                        <line x1="10%" y1="50%" x2="50%" y2="50%" stroke="#FFCB74" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
                        <line x1="90%" y1="50%" x2="50%" y2="50%" stroke="#FFCB74" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
                        <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#FFCB74" strokeWidth="1" strokeOpacity="0.5" />
                        <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#FFCB74" strokeWidth="1" strokeOpacity="0.5" />
                        <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#FFCB74" strokeWidth="1" strokeOpacity="0.5" />
                        <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="#FFCB74" strokeWidth="1" strokeOpacity="0.5" />
                    </svg>

                    {/* Central Chip */}
                    <div className="relative z-10 w-16 h-16 bg-[#111] border border-[#FFCB74] rounded-xl flex items-center justify-center shadow-[0_0_30px_-5px_rgba(255,203,116,0.4)] animate-pulse-glow">
                        <Brain size={28} className="text-[#FFCB74]" />
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute top-0 right-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-4 left-10 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                 </div>
             </div>
             
             {/* Background Mesh */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,203,116,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,203,116,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none"></div>
        </div>

        {/* Feature 4 - Bulk Scanning - Bottom Right */}
        <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-8 hover-glow-border transition-colors min-h-[320px] relative overflow-hidden flex flex-col group">
             <div className="relative z-10 mb-6">
                 <div className="w-10 h-10 rounded-full bg-[#111] border border-[#2F2F2F] flex items-center justify-center mb-4 group-hover:border-[#FFCB74]/50 transition-colors">
                    <Layers size={18} className="text-[#FFCB74]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Bulk Resume Scanning</h3>
                <p className="text-gray-400 text-sm">Drag & drop thousands of resumes. Our parallel engine processes them in seconds.</p>
             </div>
             
             {/* Visual: Queue Processing */}
             <div className="flex-1 flex items-end justify-center pb-2 relative z-10">
                  <div className="w-full bg-[#111] border border-[#2F2F2F] rounded-xl p-5 flex flex-col gap-3 shadow-xl group-hover:-translate-y-1 transition-transform">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#2F2F2F] flex items-center justify-center relative">
                              <UploadCloud size={20} className="text-gray-300" />
                              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#2F2F2F]"></div>
                          </div>
                          <div>
                              <div className="text-sm font-bold text-white">Processing Batch #204</div>
                              <div className="text-[10px] text-gray-500">Engineering_Q3_Hiring.zip</div>
                          </div>
                      </div>
                      
                      <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                              <span className="text-gray-400">STATUS: PARSING</span>
                              <span className="text-[#FFCB74]">485 / 500</span>
                          </div>
                          <div className="h-2 w-full bg-[#2F2F2F] rounded-full overflow-hidden">
                              <div className="h-full w-[95%] bg-[#FFCB74] animate-pulse relative overflow-hidden">
                                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_1s_infinite]"></div>
                              </div>
                          </div>
                      </div>
                  </div>
             </div>
        </div>
      </div>
    </section>
  );
};

export default Features;