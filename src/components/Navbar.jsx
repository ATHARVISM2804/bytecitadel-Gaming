import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Gamepad2, Sparkles,
  Mail, Phone
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'portfolio', 'about', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse position for glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', section: 'home' },
    { name: 'Portfolio', section: 'portfolio' },
    { name: 'About', section: 'about' },
    { name: 'Contact', section: 'contact' },
  ];

  const isActive = (section) => activeSection === section;

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 bg-slate-900/90 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg shadow-cyan-500/5' 
            : 'py-5 bg-transparent'
        }`}
      >
        {/* Animated glow following cursor */}
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
            opacity: isScrolled ? 1 : 0,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => scrollToSection('home')} className="group relative flex items-center gap-3">
              {/* Animated logo icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-[2px] group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
              
              {/* Logo text */}
              <div className="flex flex-col">
                <span 
                  className="text-lg sm:text-xl font-bold text-white tracking-wider"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  BYTE<span className="text-cyan-400">CITADEL</span>
                </span>
                <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">Gaming Studio</span>
              </div>

              {/* Sparkle effect on hover */}
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.section)}
                  className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                    isActive(link.section)
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {/* Active indicator */}
                  {isActive(link.section) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                  )}
                  
                  {/* Hover background */}
                  <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative">{link.name}</span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative px-6 py-2.5 rounded-lg font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-105"
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x" />
                <div className="absolute inset-[2px] bg-slate-900 rounded-md" />
                <span className="relative text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text">
                  Start Quest
                </span>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-lg bg-slate-800/50 border border-cyan-500/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Animated bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-slide-right" />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`relative h-full flex flex-col pt-24 px-6 pb-8 transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Decorative elements */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[100px]" />
          
          {/* Navigation Links */}
          <div className="relative space-y-2">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.section)}
                className={`group w-full flex items-center justify-between px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                  isActive(link.section)
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(50px)',
                  opacity: isMobileMenuOpen ? 1 : 0,
                }}
              >
                <span>{link.name}</span>
                {isActive(link.section) && (
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="relative mt-auto space-y-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full py-4 rounded-xl font-bold text-center text-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 hover:scale-105 transition-transform duration-300"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              START YOUR QUEST
            </button>
            
            {/* Contact info */}
            <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
              <a href="mailto:hello@bytecitadel.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
