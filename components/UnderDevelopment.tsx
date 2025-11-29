import React from 'react';
import { ArrowLeft, Construction } from 'lucide-react';

interface UnderDevelopmentProps {
  onBack: () => void;
}

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F6F6] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FFCB74] opacity-[0.05] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[40%] bg-[#FFCB74] opacity-[0.05] rounded-full blur-[120px]"></div>

        <div className="relative z-10 text-center max-w-2xl">
            <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-[#1a1a1a] rounded-3xl flex items-center justify-center border border-[#FFCB74]/30 shadow-[0_0_40px_-10px_rgba(255,203,116,0.2)]">
                    <Construction size={48} className="text-[#FFCB74] animate-pulse" />
                </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Under <span className="text-[#FFCB74]">Development</span>
            </h1>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg mx-auto">
                We're currently crafting this feature. This page is being built and will be available soon.
            </p>

            <button 
                onClick={onBack}
                className="group flex items-center gap-2 mx-auto bg-[#F6F6F6] text-[#111111] px-8 py-3.5 rounded-full font-bold hover:bg-[#FFCB74] transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,203,116,0.4)]"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </button>
        </div>
    </div>
  );
};

export default UnderDevelopment;