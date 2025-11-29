import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#111111]/80 backdrop-blur-md border-[#2F2F2F]'
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo - Text Only */}
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
          <span className="logo-polish font-['Syne'] font-bold text-2xl tracking-tight">ALIGN</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button onClick={() => onNavigate('products')} className="hover:text-[#F6F6F6] hover:scale-105 transition-all">Product</button>
          <button onClick={() => onNavigate('pricing')} className="hover:text-[#F6F6F6] hover:scale-105 transition-all">Pricing</button>
          <button onClick={() => onNavigate('blog')} className="hover:text-[#F6F6F6] hover:scale-105 transition-all">Blog</button>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onNavigate('dev')}
            className="bg-[#2F2F2F] hover:bg-[#FFCB74] hover:text-[#111111] text-[#F6F6F6] px-5 py-2 rounded-full border border-[#444] hover:border-[#FFCB74] transition-all duration-300"
          >
            Sign In
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-[#FFCB74] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#111111] border-b border-[#2F2F2F] p-6 flex flex-col gap-4 animate-slide-up shadow-2xl">
          <button onClick={() => { onNavigate('products'); setMobileMenuOpen(false); }} className="text-left text-gray-300 hover:text-[#FFCB74]">Product</button>
          <button onClick={() => { onNavigate('pricing'); setMobileMenuOpen(false); }} className="text-left text-gray-300 hover:text-[#FFCB74]">Pricing</button>
          <button onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }} className="text-left text-gray-300 hover:text-[#FFCB74]">Blog</button>
          <hr className="border-[#2F2F2F]" />
          <button onClick={() => { onNavigate('dev'); setMobileMenuOpen(false); }} className="text-center w-full py-2 bg-[#2F2F2F] rounded-lg text-[#F6F6F6]">Sign In</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;