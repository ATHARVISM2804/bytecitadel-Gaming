import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight, Gamepad2, Users, Sparkles, Target, Zap, Layers, Eye, PenTool, Film, Trophy, Star, Swords, Shield, Flame, Crown, Heart, Gem, Cpu, Joystick, Play } from 'lucide-react';
import { useInView, useCounter, useMousePosition } from '../hooks/useAnimations';

// Scroll helper function
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

const GamingPage = () => {
  return (
    <div className="relative gaming-page overflow-x-hidden">
      <HeroSection />
      <StatsShowcase />
      <ExpertiseHexGrid />
      <ProcessTimeline />
      <PortfolioShowcase />
      <TechStackOrbit />
      <CTASection />
    </div>
  );
};

// Animated Gaming Controller SVG Component
const AnimatedController = ({ className }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 200 120" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.5))' }}>
      {/* Controller body */}
      <path
        d="M40,60 Q20,60 15,80 Q10,100 30,100 L70,100 Q80,100 85,90 L100,60 L115,90 Q120,100 130,100 L170,100 Q190,100 185,80 Q180,60 160,60 Q140,60 130,40 Q120,25 100,25 Q80,25 70,40 Q60,60 40,60"
        fill="url(#controllerGradient)"
        stroke="url(#controllerStroke)"
        strokeWidth="2"
        className="animate-pulse"
      />
      {/* D-Pad */}
      <rect x="35" y="55" width="8" height="25" rx="2" fill="#0f172a" className="animate-pulse" />
      <rect x="28" y="62" width="22" height="8" rx="2" fill="#0f172a" />
      {/* Buttons */}
      <circle cx="155" cy="55" r="6" fill="#ec4899" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
      <circle cx="170" cy="65" r="6" fill="#06b6d4" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
      <circle cx="155" cy="75" r="6" fill="#22c55e" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
      <circle cx="140" cy="65" r="6" fill="#eab308" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
      {/* Joysticks */}
      <circle cx="65" cy="85" r="12" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
      <circle cx="135" cy="85" r="12" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
      {/* Center buttons */}
      <rect x="90" y="65" width="20" height="8" rx="4" fill="#1e293b" />
      <defs>
        <linearGradient id="controllerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="controllerStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Pixel Character Animation Component
const PixelCharacter = ({ className, type = 'hero' }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % 4);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const getPixelArt = () => {
    const colors = type === 'hero'
      ? ['#06b6d4', '#22d3ee', '#0891b2']
      : ['#ec4899', '#f472b6', '#db2777'];

    return (
      <div className={`grid grid-cols-8 gap-px ${className}`} style={{ imageRendering: 'pixelated' }}>
        {/* Simple animated pixel character */}
        {[...Array(64)].map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isBody = row >= 2 && row <= 5 && col >= 2 && col <= 5;
          const isHead = row >= 0 && row <= 2 && col >= 2 && col <= 5;
          const isArm = (row === 3 || row === 4) && (col === 1 || col === 6);
          const isLeg = row >= 6 && (col === 2 || col === 3 || col === 4 || col === 5);
          const isEye = row === 1 && (col === 3 || col === 4);

          const shouldAnimate = isArm || isLeg;
          const animOffset = shouldAnimate ? Math.sin((frame + col) * 0.5) * 2 : 0;

          let color = 'transparent';
          if (isEye) color = '#ffffff';
          else if (isHead) color = colors[0];
          else if (isBody) color = colors[1];
          else if (isArm || isLeg) color = colors[2];

          return (
            <div
              key={i}
              className="w-2 h-2 sm:w-3 sm:h-3 transition-transform duration-200"
              style={{
                backgroundColor: color,
                transform: `translateY(${animOffset}px)`,
                boxShadow: color !== 'transparent' ? `0 0 4px ${color}` : 'none'
              }}
            />
          );
        })}
      </div>
    );
  };

  return getPixelArt();
};

