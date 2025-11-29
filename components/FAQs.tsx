
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface FAQsProps {
  onNavigate: () => void;
}

const FAQs: React.FC<FAQsProps> = ({ onNavigate }) => {
  const faqs = [
    {
      question: "How does the AI scoring model work?",
      answer: "Our scoring model uses Gemini 1.5 Pro to analyze the semantic meaning of resumes against your specific job description. It doesn't just look for keywords; it evaluates the depth of experience, project complexity, and soft skills to generate a fit score from 0-100."
    },
    {
      question: "Is my data stored securely?",
      answer: "No data is stored permanently. We operate on a strict zero-retention policy. Files are processed transiently in encrypted memory and are immediately discarded after analysis. Your proprietary hiring data never trains our public models."
    },
    {
      question: "Can I upload multiple files at once?",
      answer: "Yes! Our Bulk Scanner is designed for high-volume recruitment. You can drag and drop dozens of PDF resumes at once. The system processes them sequentially to ensure stability and accuracy."
    },
    {
      question: "What file formats do you support?",
      answer: "Currently, we strictly support PDF format to ensure consistent text extraction and layout preservation. Support for DOCX and other formats is on our roadmap."
    },
    {
      question: "How accurate is the 'Strengths & Weaknesses' report?",
      answer: "The AI provides a highly accurate summary based on the explicit content of the resume. However, it is designed to be a decision-support tool, not a decision-maker. We recommend using it to shortlist candidates for human review."
    },
    {
      question: "Do you offer API access for custom integrations?",
      answer: "Yes, our Enterprise plan includes API access, allowing you to integrate ALIGN's scoring engine directly into your own ATS or internal HR tools."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-24 px-6 min-h-[80vh] max-w-4xl mx-auto">
      <ScrollReveal direction="down" className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Frequently Asked <span className="gold-gradient-text">Questions</span>
        </h1>
        <p className="text-gray-400 text-lg">
            Everything you need to know about ALIGN's technology and billing.
        </p>
      </ScrollReveal>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.05}>
                <div 
                    className={`bg-[#1a1a1a] border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-[#FFCB74]/50 shadow-[0_0_20px_-5px_rgba(255,203,116,0.1)]' : 'border-[#2F2F2F] hover:border-[#FFCB74]/30'}`}
                >
                    <button 
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                        <span className={`font-bold text-lg transition-colors ${openIndex === index ? 'text-[#FFCB74]' : 'text-white'}`}>
                            {faq.question}
                        </span>
                        {openIndex === index ? <ChevronUp className="text-[#FFCB74]" /> : <ChevronDown className="text-gray-500" />}
                    </button>
                    
                    <div 
                        className={`px-6 text-gray-400 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                    >
                        {faq.answer}
                    </div>
                </div>
            </ScrollReveal>
        ))}
      </div>

      <ScrollReveal direction="up" delay={0.4} className="mt-16 text-center">
        <div className="bg-[#111] border border-[#2F2F2F] rounded-2xl p-8 inline-block">
            <HelpCircle size={32} className="text-[#FFCB74] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-gray-400 mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
            <button className="bg-[#F6F6F6] text-[#111111] px-6 py-3 rounded-full font-bold hover:bg-[#FFCB74] transition-colors">
                Get in Touch
            </button>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default FAQs;
    