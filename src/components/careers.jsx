import React from 'react';
import './careers.css';
import Navbar from './Navbar';
import Footer from './Footer';
const CareersPage = () => {
  return (
    
    <div className="careers-page">
      {/* Hero Section */}
      <Navbar/>
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Help us build the future of travel</h1>
            <p>We’re a small team of travel aficionados working to help people travel and experience the world.</p>
            <button className="view-positions-btn">View Open Positions</button>
          </div>
          <div className="hero-image">
            <img src="path-to-your-image" alt="Hero" />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values-section">
        <h2>Our core values are deeply rooted in everyone of us</h2>
        <div className="values-container">
          <div className="value-item">
            <h3>Take ownership.</h3>
            <p>We value a bias for taking action and delivering commitments, and we trust our teammates to do so.</p>
          </div>
          <div className="value-item">
            <h3>Continually improve.</h3>
            <p>We find ways to improve each and every day, no matter how small the improvement.</p>
          </div>
          <div className="value-item">
            <h3>Do more with less.</h3>
            <p>We encourage resourcefulness and creativity when solving problems and delivering value to our members.</p>
          </div>
          <div className="value-item">
            <h3>Be human.</h3>
            <p>We encourage questions, discourage groupthink, and value each other's and our members’ humanity.</p>
          </div>
        </div>
      </section>

      {/* Perks and Benefits Section */}
      <section className="perks-section">
        <h2>Perks and benefits</h2>
        <div className="perks-container">
          <button className="view-positions-btn">View Open Positions</button>
          <div className="perks-list">
            <div className="perk-item">
              <h3>Live Your Best Work Life</h3>
            </div>
            <div className="perk-item">
              <h3>Top-tier health, vision, and dental insurance</h3>
            </div>
            <div className="perk-item">
              <h3>Flex working hours</h3>
            </div>
            <div className="perk-item">
              <h3>Take your birthday off</h3>
            </div>
            <div className="perk-item">
              <h3>Paid time off</h3>
            </div>
            <div className="perk-item">
              <h3>Travel with half the price</h3>
            </div>
            <div className="perk-item">
              <h3>Time off to volunteer</h3>
            </div>
            <div className="perk-item">
              <h3>Team activity hours</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="roles-section">
        <h2>Open Roles</h2>
        <div className="roles-container">
          <div className="role-item">
            <h3>Marketing Associate</h3>
            <p>Marketing, Barcelona</p>
            <p>Full-time</p>
            <button className="learn-more-btn">Learn More</button>
          </div>
          <div className="role-item">
            <h3>Sales Director</h3>
            <p>Sales, Barcelona</p>
            <p>Full-time</p>
            <button className="learn-more-btn">Learn More</button>
          </div>
          <div className="role-item">
            <h3>Product Manager</h3>
            <p>Product, Barcelona</p>
            <p>Full-time</p>
            <button className="learn-more-btn">Learn More</button>
          </div>
          <div className="role-item">
            <h3>Accountant</h3>
            <p>Finance, Barcelona</p>
            <p>Full-time</p>
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default CareersPage;
