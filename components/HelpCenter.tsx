
import React from 'react';
import { Search, Book, HelpCircle, MessageCircle, Shield, FileText } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface HelpCenterProps {
  onNavigate: (page: string) => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ onNavigate }) => {
  const cards = [
      {
          icon: <Book size={24} className="text-blue-400" />,
          title: "User Guide",
          desc: "Step-by-step tutorials on using the platform.",
          link: "guide"
      },
      {
          icon: <HelpCircle size={24} className="text-green-400" />,
          title: "FAQs",
          desc: "Answers to common questions about billing & tech.",
          link: "faq"
      },
      {
          icon: <Shield size={24} className="text-[#FFCB74]" />,
          title: "Security & Privacy",
          desc: "Learn how we protect your data.",
          link: "security"
      },
      {
          icon: <MessageCircle size={24} className="text-purple-400" />,
          title: "Contact Support",
          desc: "Get in touch with our engineering team.",
          link: "contact"
      }
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-[80vh] max-w-6xl mx-auto">
      <ScrollReveal direction="down" className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            How can we <span className="gold-gradient-text">help?</span>
        </h1>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="text-gray-500 group-focus-within:text-[#FFCB74] transition-colors" size={20} />
            </div>
            <input 
                type="text" 
                placeholder="Search for answers..." 
                className="w-full bg-[#1a1a1a] border border-[#2F2F2F] rounded-full py-4 pl-12 pr-6 text-white placeholder-gray-500 focus:border-[#FFCB74] focus:ring-1 focus:ring-[#FFCB74] outline-none transition-all shadow-lg"
            />
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                  <button 
                    onClick={() => onNavigate(card.link)}
                    className="w-full bg-[#1a1a1a] border border-[#2F2F2F] rounded-2xl p-8 flex items-center gap-6 hover:border-[#FFCB74]/30 hover:bg-[#202020] transition-all group text-left"
                  >
                      <div className="w-14 h-14 bg-[#111] rounded-2xl flex items-center justify-center border border-[#2F2F2F] group-hover:border-[#FFCB74]/20 transition-colors">
                          {card.icon}
                      </div>
                      <div>
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#FFCB74] transition-colors">{card.title}</h3>
                          <p className="text-gray-400 text-sm">{card.desc}</p>
                      </div>
                  </button>
              </ScrollReveal>
          ))}
      </div>
    </div>
  );
};

export default HelpCenter;
    