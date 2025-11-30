
import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient'; // Import Supabase
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
import Products from './components/Products';
import Blogs from './components/Blogs';
import ContactUs from './components/ContactUs';
import Security from './components/Security';
import FAQs from './components/FAQs';
import UserGuide from './components/UserGuide';
import HelpCenter from './components/HelpCenter';
import AuthModal from './components/AuthModal'; // Import AuthModal
import ProfileDashboard from './components/ProfileDashboard'; // Import ProfileDashboard

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'dev' | 'upload' | 'products' | 'pricing' | 'blog' | 'contact' | 'security' | 'faq' | 'guide' | 'help' | 'profile'>('home');
  const [isLoading, setIsLoading] = useState(true);
  
  // Auth State
  const [session, setSession] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Session State for History
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  // Supabase Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavigation = (page: string) => {
    // Protected Routes
    if ((page === 'upload' || page === 'profile') && !session) {
        setIsAuthModalOpen(true);
        return;
    }

    // Reset selected session if navigating to upload manually (New Scan)
    if (page === 'upload') {
        setSelectedSessionId(null);
    }

    switch (page) {
      case 'home':
        setCurrentPage('home');
        window.scrollTo(0, 0);
        break;
      case 'products':
        setCurrentPage('products');
        window.scrollTo(0, 0);
        break;
      case 'pricing':
        setCurrentPage('pricing');
        window.scrollTo(0, 0);
        break;
      case 'blog':
        setCurrentPage('blog');
        window.scrollTo(0, 0);
        break;
      case 'upload':
        setCurrentPage('upload');
        window.scrollTo(0, 0);
        break;
      case 'dev':
        setCurrentPage('dev');
        window.scrollTo(0, 0);
        break;
      case 'profile':
        setCurrentPage('profile');
        window.scrollTo(0, 0);
        break;
      // New Pages
      case 'contact':
        setCurrentPage('contact');
        window.scrollTo(0, 0);
        break;
      case 'security':
        setCurrentPage('security');
        window.scrollTo(0, 0);
        break;
      case 'faq':
        setCurrentPage('faq');
        window.scrollTo(0, 0);
        break;
      case 'guide':
        setCurrentPage('guide');
        window.scrollTo(0, 0);
        break;
      case 'help':
        setCurrentPage('help');
        window.scrollTo(0, 0);
        break;
      default:
        setCurrentPage('home');
        window.scrollTo(0, 0);
    }
  };

  const handleOpenSession = (sessionId: string) => {
      setSelectedSessionId(sessionId);
      setCurrentPage('upload');
      window.scrollTo(0, 0);
  };

  const handleSignOut = async () => {
      await supabase.auth.signOut();
      setSession(null);
      handleNavigation('home');
  };

  // Standalone pages (No Navbar/Footer)
  if (currentPage === 'dev') {
    return <UnderDevelopment onBack={() => handleNavigation('home')} />;
  }

  if (currentPage === 'upload') {
    return <BulkUpload onBack={() => handleNavigation('profile')} session={session} initialSessionId={selectedSessionId} />;
  }

  // Layout with Navbar & Footer
  return (
    <div className="relative min-h-screen bg-[#111111] text-[#F6F6F6] overflow-x-hidden selection:bg-[#FFCB74] selection:text-[#111111]">
      
      {/* AUTH MODAL */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={() => {
            // Close modal immediately
            setIsAuthModalOpen(false);
            // Directly navigate to profile to avoid race conditions with session state
            setCurrentPage('profile');
            window.scrollTo(0, 0);
        }}
      />

      {/* SPLASH SCREEN OVERLAY */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#111111] flex items-center justify-center transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
         <span className="font-['Syne'] font-bold text-lg tracking-[0.2em] text-[#F6F6F6] animate-fade-in-out">
            ALIGN
         </span>
      </div>

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* 1. Base Grid */}
        <div 
            className="absolute inset-0 opacity-[0.01]" 
            style={{ 
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
                backgroundSize: '25px 25px' 
            }}
        ></div>

        {/* 2. Highlight Grid Patches */}
        <div 
             className="absolute top-0 left-0 w-full h-[40%] opacity-[0.1]"
             style={{
                backgroundImage: 'linear-gradient(#FFCB74 1px, transparent 1px), linear-gradient(90deg, #FFCB74 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                maskImage: 'radial-gradient(circle at 20% 20%, black, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at 20% 20%, black, transparent 70%)'
             }}
        ></div>
        
        {/* 3. GLOW ORBS */}
        <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] bg-[#FFCB74] opacity-[0.09] rounded-full blur-[1000px] animate-pulse-glow"></div>
        <div className="absolute top-[5%] right-[-10%] w-[40vw] h-[40vw] bg-[#FFCB74] opacity-[0.08] rounded-full blur-[100px]" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-[-5%] right-[10%] w-[50vw] h-[50vw] bg-[#FFCB74] opacity-[0.1] rounded-full blur-[140px]"></div>

      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar 
            onNavigate={handleNavigation} 
            session={session}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onSignOut={handleSignOut}
        />
        
        <main className="flex-1">
          {currentPage === 'home' && (
            <>
              <Hero onNavigate={() => handleNavigation('upload')} />
              <Features />
              <HowItWorks />
              <Testimonials />
              <CTA onNavigate={() => handleNavigation('upload')} />
            </>
          )}

          {currentPage === 'products' && (
            <Products onLaunch={() => handleNavigation('upload')} />
          )}

          {currentPage === 'pricing' && (
            <Pricing onNavigate={() => handleNavigation('upload')} />
          )}

          {currentPage === 'blog' && (
            <Blogs onRead={() => handleNavigation('dev')} />
          )}

          {currentPage === 'profile' && (
            <ProfileDashboard 
                session={session} 
                onNavigate={handleNavigation} 
                onSignOut={handleSignOut}
                onOpenSession={handleOpenSession}
            />
          )}

          {/* New Pages */}
          {currentPage === 'contact' && <ContactUs onNavigate={() => handleNavigation('home')} />}
          {currentPage === 'security' && <Security onNavigate={handleNavigation} />}
          {currentPage === 'faq' && <FAQs onNavigate={() => handleNavigation('contact')} />}
          {currentPage === 'guide' && <UserGuide onNavigate={() => handleNavigation('upload')} />}
          {currentPage === 'help' && <HelpCenter onNavigate={handleNavigation} />}
        </main>

        <Footer onNavigate={handleNavigation} />
      </div>
    </div>
  );
};

export default App;
