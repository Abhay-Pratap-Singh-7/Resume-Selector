import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "ALIGN cut our screening time by 90%. We found our Lead Engineer in days, not months. The automated parsing is incredibly accurate.",
    author: "Sarah J.",
    role: "HR Director @ TechFlow",
    image: "https://picsum.photos/40/40?random=1"
  },
  {
    text: "The AI ranking is incredibly accurate. It surfaced candidates we might have missed manually. Best investment for our hiring team.",
    author: "James T.",
    role: "Founder @ Dropbox",
    image: "https://picsum.photos/40/40?random=2"
  },
  {
    text: "Managing thousands of applications is now effortless. The platform automatically shortlists the best talent so we can focus on interviewing.",
    author: "Michael R.",
    role: "Recruiter @ Amazon",
    image: "https://picsum.photos/40/40?random=3"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What our users are saying</h2>
            <p className="text-gray-400">Discover how ALIGN has transformed hiring workflows for businesses worldwide</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
                <div key={idx} className={`p-8 rounded-2xl border bg-gradient-to-b from-[#1a1a1a] to-[#111111] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-10px_rgba(255,203,116,0.1)] group ${idx === 1 ? 'border-[#FFCB74]/30 shadow-[0_0_30px_-10px_rgba(255,203,116,0.1)]' : 'border-[#2F2F2F]/50 opacity-90 hover:opacity-100 hover:border-[#FFCB74]/30'}`}>
                    <div className="flex gap-1 mb-6">
                        {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-[#FFCB74] fill-[#FFCB74]" />)}
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300 mb-8 group-hover:text-[#F6F6F6] transition-colors">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                        <img src={t.image} alt={t.author} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all border border-transparent group-hover:border-[#FFCB74]" />
                        <div>
                            <div className="text-sm font-bold text-white">{t.author}</div>
                            <div className="text-xs text-gray-500 group-hover:text-[#FFCB74] transition-colors">{t.role}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
};

export default Testimonials;