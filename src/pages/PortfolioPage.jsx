import React, { useState } from 'react';
import {
  ArrowRight, Play, Grid, List,
  Sparkles, Gamepad2
} from 'lucide-react';
import { useInView, useMousePosition } from '../hooks/useAnimations';

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

const PortfolioPage = () => {
  const [ref, isInView] = useInView();
  const mouse = useMousePosition();
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'character', name: 'Character Animation' },
    { id: 'environment', name: 'Environment Art' },
    { id: 'vfx', name: 'Visual Effects' },
    { id: 'ui', name: 'UI Animation' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Fantasy Quest',
      category: 'character',
      description: 'Epic RPG with 12+ fully animated characters and boss battles.',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
      tags: ['RPG', 'Fantasy', 'Action'],
      stats: { frames: '2.4K', characters: 12 },
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 2,
      title: 'Neon Warriors',
      category: 'character',
      description: 'Cyberpunk fighting game with high-octane combat animations.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
      tags: ['Fighting', 'Cyberpunk'],
      stats: { frames: '3.2K', characters: 18 },
      color: 'from-pink-500 to-purple-600',
    },
    {
      id: 3,
      title: 'Ocean Tales',
      category: 'environment',
      description: 'Underwater adventure with stunning parallax environments.',
      image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f5309?w=800&h=600&fit=crop',
      tags: ['Adventure', 'Exploration'],
      stats: { frames: '1.8K', scenes: 32 },
      color: 'from-teal-500 to-cyan-600',
    },
    {
      id: 4,
      title: 'Mystic Spells',
      category: 'vfx',
      description: 'Magical spell effects and particle systems for fantasy RPG.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop',
      tags: ['VFX', 'Magic', 'Particles'],
      stats: { effects: 150, spells: 45 },
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 5,
      title: 'Space Odyssey',
      category: 'environment',
      description: 'Sci-fi space environments with dynamic lighting effects.',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop',
      tags: ['Sci-Fi', 'Space'],
      stats: { frames: '2.1K', scenes: 24 },
      color: 'from-indigo-500 to-purple-600',
    },
    {
      id: 6,
      title: 'Kingdom HUD',
      category: 'ui',
      description: 'Medieval-themed UI kit with animated menus and transitions.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop',
      tags: ['UI/UX', 'Medieval'],
      stats: { components: 80, animations: 120 },
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="relative overflow-hidden py-20">
      {/* Background transparent to show animated bg from App.jsx */}

      {/* Animated orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)',
          transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)`,
          transition: 'transform 1s ease-out',
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)',
          transform: `translate(${-mouse.x * 15}px, ${-mouse.y * 15}px)`,
          transition: 'transform 1s ease-out',
        }}
      />

      {/* Content */}
      <div ref={ref} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-6">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-xs text-cyan-400 tracking-[0.2em] uppercase font-bold">Our Conquests</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span className="text-white">LEGENDARY </span>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">PORTFOLIO</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our collection of epic gaming animations and visual masterpieces.
            </p>
          </div>

          {/* Filter Bar */}
          <div className={`flex flex-wrap items-center justify-between gap-4 mb-12 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeFilter === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white'
                    : 'bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700/50 border border-white/5'
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 p-1 rounded-lg bg-slate-800/50 border border-white/5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-300 ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-300 ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className={`grid gap-8 transition-all duration-500 ${viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
            }`}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={`relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 backdrop-blur-sm transition-all duration-500 ${viewMode === 'list' ? 'flex' : ''
                  }`}>
                  {/* Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-1/3' : ''}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${viewMode === 'list' ? 'h-full' : 'aspect-video'
                        }`}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {project.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-xs text-white font-medium border border-white/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''}`}>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">{value}</span>
                          <span className="text-xs text-gray-500 uppercase">{key}</span>
                        </div>
                      ))}
                    </div>

                    {/* View Button */}
                    <button
                      className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More / CTA */}
          <div className={`text-center mt-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-gray-400 mb-6">Interested in starting your own legendary project?</p>
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
  );
};

export default PortfolioPage;