// Glitch Text Component
const GlitchText = ({ children, className }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-0 left-0 -translate-x-[2px] translate-y-[2px] text-cyan-400 opacity-70 animate-glitch-1"
        aria-hidden="true"
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 translate-x-[2px] -translate-y-[2px] text-pink-400 opacity-70 animate-glitch-2"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
};

// Hero Section - Immersive Gaming Experience
const HeroSection = () => {
  const [ref, isInView] = useInView();
  const mouse = useMousePosition();

  // Generate floating game elements
  const [gameElements] = useState(() =>
    [...Array(15)].map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
      icon: ['⭐', '💎', '🔮', '⚡', '🎮', '🏆', '❤️', '🛡️'][i % 8],
      size: 16 + Math.random() * 16,
    }))
  );

  // Scanline effect
  const [scanlinePos, setScanlinePos] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePos(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cyberpunk Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0d1a2d] to-[#1a0a20]" />

        {/* Animated Grid Floor Effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              linear-gradient(transparent 0%, transparent 50%, rgba(6,182,212,0.1) 50%, transparent 51%),
              linear-gradient(90deg, transparent 0%, transparent 50%, rgba(6,182,212,0.1) 50%, transparent 51%)
            `,
            backgroundSize: '80px 80px',
            transform: `perspective(500px) rotateX(60deg) translateY(${scanlinePos}px)`,
            transformOrigin: 'center top',
          }}
        />

        {/* Neon Orbs */}
        <div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)',
            transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.6) 0%, transparent 70%)',
            transform: `translate(${-mouse.x * 25}px, ${-mouse.y * 25}px)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] rounded-full blur-[120px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)',
          }}
        />

        {/* Floating Game Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {gameElements.map((elem, i) => (
            <div
              key={i}
              className="absolute animate-float-particle"
              style={{
                left: `${elem.x}%`,
                top: `${elem.y}%`,
                fontSize: `${elem.size}px`,
                animationDelay: `${elem.delay}s`,
                animationDuration: `${elem.duration}s`,
                filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.5))',
              }}
            >
              {elem.icon}
            </div>
          ))}
        </div>

        {/* CRT Scanline Effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          }}
        />

        {/* Hexagon Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Level Badge */}
            <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <span className="text-xs text-cyan-400 tracking-[0.2em] uppercase font-bold">Level 99 Studio</span>
            </div>

            {/* Main Heading with Glitch Effect */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 leading-[1.1] transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="block text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                <GlitchText>EPIC</GlitchText>
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                2D ANIMATION
              </span>
              <span className="block text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>STUDIO</span>
            </h1>

            <p className={`text-base sm:text-lg lg:text-xl text-gray-300/80 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-cyan-400">▶</span> Transform your gaming vision into legendary visual experiences. Our elite animators craft characters that become <span className="text-pink-400 font-semibold">unforgettable</span>.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-5 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold text-black overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #ec4899 100%)',
                }}
              >
                <Play className="w-5 h-5 fill-black" />
                <span className="relative z-10">START QUEST</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold text-cyan-400 border-2 border-cyan-400/50 bg-cyan-400/5 backdrop-blur-sm hover:border-cyan-400 hover:bg-cyan-400/20 hover:text-white transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">VIEW LOOT</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>
          </div>

          {/* Right Side - Animated Game Controller & Characters */}
          <div className={`relative hidden lg:flex lg:items-center lg:justify-center transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            {/* Floating Controller */}
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full blur-[100px] animate-pulse" />
              <AnimatedController className="w-full animate-float" />

              {/* Pixel Characters */}
              <div className="absolute -top-8 -left-4 animate-bounce" style={{ animationDuration: '2s' }}>
                <PixelCharacter className="scale-75" type="hero" />
              </div>
              <div className="absolute -bottom-4 -right-8 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                <PixelCharacter className="scale-75" type="enemy" />
              </div>

              {/* Floating Stats */}
              <div className="absolute top-0 right-0 px-4 py-2 rounded-lg bg-slate-900/80 border border-cyan-500/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-gradient-to-r from-red-500 to-pink-500 animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 px-4 py-2 rounded-lg bg-slate-900/80 border border-pink-500/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-cyan-400/60 tracking-widest uppercase">Scroll Down</span>
        <div className="w-6 h-10 rounded-full border-2 border-cyan-400/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

// Stat Card Component
const StatCard = ({ stat, index, isInView }) => {
  const count = useCounter(isInView ? stat.value : 0, 2000);
  const Icon = stat.icon;

  return (
    <div
      className={`group relative transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="relative p-6 sm:p-8 text-center overflow-hidden rounded-2xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 backdrop-blur-sm transition-all duration-500 group-hover:scale-105">
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
        <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-[1px] group-hover:scale-110 transition-transform duration-500`}>
          <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
        <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
          {count}{stat.suffix}
        </div>
        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{stat.label}</p>
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-300" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-300" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-pink-500/30 group-hover:border-pink-400 transition-colors duration-300" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-pink-500/30 group-hover:border-pink-400 transition-colors duration-300" />
      </div>
    </div>
  );
};

// Stats Showcase - Game-Style Counter Section
const StatsShowcase = () => {
  const [ref, isInView] = useInView();

  const stats = [
    { icon: Trophy, value: 500, suffix: '+', label: 'Quests Completed', color: 'from-yellow-400 to-orange-500' },
    { icon: Swords, value: 150, suffix: '+', label: 'Epic Boss Fights', color: 'from-cyan-400 to-blue-500' },
    { icon: Users, value: 80, suffix: '+', label: 'Guild Members', color: 'from-pink-400 to-purple-500' },
    { icon: Crown, value: 12, suffix: '+', label: 'Years of Glory', color: 'from-green-400 to-emerald-500' },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0d1a2d] to-[#0a0a1a]" />

      {/* Animated Border Lines */}
      <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-slide-right" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-slide-left" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Expertise Hexagonal Grid
const ExpertiseHexGrid = () => {
  const [ref, isInView] = useInView();
  const [activeIndex, setActiveIndex] = useState(null);

  const expertise = [
    {
      icon: Film,
      title: 'Character Animation',
      description: 'Fluid, expressive character movements that tell stories without words.',
      stats: { power: 95, speed: 88, magic: 92 },
      rarity: 'Legendary',
      color: 'cyan',
    },
    {
      icon: Layers,
      title: 'Environment Art',
      description: 'Immersive parallax worlds with atmospheric depth and detail.',
      stats: { power: 90, speed: 85, magic: 95 },
      rarity: 'Epic',
      color: 'purple',
    },
    {
      icon: PenTool,
      title: 'Concept Art',
      description: 'Visual blueprints that define your game\'s unique aesthetic.',
      stats: { power: 88, speed: 92, magic: 90 },
      rarity: 'Legendary',
      color: 'pink',
    },
    {
      icon: Eye,
      title: 'Visual Effects',
      description: 'Particle magic, spell effects, and dynamic visual elements.',
      stats: { power: 92, speed: 90, magic: 98 },
      rarity: 'Mythic',
      color: 'yellow',
    },
    {
      icon: Sparkles,
      title: 'UI Animation',
      description: 'Intuitive interface animations that enhance player experience.',
      stats: { power: 85, speed: 95, magic: 88 },
      rarity: 'Epic',
      color: 'green',
    },
    {
      icon: Gamepad2,
      title: 'Sprite Sheets',
      description: 'Optimized assets ready for seamless engine integration.',
      stats: { power: 90, speed: 98, magic: 85 },
      rarity: 'Rare',
      color: 'blue',
    },
  ];

  const colorClasses = {
    cyan: { bg: 'from-cyan-500 to-blue-600', border: 'border-cyan-500', text: 'text-cyan-400', glow: 'rgba(6,182,212,0.3)' },
    purple: { bg: 'from-purple-500 to-pink-600', border: 'border-purple-500', text: 'text-purple-400', glow: 'rgba(168,85,247,0.3)' },
    pink: { bg: 'from-pink-500 to-rose-600', border: 'border-pink-500', text: 'text-pink-400', glow: 'rgba(236,72,153,0.3)' },
    yellow: { bg: 'from-yellow-500 to-orange-600', border: 'border-yellow-500', text: 'text-yellow-400', glow: 'rgba(234,179,8,0.3)' },
    green: { bg: 'from-green-500 to-emerald-600', border: 'border-green-500', text: 'text-green-400', glow: 'rgba(34,197,94,0.3)' },
    blue: { bg: 'from-blue-500 to-indigo-600', border: 'border-blue-500', text: 'text-blue-400', glow: 'rgba(59,130,246,0.3)' },
  };

  const rarityColors = {
    Mythic: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    Legendary: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    Epic: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    Rare: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  };

  return (
    <section ref={ref} className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0d1a2d] to-[#0a0a1a]" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className={`text-center mb-14 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-6">
            <Gem className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-cyan-400 tracking-[0.2em] uppercase font-bold">Skill Tree</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="text-white">OUR </span>
            <GlitchText className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">ABILITIES</GlitchText>
          </h2>
        </div>

        {/* Skills Grid - Card Collection Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {expertise.map((item, index) => {
            const colors = colorClasses[item.color];
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Card Container - Game Card Style */}
                <div
                  className={`relative p-6 sm:p-8 rounded-2xl bg-slate-900/80 border-2 transition-all duration-500 overflow-hidden backdrop-blur-sm ${isActive ? colors.border : 'border-white/10'}`}
                  style={{
                    boxShadow: isActive ? `0 0 40px ${colors.glow}` : 'none',
                  }}
                >
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />

                  {/* Rarity Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${rarityColors[item.rarity]}`}>
                    {item.rarity}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.bg} p-[2px] mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${isActive ? colors.text : 'text-white'}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.description}</p>

                  {/* Stats Bars */}
                  <div className="space-y-3">
                    {Object.entries(item.stats).map(([stat, value]) => (
                      <div key={stat} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 uppercase w-12">{stat}</span>
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${colors.bg} rounded-full transition-all duration-1000 ease-out`}
                            style={{
                              width: isInView ? `${value}%` : '0%',
                              transitionDelay: `${index * 0.1 + 0.3}s`
                            }}
                          />
                        </div>
                        <span className={`text-xs font-bold ${colors.text}`}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Process Timeline - Quest Journey Style
const ProcessTimeline = () => {
  const [ref, isInView] = useInView();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep(s => (s + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const steps = [
    {
      number: '01',
      title: 'Accept Quest',
      description: 'We dive deep into your vision, understanding characters, storylines, and artistic direction.',
      icon: Flame,
      position: 'Discovery Phase',
    },
    {
      number: '02',
      title: 'Craft Weapons',
      description: 'Our artists create initial concepts, style guides, and character sheets for your approval.',
      icon: PenTool,
      position: 'Design Phase',
    },
    {
      number: '03',
      title: 'Battle Arena',
      description: 'We bring your characters and worlds to life with fluid, captivating 2D animations.',
      icon: Swords,
      position: 'Production Phase',
    },
    {
      number: '04',
      title: 'Victory Lap',
      description: 'Seamless delivery of optimized assets ready for your game engine of choice.',
      icon: Crown,
      position: 'Delivery Phase',
    },
  ];

  return (
    <section ref={ref} className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a2d] via-[#0a0a1a] to-[#0d1a2d]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-14 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-pink-500/30 bg-pink-500/5 backdrop-blur-sm mb-6">
            <Target className="w-5 h-5 text-pink-400" />
            <span className="text-xs text-pink-400 tracking-[0.2em] uppercase font-bold">Quest Log</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="text-white">THE </span>
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">JOURNEY</span>
          </h2>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-1">
            <div className="relative w-full h-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${((activeStep + 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;

              return (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 0.15}s` }}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Node */}
                  <div className="relative z-10 flex flex-col items-center cursor-pointer">
                    {/* Circular Node */}
                    <div className={`relative w-20 h-20 rounded-full transition-all duration-500 ${isCurrent ? 'scale-110' : ''}`}>
                      {/* Outer ring */}
                      <div className={`absolute inset-0 rounded-full border-4 transition-colors duration-500 ${isActive ? 'border-cyan-400' : 'border-slate-700'}`} />

                      {/* Inner content */}
                      <div className={`absolute inset-2 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-gradient-to-br from-cyan-500 to-pink-500' : 'bg-slate-800'}`}>
                        <step.icon className={`w-8 h-8 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                      </div>

                      {/* Pulse effect for current step */}
                      {isCurrent && (
                        <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-ping opacity-30" />
                      )}
                    </div>

                    {/* Step Info */}
                    <div className={`mt-6 text-center transition-all duration-500 ${isCurrent ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}`}>
                      <span className={`text-xs font-bold tracking-wider mb-1 block transition-colors duration-500 ${isActive ? 'text-cyan-400' : 'text-gray-600'}`}>
                        {step.position}
                      </span>
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm leading-relaxed max-w-xs mx-auto transition-colors duration-500 ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Showcase - Carousel Style
const PortfolioShowcase = () => {
  const [ref, isInView] = useInView();
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: 'FANTASY QUEST',
      subtitle: 'Epic RPG Adventure',
      description: 'A legendary journey through enchanted realms with fully animated hero characters and boss battles.',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=500&fit=crop',
      stats: { frames: '2.4K', characters: 12, scenes: 48 },
      tags: ['RPG', 'Fantasy', 'Action'],
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'NEON WARRIORS',
      subtitle: 'Cyberpunk Brawler',
      description: 'High-octane combat animations for a futuristic fighting game set in a neon-lit metropolis.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop',
      stats: { frames: '3.2K', characters: 18, scenes: 36 },
      tags: ['Fighting', 'Cyberpunk', 'Multiplayer'],
      color: 'from-pink-500 to-purple-600',
    },
    {
      title: 'OCEAN TALES',
      subtitle: 'Underwater Adventure',
      description: 'Peaceful exploration game featuring fluid underwater animations and marine life.',
      image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f5309?w=800&h=500&fit=crop',
      stats: { frames: '1.8K', characters: 24, scenes: 32 },
      tags: ['Adventure', 'Exploration', 'Casual'],
      color: 'from-teal-500 to-cyan-600',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject(p => (p + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <section ref={ref} className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a2d] via-[#0a0a1a] to-[#0d1a2d]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-14 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-6">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-xs text-cyan-400 tracking-[0.2em] uppercase font-bold">Legendary Loot</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="text-white">OUR </span>
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">CONQUESTS</span>
          </h2>
        </div>

        {/* Featured Project Display */}
        <div className={`relative transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Project Image */}
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r ${projects[activeProject].color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-cyan-500/30 transition-all duration-500">
                <img
                  src={projects[activeProject].image}
                  alt={projects[activeProject].title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {projects[activeProject].tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white font-medium border border-white/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <div>
                <p className="text-cyan-400 text-sm font-bold tracking-wider mb-2">{projects[activeProject].subtitle}</p>
                <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {projects[activeProject].title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">{projects[activeProject].description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(projects[activeProject].stats).map(([key, value]) => (
                  <div key={key} className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{key}</div>
                  </div>
                ))}
              </div>

              {/* Project Navigation Dots */}
              <div className="flex items-center gap-4">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProject(index)}
                    className={`relative h-2 rounded-full transition-all duration-500 ${index === activeProject ? 'w-12 bg-gradient-to-r from-cyan-400 to-pink-400' : 'w-2 bg-gray-600 hover:bg-gray-500'}`}
                  />
                ))}
              </div>

              {/* View All Button */}
              <button
                onClick={() => scrollToSection('portfolio')}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-cyan-400 border-2 border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              >
                <span>VIEW ALL CONQUESTS</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Tech Stack Orbiting Animation
