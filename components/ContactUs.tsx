
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ContactUsProps {
  onNavigate: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Mock submission logic
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-[80vh] max-w-7xl mx-auto">
       <ScrollReveal direction="down" className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Get in <span className="gold-gradient-text">Touch</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
                Have questions about enterprise plans, integrations, or just want to say hello? We'd love to hear from you.
            </p>
       </ScrollReveal>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           {/* Contact Info */}
           <ScrollReveal direction="right" className="space-y-8">
               <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-8 hover:border-[#FFCB74]/30 transition-colors">
                   <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                   
                   <div className="space-y-6">
                       <div className="flex items-start gap-4">
                           <div className="w-10 h-10 rounded-full bg-[#2F2F2F] flex items-center justify-center flex-shrink-0">
                               <Mail size={18} className="text-[#FFCB74]" />
                           </div>
                           <div>
                               <p className="text-xs text-gray-500 uppercase font-bold mb-1">Email</p>
                               <a href="mailto:support@align.ai" className="text-white hover:text-[#FFCB74] transition-colors">support@align.ai</a>
                           </div>
                       </div>

                       <div className="flex items-start gap-4">
                           <div className="w-10 h-10 rounded-full bg-[#2F2F2F] flex items-center justify-center flex-shrink-0">
                               <MapPin size={18} className="text-[#FFCB74]" />
                           </div>
                           <div>
                               <p className="text-xs text-gray-500 uppercase font-bold mb-1">Headquarters</p>
                               <p className="text-white">123 Innovation Dr, Suite 400<br/>San Francisco, CA 94103</p>
                           </div>
                       </div>
                   </div>
               </div>

               <div className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-8">
                   <h3 className="text-xl font-bold text-white mb-4">Support Hours</h3>
                   <p className="text-gray-400 text-sm mb-4">Our dedicated team is available to assist you during the following hours:</p>
                   <div className="flex justify-between text-sm border-b border-[#2F2F2F] py-2">
                       <span className="text-white">Monday - Friday</span>
                       <span className="text-gray-400">9:00 AM - 6:00 PM PST</span>
                   </div>
                   <div className="flex justify-between text-sm py-2">
                       <span className="text-white">Weekend</span>
                       <span className="text-gray-400">Closed</span>
                   </div>
               </div>
           </ScrollReveal>

           {/* Form */}
           <ScrollReveal direction="left" className="bg-[#1a1a1a] border border-[#2F2F2F] rounded-3xl p-8 lg:p-10">
               <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-2">First Name</label>
                           <input type="text" className="w-full bg-[#111] border border-[#2F2F2F] rounded-lg p-3 text-white focus:border-[#FFCB74] outline-none transition-colors" placeholder="Jane" required />
                       </div>
                       <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Last Name</label>
                           <input type="text" className="w-full bg-[#111] border border-[#2F2F2F] rounded-lg p-3 text-white focus:border-[#FFCB74] outline-none transition-colors" placeholder="Doe" required />
                       </div>
                   </div>

                   <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Work Email</label>
                       <input type="email" className="w-full bg-[#111] border border-[#2F2F2F] rounded-lg p-3 text-white focus:border-[#FFCB74] outline-none transition-colors" placeholder="jane@company.com" required />
                   </div>

                   <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Subject</label>
                       <select className="w-full bg-[#111] border border-[#2F2F2F] rounded-lg p-3 text-white focus:border-[#FFCB74] outline-none transition-colors">
                           <option>General Inquiry</option>
                           <option>Sales / Enterprise</option>
                           <option>Technical Support</option>
                           <option>Partnership</option>
                       </select>
                   </div>

                   <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Message</label>
                       <textarea rows={4} className="w-full bg-[#111] border border-[#2F2F2F] rounded-lg p-3 text-white focus:border-[#FFCB74] outline-none transition-colors" placeholder="How can we help you?" required></textarea>
                   </div>

                   <button 
                    type="submit"
                    className="w-full bg-[#FFCB74] text-[#111111] font-bold py-4 rounded-xl hover:bg-[#eebb55] transition-all flex items-center justify-center gap-2"
                   >
                       {submitted ? 'Message Sent!' : <><Send size={18} /> Send Message</>}
                   </button>
               </form>
           </ScrollReveal>
       </div>
    </div>
  );
};

export default ContactUs;
    