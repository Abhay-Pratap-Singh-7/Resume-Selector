import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import UnderDevelopment from './components/UnderDevelopment';
import BulkUpload from './components/BulkUpload';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'dev' | 'upload'>('home');

  const navigateToDev = () => {
    setCurrentPage('dev');
    window.scrollTo(0, 0);
  };

  const navigateToUpload = () => {
    setCurrentPage('upload');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  if (currentPage === 'dev') {
    return <UnderDevelopment onBack={navigateToHome} />;
  }

  if (currentPage === 'upload') {
    return <BulkUpload onBack={navigateToHome} />;
  }

  return (
    <div className="relative min-h-screen bg-[#111111] text-[#F6F6F6] overflow-x-hidden selection:bg-[#FFCB74] selection:text-[#111111]">
      
      {/* BACKGROUND LAYER */}
      {/* Absolute positioning ensures it covers the full scrollable height, not just the viewport */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* 1. Base Grid - Low Opacity, covers everything */}
        <div 
            className="absolute inset-0 opacity-[0.01]" 
            style={{ 
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
                backgroundSize: '25px 25px' 
            }}
        ></div>

        {/* 2. Highlight Grid Patches - Simulating random opacity with masks */}
        
        {/* Top Left - Golden Grid Patch */}
        <div 
             className="absolute top-0 left-0 w-full h-[40%] opacity-[0.1]"
             style={{
                backgroundImage: 'linear-gradient(#FFCB74 1px, transparent 1px), linear-gradient(90deg, #FFCB74 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                maskImage: 'radial-gradient(circle at 20% 20%, black, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at 20% 20%, black, transparent 70%)'
             }}
        ></div>
        
        {/* Middle Right - White Grid Patch */}
        <div 
             className="absolute top-[35%] right-0 w-full h-[30%] opacity-[0.05]"
             style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                maskImage: 'radial-gradient(circle at 80% 50%, black, transparent 60%)',
                WebkitMaskImage: 'radial-gradient(circle at 80% 50%, black, transparent 60%)'
             }}
        ></div>

        {/* Bottom Left - Golden Grid Patch */}
        <div 
             className="absolute bottom-0 left-0 w-full h-[30%] opacity-[0.2]"
             style={{
                backgroundImage: 'linear-gradient(#FFCB74 1px, transparent 1px), linear-gradient(90deg, #FFCB74 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                maskImage: 'radial-gradient(circle at 30% 60%, black, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at 30% 60%, black, transparent 70%)'
             }}
        ></div>


        {/* 3. GLOW ORBS - Distributed vertically across the page */}
        
        {/* Hero Section Glows */}
        <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] bg-[#FFCB74] opacity-[0.09] rounded-full blur-[1000px] animate-pulse-glow"></div>
        <div className="absolute top-[5%] right-[-10%] w-[40vw] h-[40vw] bg-[#FFCB74] opacity-[0.08] rounded-full blur-[100px]" style={{animationDelay: '2s'}}></div>

        {/* Features Section Glow */}
        <div className="absolute top-[25%] left-[20%] w-[35vw] h-[35vw] bg-[#FFCB74] opacity-[0.06] rounded-full blur-[150px]"></div>

        {/* How It Works Glow */}
        <div className="absolute top-[45%] right-[-5%] w-[45vw] h-[45vw] bg-[#FFCB74] opacity-[0.08] rounded-full blur-[130px]"></div>
        
        {/* Testimonials Glow */}
        <div className="absolute top-[65%] left-[-5%] w-[40vw] h-[40vw] bg-[#FFCB74] opacity-[0.07] rounded-full blur-[120px]"></div>

        {/* Footer/CTA Glow */}
        <div className="absolute bottom-[-5%] right-[10%] w-[50vw] h-[50vw] bg-[#FFCB74] opacity-[0.1] rounded-full blur-[140px]"></div>

      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar onNavigate={navigateToDev} />
        <main>
          <Hero onNavigate={navigateToUpload} />
          <Features />
          <HowItWorks />
          <Testimonials />
          <Pricing onNavigate={navigateToDev} />
          <CTA onNavigate={navigateToUpload} />
        </main>
        <Footer onNavigate={navigateToDev} />
      </div>
    </div>
  );
};

export default App;