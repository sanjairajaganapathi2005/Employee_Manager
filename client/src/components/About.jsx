import React from "react";
import "../styles/about.css";

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="section-header">
        <h2 className="gradientheading">About Us</h2>
          <p className="subtitle">Textile Innovators Since 2003</p>
        </div>

        <div className="about-content">
          {/* Row 1 - 3 Small Cards */}
          <div className="small-cards-row">
            <div className="about-card">
              <div className="card-icon">🏭</div>
              <h3>Our Facility</h3>
              <p>50,000 sqft manufacturing plant with cutting-edge technology in Namakkal, Tamil Nadu</p>
              <div className="card-stats">
                <span>5 Production Lines</span>
                <span>200+ Employees</span>
              </div>
            </div>

            <div className="about-card">
              <div className="card-icon">🌎</div>
              <h3>Global Presence</h3>
              <p>Exporting premium textiles to 15+ countries across Europe, North America, and Asia</p>
              <div className="card-stats">
                <span>50+ Clients</span>
                <span>5 Continents</span>
              </div>
            </div>

            <div className="about-card">
              <div className="card-icon">👔</div>
              <h3>Experience</h3>
              <p>20+ years in textile manufacturing and exports with consistent quality and innovation</p>
              <div className="card-stats">
                <span>100+ Projects</span>
                <span>5 Generations</span>
                <span>10+ Awards</span>
              </div>
            </div>
          </div>

          {/* Row 2 - 2 Large Cards */}
          <div className="large-cards-row">
            <div className="about-card main-card">
              <h3>Our Heritage</h3>
              <p>
                Founded in 2003 by Mr. Ramasamy, R C TEX began as a small weaving unit and has grown into 
                a vertically integrated textile exporter. Our journey reflects Tamil Nadu's rich textile 
                heritage combined with modern manufacturing excellence.
              </p>
              <div className="signature">
                <p>Ramasamy Chettiar</p>
                <p>Founder & Managing Director</p>
              </div>
            </div>

            <div className="about-card main-card">
              <h3>Our Mission</h3>
              <p>
                To deliver exceptional textile products through sustainable practices, 
                while maintaining the highest standards of quality and ethical business.
              </p>
              <div className="mission-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Eco-friendly production</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Fair trade practices</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Innovative designs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;