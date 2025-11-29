import React from 'react';
import { Layers, ArrowRight, Sparkles, MessageSquare, Mail } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ProductsProps {
  onLaunch: () => void;
}

const Products: React.FC<ProductsProps> = ({ onLaunch }) => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-[80vh] max-w-7xl mx-auto">
       {/* Description Line */}
       <ScrollReveal direction="down" className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Our <span className="gold-gradient-text">Product Suite</span>
            </h1>
            <div className="w-24 h-1 bg-[#FFCB74] mx-auto rounded-full mb-8"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                Specialized AI tools designed to automate, analyze, and accelerate your recruitment workflow. 
                Experience the future of hiring with our dedicated solutions.
            </p>
       </ScrollReveal>

       {/* Cards Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Bulk Resume Scoring (Active) */}
            <ScrollReveal delay={0.1} direction="up" className="h-full">
                <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-8 hover:border-[#FFCB74]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(255,203,116,0.15)] group flex flex-col h-full relative overflow-hidden">
                     {/* Background Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-br from-[#FFCB74]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     
                     <div className="absolute top-0 right-0 p-5 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Sparkles className="text-[#FFCB74] animate-pulse-glow" size={24} />
                     </div>
                     
                     <div className="w-16 h-16 bg-[#252525] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#FFCB74] transition-colors duration-300 shadow-lg relative z-10">
                        <Layers size={32} className="text-gray-300 group-hover:text-[#111111] transition-colors" />
                     </div>

                     <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Bulk Resume Scoring</h3>
                     <p className="text-gray-400 text-sm mb-10 leading-relaxed flex-1 relative z-10">
                        Upload unlimited PDFs and let our Gemini-powered engine rank candidates, extract skills, and provide detailed pros & cons analysis in seconds.
                     </p>

                     <button 
                        onClick={onLaunch}
                        className="relative z-10 w-full py-4 rounded-xl border border-[#FFCB74]/30 text-[#FFCB74] font-bold hover:bg-[#FFCB74] hover:text-[#111111] transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(255,203,116,0.3)]"
                     >
                        Launch Tool <ArrowRight size={18} />
                     </button>
                </div>
            </ScrollReveal>

            {/* Coming Soon Card 1 */}
            <ScrollReveal delay={0.2} direction="up" className="h-full">
                 <div className="bg-[#111] border border-[#2F2F2F] rounded-3xl p-8 opacity-70 flex flex-col h-full relative border-dashed hover:opacity-100 hover:border-gray-700 transition-all">
                     <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-8 border border-[#2F2F2F]">
                        <MessageSquare size={28} className="text-gray-600" />
                     </div>
                     <h3 className="text-2xl font-bold text-gray-500 mb-4">Interview Copilot</h3>
                     <p className="text-gray-600 text-sm mb-10 leading-relaxed flex-1">
                        Real-time interview assistance with live transcription and suggested follow-up questions based on candidate responses.
                     </p>
                     <div className="w-full py-4 rounded-xl border border-[#2F2F2F] bg-[#151515] text-gray-500 font-medium text-center text-sm cursor-not-allowed flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div> Coming Soon
                     </div>
                 </div>
            </ScrollReveal>

             {/* Coming Soon Card 2 */}
            <ScrollReveal delay={0.3} direction="up" className="h-full">
                 <div className="bg-[#111] border border-[#2F2F2F] rounded-3xl p-8 opacity-70 flex flex-col h-full relative border-dashed hover:opacity-100 hover:border-gray-700 transition-all">
                     <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-8 border border-[#2F2F2F]">
                        <Mail size={28} className="text-gray-600" />
                     </div>
                     <h3 className="text-2xl font-bold text-gray-500 mb-4">Automated Outreach</h3>
                     <p className="text-gray-600 text-sm mb-10 leading-relaxed flex-1">
                        AI-generated personalized email sequences to engage top talent and schedule interviews automatically.
                     </p>
                     <div className="w-full py-4 rounded-xl border border-[#2F2F2F] bg-[#151515] text-gray-500 font-medium text-center text-sm cursor-not-allowed flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div> Coming Soon
                     </div>
                 </div>
            </ScrollReveal>
       </div>
    </div>
  );
};

export default Products;