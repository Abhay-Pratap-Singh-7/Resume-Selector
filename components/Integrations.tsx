import React from 'react';
import { Slack, Trello, Figma, Mail, Database, Github, MessageCircle } from 'lucide-react';

const IntegrationBadge: React.FC<{ icon: React.ReactNode; name: string; color?: string }> = ({ icon, name, color }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#2F2F2F] rounded-full hover:border-[#FFCB74] hover:bg-[#2F2F2F] hover:shadow-[0_0_15px_-5px_rgba(255,203,116,0.5)] transition-all cursor-pointer group transform hover:-translate-y-1">
    <span className={`transition-colors ${color || 'text-gray-400 group-hover:text-white'}`}>{icon}</span>
    <span className="text-sm text-gray-300 group-hover:text-white">{name}</span>
  </div>
);

const Integrations: React.FC = () => {
  return (
    <section className="py-24 px-6 text-center">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Seamless integrations <br />
          with your ATS and tools
        </h2>
        <p className="text-gray-400">ALIGN connects with your existing recruitment pipeline to enhance your workflow.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        <IntegrationBadge icon={<MessageCircle size={16} className="text-blue-500" />} name="Teams" />
        <IntegrationBadge icon={<div className="w-4 h-4 bg-blue-400 rounded-sm" />} name="Zoom" />
        <IntegrationBadge icon={<div className="w-4 h-4 bg-blue-600 rounded-full" />} name="OneDrive" />
        <IntegrationBadge icon={<div className="w-4 h-4 bg-black border border-white rounded-sm" />} name="Notion" />
        <IntegrationBadge icon={<div className="w-4 h-4 bg-blue-300 rounded-full" />} name="Telegram" />
        <IntegrationBadge icon={<Slack size={16} className="text-purple-400" />} name="Slack" />
        
        <div className="w-full h-0"></div> {/* Break row conceptually */}
        
        <IntegrationBadge icon={<MessageCircle size={16} className="text-blue-500" />} name="Teams" />
        <IntegrationBadge icon={<Mail size={16} className="text-red-500" />} name="Gmail" />
        <IntegrationBadge icon={<div className="w-4 h-4 bg-green-500 rounded-sm" />} name="Google Drive" />
        <IntegrationBadge icon={<Slack size={16} className="text-purple-400" />} name="Slack" />
        <IntegrationBadge icon={<Trello size={16} className="text-blue-600" />} name="Trello" />
        <IntegrationBadge icon={<div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-sm" />} name="Adobe Creative Cloud" />
        <IntegrationBadge icon={<Mail size={16} className="text-red-500" />} name="Gmail" />

        <div className="w-full h-0"></div> {/* Break row conceptually */}

        <IntegrationBadge icon={<Mail size={16} className="text-red-500" />} name="Gmail" />
        <IntegrationBadge icon={<Figma size={16} className="text-purple-500" />} name="Sketch" />
        <IntegrationBadge icon={<div className="w-4 h-4 bg-green-600 rounded-sm" />} name="Microsoft Excel" />
        <IntegrationBadge icon={<div className="w-4 h-4 bg-blue-700 rounded-sm" />} name="Microsoft Word" />
        <IntegrationBadge icon={<MessageCircle size={16} className="text-blue-500" />} name="Teams" />
      </div>
    </section>
  );
};

export default Integrations;