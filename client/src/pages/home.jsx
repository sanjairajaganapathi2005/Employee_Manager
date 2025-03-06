import Navbar from "./navbar";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      
      {/* Production Section */}
      <section id="production" className="section">
        <h2>Production</h2>
        <p>Our production process follows a strict quality control system to ensure that each product meets international standards. We source raw materials from the best suppliers and employ skilled labor for weaving, dyeing, and finishing textiles.</p>
      </section>
      
      {/* About Us Section */}
      <section id="about" className="section">
        <h2>About Us</h2>
        <p>We are R C TEX, a leading textile exporter over south India. With over 20 years of experience in the textile industry, we specialize in high-quality textiles exported worldwide. Our commitment to excellence and sustainable practices sets us apart in the market.</p>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="section">
        <h2>Contact Us</h2>
        <p>If you need to get in touch, feel free to reach out to us:</p>
        <p>Email: <a href="mailto:ramasamyrctex@gmail.com">ramasamyrctex@gmail.com</a></p>
        <p>Phone: <a href="tel:+9442965223">9442965223</a></p>
        <p>Or visit us at our office:</p>
        <p>R C TEX ,Vennadur(Po), Rasipuram(Tk), Namakkal(Dt),Tamil Nadu -637505</p>
      </section>
    </div>
  );
}

export default Home;
