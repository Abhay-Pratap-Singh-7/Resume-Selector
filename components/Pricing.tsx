import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface PricingProps {
  onNavigate: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const prices = {
    pro: billingCycle === 'monthly' ? '$25' : '$240',
    unit: billingCycle === 'monthly' ? 'per month' : 'per year',
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Choose the plan that <br />
          fits your hiring needs
        </h2>
        <p className="text-gray-400 mb-8">Flexible pricing for startups, agencies, and enterprises.</p>

        {/* Toggle */}
        <div className="inline-flex bg-[#1a1a1a] p-1 rounded-full border border-[#2F2F2F]">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'monthly' ? 'bg-[#2F2F2F] text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingCycle === 'yearly' ? 'bg-[#2F2F2F] text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Yearly <span className="ml-1 text-[10px] text-[#FFCB74]">(Save 20%)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Starter */}
        <div className="bg-[#151515] border border-[#2F2F2F] rounded-2xl p-8 hover:border-[#FFCB74]/30 transition-colors duration-300 group flex flex-col h-full">
            <h3 className="text-lg font-bold mb-1 group-hover:text-[#FFCB74] transition-colors">Starter</h3>
            <p className="text-xs text-gray-500 mb-6">Small businesses and startups.</p>
            <div className="text-4xl font-bold mb-1">$0</div>
            <div className="text-xs text-gray-500 mb-8">{prices.unit}</div>
            
            <ul className="space-y-3 mb-8 flex-1">
                {['Screen up to 50 resumes/mo', 'Basic AI parsing', 'Standard Support', '1 Team Member'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <Check size={14} className="mt-0.5 text-gray-500 group-hover:text-[#FFCB74] transition-colors" /> {feature}
                    </li>
                ))}
            </ul>
            <button onClick={onNavigate} className="w-full py-3 rounded-lg border border-[#2F2F2F] bg-[#1a1a1a] hover:bg-[#252525] hover:border-gray-600 text-white text-sm font-medium transition-all">
                Choose Plan
            </button>
        </div>

        {/* Pro - Highlighted */}
        <div className="bg-gradient-to-b from-[#1f1f1f] to-[#151515] md:from-[#2a2a2a] md:to-[#111111] border border-[#FFCB74]/40 rounded-2xl p-8 relative shadow-[0_0_30px_-10px_rgba(255,203,116,0.15)] overflow-hidden transition-all hover:scale-[1.02] flex flex-col h-full z-10">
            {/* Background Gradient Mesh approximation */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FFCB74]/10 to-transparent pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-1">
                 <h3 className="text-lg font-bold text-[#FFCB74]">Pro</h3>
                 <span className="bg-[#FFCB74]/20 text-[#FFCB74] text-[10px] font-bold px-2 py-0.5 rounded border border-[#FFCB74]/30">Popular</span>
            </div>
            
            <p className="text-xs text-gray-400 mb-6">Growing companies hiring regularly.</p>
            <div className="text-4xl font-bold mb-1">{prices.pro}</div>
            <div className="text-xs text-gray-500 mb-8">{prices.unit}</div>
            
            <ul className="space-y-3 mb-8 relative z-10 flex-1">
                {['Screen up to 500 resumes/mo', 'Advanced AI Ranking', 'ATS Integrations', 'Priority Support'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-200">
                        <Check size={14} className="mt-0.5 text-[#FFCB74]" /> {feature}
                    </li>
                ))}
            </ul>
            <button onClick={onNavigate} className="relative z-10 w-full py-3 rounded-lg bg-[#F6F6F6] hover:bg-[#FFCB74] text-black text-sm font-bold transition-all shadow-lg hover:shadow-[0_0_15px_rgba(255,203,116,0.5)]">
                Choose plan
            </button>
        </div>

        {/* Enterprise */}
        <div className="bg-[#151515] border border-[#2F2F2F] rounded-2xl p-8 hover:border-[#FFCB74]/30 transition-colors duration-300 group flex flex-col h-full">
            <h3 className="text-lg font-bold mb-1 group-hover:text-[#FFCB74] transition-colors">Enterprise</h3>
            <p className="text-xs text-gray-500 mb-6">Recruitment agencies and enterprises.</p>
            <div className="text-4xl font-bold mb-1">Custom</div>
            <div className="text-xs text-gray-500 mb-8">{prices.unit}</div>
            
            <ul className="space-y-3 mb-8 flex-1">
                {['Unlimited resume screening', 'Custom AI Scoring Models', 'Dedicated Account Manager', 'Advanced Security & Compliance'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <Check size={14} className="mt-0.5 text-gray-500 group-hover:text-[#FFCB74] transition-colors" /> {feature}
                    </li>
                ))}
            </ul>
            <button onClick={onNavigate} className="w-full py-3 rounded-lg border border-[#2F2F2F] bg-[#1a1a1a] hover:bg-[#252525] hover:border-gray-600 text-white text-sm font-medium transition-all">
                Contact Sales
            </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;