import React, { useState, useEffect } from 'react';
import {
  Mail, Phone,
  Instagram, Youtube, Linkedin,
  Heart, ChevronUp
} from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const quickLinks = [
    { name: 'Home', section: 'home' },
    { name: 'Portfolio', section: 'portfolio' },
    { name: 'About', section: 'about' },
    { name: 'Contact', section: 'contact' },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-400 hover:border-pink-400' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-400 hover:border-blue-400' },
    { name: 'YouTube', icon: Youtube, url: '#', color: 'hover:text-red-400 hover:border-red-400' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#050510] to-[#000008]" />

      {/* Animated orbs */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
          transition: 'transform 1s ease-out',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
          transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 20}px)`,
          transition: 'transform 1s ease-out',
        }}
      />

      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16">

            {/* Brand Section */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md">
              {/* Logo */}
              <button onClick={() => scrollToSection('home')} className="group inline-flex items-center gap-4 mb-5">
                <img
                  src="https://res.cloudinary.com/dmhabztbf/image/upload/v1768294579/ac82306d-f412-4b17-925f-a921dee6de02-md_brnohf.jpg"
                  alt="ByteCitadel Logo"
                  className="w-12 h-12 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Vertical divider line */}
                <div className="w-[2px] h-8 bg-white/80"></div>
                <span
                  className="text-xl font-bold text-white tracking-wider"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  bytecitadel
                </span>
              </button>

              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Elite 2D animation studio crafting legendary gaming experiences. We bring your vision to life with pixel-perfect precision.
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400">
                <a href="mailto:hello@bytecitadel.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>hello@bytecitadel.com</span>
                </a>
                <span className="hidden lg:inline text-gray-600">•</span>
                <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+1 (234) 567-890</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
              <nav className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.section)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Connect</h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`w-10 h-10 rounded-lg bg-slate-800/50 border border-white/10 flex items-center justify-center text-gray-500 ${social.color} hover:scale-110 transition-all duration-300`}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 text-center">
            <div className="text-gray-500 text-sm">
              © 2026 ByteCitadel Gaming. All rights reserved.
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Crafted with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>for gamers worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 p-[2px] shadow-lg shadow-cyan-500/30 transition-all duration-500 hover:scale-110 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
      >
        <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
          <ChevronUp className="w-6 h-6 text-cyan-400" />
        </div>
      </button>

      {/* Animated bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x" />
      </div>
    </footer>
  );
};

export default Footer;
