import React from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Sections
import GamingPage from './pages/GamingPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';

// Main App Component - Single Page
function App() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      <Navbar />
      <main>
        {/* Home / Hero Section */}
        <section id="home">
          <GamingPage />
        </section>

        {/* Portfolio Section */}
        <section id="portfolio">
          <PortfolioPage />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutPage />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactPage />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
