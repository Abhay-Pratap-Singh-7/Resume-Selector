import React, { useState } from 'react';
import { UserPlus, Users, Rocket } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      number: '01',
      title: 'Define the Role',
      description: 'Upload your job description to set the AI\'s screening criteria and required skills.',
      icon: <UserPlus className="text-[#FFCB74]" size={20} />
    },
    {
        id: 2,
        number: '02',
        title: 'Upload Resumes',
        description: 'Bulk upload CVs or connect your ATS. Our AI parses thousands of documents in seconds.',
        icon: <Users className="text-gray-400" size={20} />
    },
    {
        id: 3,
        number: '03',
        title: 'Get Top Picks',
        description: 'Receive an instant shortlist of the most relevant candidates ranked by fit.',
        icon: <Rocket className="text-gray-400" size={20} />
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How SelectAI simplifies <br />
            candidate selection
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience a streamlined workflow where job definition, screening, and shortlisting come together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Block - Steps */}
          <div className="space-y-0">
             {steps.map((step) => (
                 <div 
                    key={step.id} 
                    className={`relative pl-8 pb-12 border-l-2 transition-colors duration-300 cursor-pointer group ${activeStep === step.id ? 'border-[#FFCB74]' : 'border-[#2F2F2F]'}`}
                    onClick={() => setActiveStep(step.id)}
                 >
                     <span className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-all duration-300 ${activeStep === step.id ? 'bg-[#111111] border-[#FFCB74] scale-110 shadow-[0_0_10px_#FFCB74]' : 'bg-[#111111] border-[#2F2F2F] group-hover:border-gray-500'}`}></span>
                     
                     <div className={`mb-2 inline-flex items-center gap-2`}>
                        <span className={`text-xs font-mono px-2 py-1 rounded transition-colors ${activeStep === step.id ? 'text-[#FFCB74] bg-[#FFCB74]/10' : 'text-gray-500 bg-[#2F2F2F]'}`}>
                            {step.number}
                        </span>
                     </div>
                     
                     <h3 className={`text-2xl font-bold mb-3 transition-colors ${activeStep === step.id ? 'text-white' : 'text-gray-500'}`}>{step.title}</h3>
                     <p className={`text-sm md:text-base leading-relaxed transition-colors ${activeStep === step.id ? 'text-gray-400' : 'text-gray-600'}`}>
                         {step.description}
                     </p>
                  </div>
             ))}
          </div>

          {/* Right Block - Visual */}
          <div className="sticky top-24 bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl h-[500px] flex items-center justify-center group">
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#FFCB74]/5 to-transparent pointer-events-none"></div>
             
             {/* Dynamic Content based on Step */}
             <div className="relative z-10 w-full max-w-md mx-auto transition-all duration-500 transform">
                {activeStep === 1 && (
                     <div className="bg-[#111111] border border-[#2F2F2F] rounded-xl p-8 animate-slide-up shadow-2xl">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-[#FFCB74]/10 rounded-2xl flex items-center justify-center">
                                <UserPlus className="text-[#FFCB74]" size={32} />
                            </div>
                        </div>
                        <div className="text-center mb-8">
                            <h4 className="text-white text-lg font-bold mb-1">Define Job Role</h4>
                            <p className="text-xs text-gray-500">Upload Job Description to start</p>
                        </div>
                        <div className="space-y-4">
                            <div className="h-10 bg-[#2F2F2F] rounded-lg border border-gray-800 w-full"></div>
                            <div className="h-10 bg-[#2F2F2F] rounded-lg border border-gray-800 w-full"></div>
                            <div className="h-10 bg-[#FFCB74] rounded-lg w-full mt-4"></div>
                        </div>
                     </div>
                )}

                {activeStep === 2 && (
                    <div className="bg-[#111111] border border-[#2F2F2F] rounded-xl p-6 animate-slide-up shadow-2xl w-full">
                        <div className="flex items-center justify-between mb-6 border-b border-[#2F2F2F] pb-4">
                            <h4 className="font-bold">Import Candidates</h4>
                            <button className="text-xs bg-[#FFCB74] text-black px-3 py-1.5 rounded-md font-bold">+ Upload</button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                                    <div className="flex-1">
                                        <div className="h-2 w-24 bg-gray-700 rounded mb-1"></div>
                                        <div className="h-2 w-16 bg-gray-800 rounded"></div>
                                    </div>
                                    <div className="text-xs text-gray-500">Resume_{i}.pdf</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeStep === 3 && (
                    <div className="relative animate-slide-up">
                         {/* Dashboard Mock */}
                         <div className="bg-[#111111] border border-[#2F2F2F] rounded-xl p-4 w-full h-64 shadow-2xl overflow-hidden relative">
                             <div className="flex gap-4 mb-4">
                                 <div className="w-1/3 h-24 bg-[#2F2F2F] rounded-lg border border-gray-800"></div>
                                 <div className="w-1/3 h-24 bg-[#2F2F2F] rounded-lg border border-gray-800"></div>
                                 <div className="w-1/3 h-24 bg-[#2F2F2F] rounded-lg border border-gray-800"></div>
                             </div>
                             <div className="h-32 bg-[#2F2F2F]/50 rounded-lg w-full"></div>
                         </div>
                         {/* Floating Success Toast */}
                         <div className="absolute -bottom-6 -right-6 bg-[#222] border border-[#FFCB74]/30 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-float">
                             <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                                 <Rocket size={16} />
                             </div>
                             <div>
                                 <div className="text-sm font-bold text-white">Shortlist Ready!</div>
                                 <div className="text-xs text-gray-400">98% Match found</div>
                             </div>
                         </div>
                    </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;