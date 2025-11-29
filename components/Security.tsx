
import React from 'react';
import { ShieldCheck, Lock, Database, Server, EyeOff, FileX } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface SecurityProps {
  onNavigate: (page: string) => void;
}

const Security: React.FC<SecurityProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-[80vh] max-w-7xl mx-auto">
      <ScrollReveal direction="down" className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold mb-6">
            <ShieldCheck size={14} /> Enterprise-Grade Security
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Your Data is <span className="text-[#FFCB74]">Safe & Private</span>
        </h1>
        <div className="w-24 h-1 bg-[#FFCB74] mx-auto rounded-full mb-8"></div>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            At ALIGN, we prioritize data sovereignty. We utilize a transient processing model, 
            meaning your candidate data is analyzed in real-time and never stored on our servers.
        </p>
      </ScrollReveal>

      {/* Core Security Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          {/* Feature 1: Zero Retention */}
          <ScrollReveal delay={0.1} direction="up" className="h-full">
            <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-8 h-full hover:border-[#FFCB74]/30 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#111] rounded-2xl flex items-center justify-center mb-6 border border-[#2F2F2F]">
                    <Database size={28} className="text-red-400" />
                    <div className="absolute w-8 h-[2px] bg-red-400 rotate-45"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Zero Data Retention</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    We do not store resumes, job descriptions, or analysis results in any persistent database. 
                    Once the session ends, all data is permanently wiped from memory.
                </p>
            </div>
          </ScrollReveal>

          {/* Feature 2: Encryption */}
          <ScrollReveal delay={0.2} direction="up" className="h-full">
            <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-8 h-full hover:border-[#FFCB74]/30 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#111] rounded-2xl flex items-center justify-center mb-6 border border-[#2F2F2F]">
                    <Lock size={28} className="text-[#FFCB74]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">End-to-End Encryption</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    All data transmitted between your browser, our servers, and the AI engine is encrypted using TLS 1.3 standards. 
                    Your information is secure in transit.
                </p>
            </div>
          </ScrollReveal>

          {/* Feature 3: Transient Processing */}
          <ScrollReveal delay={0.3} direction="up" className="h-full">
            <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-8 h-full hover:border-[#FFCB74]/30 transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#111] rounded-2xl flex items-center justify-center mb-6 border border-[#2F2F2F]">
                    <Server size={28} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Transient Processing</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Our architecture is stateless. The AI processes inputs and returns outputs immediately. 
                    We do not use your data to train our models.
                </p>
            </div>
          </ScrollReveal>
      </div>

      {/* Visual Section */}
      <ScrollReveal direction="up" className="bg-[#151515] border border-[#2F2F2F] rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#FFCB74]/5 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4">How we handle your files</h2>
                  <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                          <div className="mt-1 bg-green-500/10 p-1 rounded">
                              <ShieldCheck size={16} className="text-green-500" />
                          </div>
                          <div>
                              <strong className="text-white block text-sm">Upload</strong>
                              <span className="text-gray-400 text-xs">Files are streamed securely to the analysis engine.</span>
                          </div>
                      </li>
                      <li className="flex items-start gap-3">
                          <div className="mt-1 bg-blue-500/10 p-1 rounded">
                              <EyeOff size={16} className="text-blue-500" />
                          </div>
                          <div>
                              <strong className="text-white block text-sm">Analyze</strong>
                              <span className="text-gray-400 text-xs">AI extracts insights without human verification (No humans see your data).</span>
                          </div>
                      </li>
                      <li className="flex items-start gap-3">
                          <div className="mt-1 bg-red-500/10 p-1 rounded">
                              <FileX size={16} className="text-red-500" />
                          </div>
                          <div>
                              <strong className="text-white block text-sm">Discard</strong>
                              <span className="text-gray-400 text-xs">Immediately after response, the file is deleted from RAM.</span>
                          </div>
                      </li>
                  </ul>
              </div>
              
              <div className="flex-1 flex justify-center">
                   <div className="w-64 h-64 relative">
                        {/* Abstract Shield Animation */}
                        <div className="absolute inset-0 border-2 border-[#2F2F2F] rounded-full animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute inset-4 border-2 border-[#2F2F2F] rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ShieldCheck size={64} className="text-[#FFCB74]" />
                        </div>
                        <div className="absolute top-0 right-0 p-2 bg-[#111] border border-green-500/30 rounded-lg text-[10px] text-green-500 font-mono animate-bounce">
                            SSL SECURE
                        </div>
                   </div>
              </div>
          </div>
      </ScrollReveal>
    </div>
  );
};

export default Security;
    