const TechStackOrbit = () => {
  const [ref, isInView] = useInView();
  const [hoveredTool, setHoveredTool] = useState(null);

  const tools = [
    { name: 'Adobe Animate', icon: '🎨', color: 'from-red-500 to-orange-500', borderColor: 'border-orange-500/50', glowColor: 'rgba(249, 115, 22, 0.4)' },
    { name: 'Spine', icon: '🦴', color: 'from-purple-500 to-pink-500', borderColor: 'border-pink-500/50', glowColor: 'rgba(236, 72, 153, 0.4)' },
    { name: 'After Effects', icon: '✨', color: 'from-blue-500 to-purple-500', borderColor: 'border-purple-500/50', glowColor: 'rgba(139, 92, 246, 0.4)' },
    { name: 'Unity', icon: '🎮', color: 'from-green-500 to-teal-500', borderColor: 'border-green-500/50', glowColor: 'rgba(34, 197, 94, 0.4)' },
    { name: 'Photoshop', icon: '🖌️', color: 'from-cyan-500 to-blue-500', borderColor: 'border-cyan-500/50', glowColor: 'rgba(6, 182, 212, 0.4)' },
    { name: 'Unreal', icon: '⚡', color: 'from-yellow-500 to-orange-500', borderColor: 'border-yellow-500/50', glowColor: 'rgba(234, 179, 8, 0.4)' },
    { name: 'Aseprite', icon: '👾', color: 'from-pink-500 to-red-500', borderColor: 'border-pink-500/50', glowColor: 'rgba(236, 72, 153, 0.4)' },
    { name: 'Figma', icon: '📐', color: 'from-violet-500 to-purple-500', borderColor: 'border-violet-500/50', glowColor: 'rgba(139, 92, 246, 0.4)' },
  ];

  // Calculate positions on a circle - evenly distributed
  const getToolPosition = (index, total, radius) => {
    // Start from top (-90 degrees) and go clockwise
    const angleStep = (2 * Math.PI) / total;
    const angle = -Math.PI / 2 + index * angleStep;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle: (angle * 180) / Math.PI + 90 };
  };

  const orbitRadius = 220; // Radius for the orbit path - increased for better spacing

  return (
    <section ref={ref} className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a2d] to-[#0a0a1a]" />

      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-pink-500/10 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-14 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm mb-6">
            <Cpu className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-purple-400 tracking-[0.2em] uppercase font-bold">Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="text-white">OUR </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">WEAPONS</span>
          </h2>
        </div>

        {/* Orbiting Tools Display */}
        <div className="relative h-[560px] sm:h-[620px] flex items-center justify-center">
          {/* Orbit Ring - matches the actual orbit path */}
          <div
            className="absolute rounded-full border-2 border-dashed animate-pulse"
            style={{
              width: `${orbitRadius * 2 + 100}px`,
              height: `${orbitRadius * 2 + 100}px`,
              borderColor: 'rgba(139, 92, 246, 0.2)',
            }}
          />
          <div
            className="absolute rounded-full border"
            style={{
              width: `${orbitRadius * 2 + 60}px`,
              height: `${orbitRadius * 2 + 60}px`,
              borderColor: 'rgba(6, 182, 212, 0.15)',
            }}
          />

          {/* Center Element */}
          <div className="relative z-10">
            <div className="relative">
              {/* Glow behind center */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-pink-500/30 blur-xl animate-pulse" />

              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-[3px] shadow-2xl"
                style={{ boxShadow: '0 0 60px rgba(139, 92, 246, 0.5)' }}>
                <div className="w-full h-full rounded-full bg-slate-900/95 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Joystick className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto mb-2" />
                    <span className="text-white font-bold text-xs sm:text-sm tracking-wider">CORE TECH</span>
                  </div>
                </div>
              </div>

              {/* Rotating ring around center */}
              <div
                className="absolute -inset-4 rounded-full border-2 border-dashed border-cyan-500/30"
                style={{ animation: 'spin 20s linear infinite' }}
              />
            </div>
          </div>

          {/* Orbiting Tools - Positioned on circle */}
          {tools.map((tool, index) => {
            const position = getToolPosition(index, tools.length, orbitRadius);
            const isHovered = hoveredTool === index;

            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-out ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                  transitionDelay: `${index * 0.1}s`,
                  zIndex: isHovered ? 20 : 1,
                }}
                onMouseEnter={() => setHoveredTool(index)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                <div
                  className={`group relative cursor-pointer transition-transform duration-500 ${isHovered ? 'scale-125' : 'scale-100'}`}
                >
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundColor: tool.glowColor }}
                  />

                  {/* Tool Card */}
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${tool.color} p-[2px] transition-all duration-500`}
                    style={{
                      boxShadow: isHovered ? `0 0 30px ${tool.glowColor}` : '0 4px 20px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <div className={`w-full h-full rounded-2xl bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center border ${tool.borderColor} transition-all duration-300`}>
                      <span className="text-2xl sm:text-3xl mb-1">{tool.icon}</span>
                      <span className="text-[9px] sm:text-[10px] text-gray-300 font-medium text-center px-1 leading-tight">{tool.name}</span>
                    </div>
                  </div>

                  {/* Floating label on hover */}
                  <div
                    className={`absolute -bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-800/95 backdrop-blur-sm rounded-lg text-xs text-white font-bold whitespace-nowrap border border-white/10 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                    style={{ boxShadow: `0 4px 20px ${tool.glowColor}` }}
                  >
                    {tool.name}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-t border-l border-white/10" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Decorative particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section - Epic Battle Call
const CTASection = () => {
  const [ref, isInView] = useInView();
  const mouse = useMousePosition();
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] to-[#0d1a2d]" />

      {/* Animated background elements */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-20"
        style={{
          background: 'conic-gradient(from 0deg, rgba(6,182,212,0.3), rgba(168,85,247,0.3), rgba(236,72,153,0.3), rgba(6,182,212,0.3))',
          filter: 'blur(100px)',
          transform: `translate(calc(-50% + ${mouse.x * 30}px), calc(-50% + ${mouse.y * 30}px))`,
          transition: 'transform 0.8s ease-out',
          animation: 'spin-slow 30s linear infinite',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`relative transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main CTA Card */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x" />
            <div className="absolute inset-[2px] bg-gradient-to-br from-[#0a0a1a] via-[#0d1a2d] to-[#0a0a1a] rounded-3xl" />

            {/* Content */}
            <div className="relative p-8 sm:p-12 lg:p-20 text-center">
              {/* Floating game elements */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                {['⚔️', '🛡️', '✨', '💎', '🔮', '⭐'].map((emoji, i) => (
                  <div
                    key={i}
                    className="absolute animate-float-particle opacity-30"
                    style={{
                      left: `${10 + i * 15}%`,
                      top: `${20 + (i % 3) * 25}%`,
                      fontSize: '24px',
                      animationDelay: `${i * 2}s`,
                      animationDuration: `${15 + i * 3}s`,
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>

              {/* Pixel art corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-cyan-500/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-cyan-500/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-pink-500/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-pink-500/50" />

              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-8">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
                <span className="text-xs text-cyan-400 tracking-[0.2em] uppercase font-bold">Ready Player One</span>
              </div>

              {/* Main Heading with Glitch */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                <span className="text-white">READY TO </span>
                <span className={`inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${glitchActive ? 'animate-glitch' : ''}`}>
                  LEVEL UP
                </span>
                <span className="text-white"> YOUR GAME?</span>
              </h2>

              <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Join forces with our legendary animators and forge unforgettable gaming experiences.
                <span className="text-cyan-400"> Your quest begins now.</span>
              </p>

              {/* XP Bar Style Element */}
              <div className="max-w-md mx-auto mb-10">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>YOUR PROJECT</span>
                  <span className="text-cyan-400">LEGENDARY STATUS</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-pulse" style={{ width: '75%' }} />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-bold text-black text-lg overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
                    boxShadow: '0 0 40px rgba(6,182,212,0.3), 0 0 80px rgba(168,85,247,0.2)',
                  }}
                >
                  <Swords className="w-6 h-6" />
                  <span className="relative z-10">BEGIN QUEST</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-bold text-white border-2 border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <Eye className="w-5 h-5" />
                  <span>VIEW CONQUESTS</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <div className="flex flex-wrap justify-center items-center gap-8">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm">100% Secure</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm">Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Star className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                    <span className="text-sm">5-Star Rated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamingPage;
