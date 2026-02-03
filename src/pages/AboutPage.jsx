import React from 'react';
import {
  Users, Target, Heart, Zap, Shield,
  ArrowRight, Crown, Gamepad2,
  Trophy, Flame
} from 'lucide-react';
import { useInView, useMousePosition, useCounter } from '../hooks/useAnimations';

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

// Individual Stat Card component to properly use the hook
const AboutStatCard = ({ stat, isInView }) => {
  const count = useCounter(isInView ? stat.value : 0, 2000);
  const Icon = stat.icon;

  return (
    <div className="relative p-6 rounded-2xl bg-slate-900/50 border border-white/5 text-center group hover:border-purple-500/30 transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
      <Icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
      <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        {count}{stat.suffix}
      </div>
      <p className="text-gray-400 text-sm">{stat.label}</p>
    </div>
  );
};

const AboutPage = () => {
  const [ref, isInView] = useInView();
  const mouse = useMousePosition();

  const stats = [
    { value: 30, suffix: '+', label: 'Projects Completed', icon: Trophy },
    { value: 5, suffix: '+', label: 'Years Experience', icon: Crown },
    { value: 25, suffix: '+', label: 'Team Members', icon: Users },
    { value: 98, suffix: '%', label: 'Client Satisfaction', icon: Heart },
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Every frame matters. We craft pixel-perfect animations with meticulous attention to detail.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Flame,
      title: 'Passion',
      description: 'Gaming is in our DNA. We bring genuine enthusiasm and creativity to every project.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Zero missed deadlines. We deliver on our promises, every single time.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge techniques and creative solutions.',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="relative overflow-hidden py-20">
      {/* Background transparent to show animated bg from App.jsx */}

      {/* Animated orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)',
          transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)`,
          transition: 'transform 1s ease-out',
        }}
      />

      {/* Content */}
      <div ref={ref} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm mb-6">
              <Crown className="w-5 h-5 text-purple-400" />
              <span className="text-xs text-purple-400 tracking-[0.2em] uppercase font-bold">Our Story</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span className="text-white">THE </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">BYTECITADEL</span>
              <span className="text-white"> SAGA</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Founded by gamers, for gamers. We're a team of passionate artists and animators
              dedicated to bringing gaming visions to life through stunning 2D animation.
            </p>
          </div>

          {/* Stats Section */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <AboutStatCard key={index} stat={stat} isInView={isInView} />
            ))}
          </div>

          {/* Values Section */}
          <div className={`mb-20 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              OUR <span className="text-purple-400">VALUES</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-purple-500/30 backdrop-blur-sm transition-all duration-500 hover:scale-105"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} p-[2px] mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>



          {/* CTA Section */}
          <div className={`text-center transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="p-12 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/5">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                READY TO JOIN FORCES?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Let's create something legendary together. Start your quest with ByteCitadel today.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-black overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
                }}
              >
                <Gamepad2 className="w-5 h-5" />
                <span>Start Your Quest</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
