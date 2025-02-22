import Navbar from "./navbar"; 
import "../styles/home.css";
import { useNavigate } from "react-router-dom"; 

function Home() {
  const navigate = useNavigate(); 

  return (
    <div className="home-container"> 
      <Navbar />
      <section id="production" className="section">
        <h2>Production</h2>
        <p>Details about our production process...</p>
      </section>
      <section id="about" className="section">
        <h2>About Us</h2>
        <p>Information about our company...</p>
        <button type="button" onClick={() => navigate('/production')}> 
        Production
      </button>
      <button type="button" onClick={() => navigate('/design')}>
        Design
      </button>
      </section>
      <section id="contact" className="section">
        <h2>Contact Us</h2>
        <p>Contact details here...</p>
      </section>
      
    </div>
  );
}

export default Home;
