import React from 'react';
import { Cpu } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface CTAProps {
  onNavigate: () => void;
}

const CTA: React.FC<CTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-12 px-6">
      <ScrollReveal direction="up" distance={40}>
        <div className="max-w-6xl mx-auto relative rounded-[3rem] overflow-hidden group">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[#000000]"></div>
            {/* Aurora effect */}
            <div className="absolute bottom-0 left-0 w-full h-[120%] bg-gradient-to-t from-[#FFCB74]/20 via-[#FFCB74]/5 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -left-20 top-0 w-96 h-96 bg-[#FFCB74] opacity-[0.05] blur-[100px] rounded-full animate-pulse-glow"></div>
            <div className="absolute -right-20 bottom-0 w-96 h-96 bg-[#FFCB74] opacity-[0.1] blur-[100px] rounded-full animate-pulse-glow" style={{animationDelay: '1s'}}></div>
            
            <div className="relative z-10 py-24 px-8 text-center">
                <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FFCB74] to-[#111] rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl group-hover:rotate-[24deg] transition-all duration-500">
                        <Cpu className="text-white" size={32} />
                    </div>
                </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white group-hover:scale-105 transition-transform duration-500">
                Ready to Transform Your <br />
                Hiring Process?
            </h2>
            <p className="text-gray-400 mb-10 text-sm md:text-base max-w-xl mx-auto">
                Join thousands of recruiters who trust ALIGN to find their next star employee.
            </p>
            
            <div className="flex flex-col gap-3 items-center">
                <button 
                    onClick={onNavigate}
                    className="bg-[#F6F6F6] text-[#111111] px-8 py-3.5 rounded-full font-bold hover:bg-[#FFCB74] hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,203,116,0.4)]"
                >
                    Get Started for Free
                </button>
                <p className="text-[10px] text-gray-500 mt-2">No credit card required.</p>
            </div>
            </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CTA;