import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X,
  Mail, Phone, Gamepad2, Zap
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [hoverIndex, setHoverIndex] = useState(null);
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
    { name: 'Home', section: 'home', icon: '🏠' },
    { name: 'Portfolio', section: 'portfolio', icon: '🎮' },
    { name: 'About', section: 'about', icon: '⚔️' },
    { name: 'Contact', section: 'contact', icon: '📬' },
  ];

  const isActive = (section) => activeSection === section;

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'py-2'
          : 'py-4'
          }`}
      >
        {/* Background with glassmorphism */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${isScrolled
            ? 'bg-[#0a0a1a]/95 backdrop-blur-xl'
            : 'bg-transparent'
            }`}
        />

        {/* Animated top glow line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm" />
        </div>

        {/* Floating glow following cursor */}
        <div
          className="absolute pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 60%)',
            opacity: isScrolled ? 1 : 0,
          }}
        />

        {/* Corner Decorations */}
        <div className={`absolute top-2 left-4 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-3 h-3 border-l-2 border-t-2 border-cyan-500/50" />
        </div>
        <div className={`absolute top-2 right-4 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-3 h-3 border-r-2 border-t-2 border-pink-500/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <button onClick={() => scrollToSection('home')} className="group relative flex items-center gap-3">
              {/* Glow behind logo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Logo container with border */}
              <div className="relative">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src="https://res.cloudinary.com/dmhabztbf/image/upload/v1768294579/ac82306d-f412-4b17-925f-a921dee6de02-md_brnohf.jpg"
                  alt="ByteCitadel Logo"
                  className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Animated divider with glow */}
              <div className="relative h-7 w-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400" />
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 blur-sm" />
              </div>

              {/* Logo text with hover effect */}
              <div className="relative">
                <span
                  className="text-base sm:text-lg font-bold tracking-wider bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-500"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  bytecitadel
                </span>
                {/* Underline animation */}
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-pink-400 group-hover:w-full transition-all duration-500" />
              </div>
            </button>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              {/* Nav container with background */}
              <div className={`flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500 ${isScrolled ? 'bg-slate-800/50 border border-white/5' : ''}`}>
                {navLinks.map((link, index) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.section)}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    className={`group relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive(link.section)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    {/* Active/Hover background pill */}
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${isActive(link.section)
                          ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-500/30'
                          : hoverIndex === index
                            ? 'bg-white/5 border border-white/10'
                            : 'border border-transparent'
                        }`}
                    />

                    {/* Active glow effect */}
                    {isActive(link.section) && (
                      <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-md" />
                    )}

                    {/* Text with icon */}
                    <span className="relative flex items-center gap-2">
                      <span className={`text-xs transition-transform duration-300 ${hoverIndex === index || isActive(link.section) ? 'scale-110' : 'scale-100'}`}>
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </span>

                    {/* Active indicator dot */}
                    {isActive(link.section) && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative px-6 py-2.5 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-sm opacity-50" />
                <div className="absolute inset-[2px] bg-[#0a0a1a] rounded-[10px] transition-colors duration-300 group-hover:bg-[#0d0d20]" />

                {/* Button content */}
                <span className="relative flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text font-bold">
                    Start Quest
                  </span>
                  <Zap className="w-3.5 h-3.5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                </span>

                {/* Shine sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden group relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
            >
              {/* Button border gradient */}
              <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${isMobileMenuOpen ? 'bg-gradient-to-r from-cyan-500 to-pink-500' : 'bg-gradient-to-r from-cyan-500/50 to-pink-500/50'}`} />
              <div className="absolute inset-[2px] rounded-[10px] bg-slate-900 transition-colors duration-300 group-hover:bg-slate-800" />

              <div className="relative w-5 h-5 text-gray-300 group-hover:text-white transition-colors">
                <Menu className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced animated bottom border */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-30'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/60 to-cyan-500/0" />
          <div className="w-full h-full bg-gradient-to-r from-transparent via-pink-500/40 to-transparent animate-slide-right" />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className={`relative h-full flex flex-col pt-24 px-6 pb-8 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
                className={`group w-full flex items-center justify-between px-4 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${isActive(link.section)
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
