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
    <div className="min-h-screen text-white relative">
      {/* Fixed 2D Animated Gaming Background */}
      <div className="animated-bg" aria-hidden="true">
        <img
          src={`${process.env.PUBLIC_URL}/gaming_background.png`}
          alt=""
          className="animated-bg-image"
        />
        <div className="animated-bg-overlay" />
      </div>

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
