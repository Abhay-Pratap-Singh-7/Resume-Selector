import React from 'react';
import { Twitter, Linkedin, Facebook, Instagram, Github } from 'lucide-react';

interface FooterProps {
  onNavigate: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#111111] pt-20 pb-10 border-t border-[#2F2F2F] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-['Syne'] font-bold text-2xl tracking-tight text-white mb-6">
              <span>SelectAI</span>
            </div>
            <div className="flex gap-4 text-gray-400">
                <button onClick={onNavigate} className="hover:text-white"><Twitter size={18} /></button>
                <button onClick={onNavigate} className="hover:text-white"><Linkedin size={18} /></button>
                <button onClick={onNavigate} className="hover:text-white"><Facebook size={18} /></button>
                <button onClick={onNavigate} className="hover:text-white"><Instagram size={18} /></button>
                <button onClick={onNavigate} className="hover:text-white"><Github size={18} /></button>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white text-sm">Company</h4>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Blog</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">About</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Contact us</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Careers</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Security</button>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white text-sm">Product</h4>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Resume Parsing</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">ATS Integrations</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Pricing</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Partners</button>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white text-sm">Resources</h4>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Help center</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">FAQs</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">User guides</button>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white text-sm">Platform</h4>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Candidate Database</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Analytics</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Infrastructure</button>
            <button onClick={onNavigate} className="text-left text-xs text-gray-400 hover:text-[#FFCB74]">Compliance</button>
          </div>
        </div>

        <div className="pt-8 border-t border-[#2F2F2F] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-gray-500">Copyright © 2024 SelectAI. All rights reserved.</p>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[10px] text-green-500">All systems normal</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;