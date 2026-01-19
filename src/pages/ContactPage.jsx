import React, { useState } from 'react';
import {
  Mail, Phone, Send, MessageSquare, Clock,
  Gamepad2, Sparkles, CheckCircle, Zap,
  Twitter, Instagram, Linkedin, Github
} from 'lucide-react';
import { useInView, useMousePosition } from '../hooks/useAnimations';

const ContactPage = () => {
  const [ref, isInView] = useInView();
  const mouse = useMousePosition();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', company: '', budget: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'hello@bytecitadel.com',
      link: 'mailto:hello@bytecitadel.com',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (234) 567-890',
      link: 'tel:+1234567890',
      color: 'from-pink-500 to-purple-500',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: 'Mon - Fri, 9AM - 6PM EST',
      link: null,
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const budgetOptions = [
    '$5K - $10K',
    '$10K - $25K',
    '$25K - $50K',
    '$50K+',
    'Not sure yet'
  ];

  return (
    <div className="relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0d1a2d] to-[#1a0a20]" />

      {/* Animated orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)',
          transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)`,
          transition: 'transform 1s ease-out',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)',
          transform: `translate(${-mouse.x * 25}px, ${-mouse.y * 25}px)`,
          transition: 'transform 1s ease-out',
        }}
      />

      {/* Content */}
      <div ref={ref} className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm mb-6">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span className="text-xs text-cyan-400 tracking-[0.2em] uppercase font-bold">Start Your Quest</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span className="text-white">LET'S </span>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">CREATE</span>
              <span className="text-white"> TOGETHER</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ready to bring your gaming vision to life? Drop us a message and let's discuss your epic adventure.
            </p>
          </div>

          {/* Contact Methods */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="group relative p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 backdrop-blur-sm transition-all duration-500 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} p-[1px] mb-4`}>
                  <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-white font-bold mb-1">{method.title}</h3>
                <p className="text-gray-400 text-sm">{method.value}</p>
              </a>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className={`transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative p-8 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full blur-2xl" />

                <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Send a Message
                </h2>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mb-6 animate-bounce">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Quest Submitted!</h3>
                    <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    {/* Company & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Company (Optional)</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                          placeholder="Your Studio"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Budget Range</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                        >
                          <option value="">Select budget</option>
                          {budgetOptions.map((option, i) => (
                            <option key={i} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full relative py-4 rounded-xl font-bold text-black overflow-hidden transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className={`space-y-8 transition-all duration-1000 delay-400 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {/* Why Work With Us */}
              <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Why Choose ByteCitadel?
                </h3>
                <ul className="space-y-4">
                  {[
                    { icon: Zap, text: 'Lightning-fast turnaround times' },
                    { icon: Sparkles, text: 'Premium quality animations' },
                    { icon: Gamepad2, text: 'Deep gaming industry expertise' },
                    { icon: CheckCircle, text: 'Unlimited revisions until perfect' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-gray-300">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Connect With Us
                </h3>
                <div className="flex gap-4">
                  {[
                    { icon: Twitter, color: 'hover:bg-cyan-500/10 hover:text-cyan-400' },
                    { icon: Instagram, color: 'hover:bg-pink-500/10 hover:text-pink-400' },
                    { icon: Linkedin, color: 'hover:bg-blue-500/10 hover:text-blue-400' },
                    { icon: Github, color: 'hover:bg-gray-500/10 hover:text-gray-300' },
                  ].map((social, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`w-12 h-12 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-center text-gray-500 transition-all duration-300 ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <div>
                    <p className="text-white font-medium">We're Online!</p>
                    <p className="text-sm text-gray-400">Typical response time: Under 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
