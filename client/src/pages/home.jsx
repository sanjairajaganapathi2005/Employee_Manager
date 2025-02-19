import Navbar from "./navbar"; 
import "../styles/home.css";

function Home() {
  return (
    <div className="home-container"> 
   
      <Navbar />
      <section id="production" className="section">
        <h2>Production</h2>
        <p>Details about our production prcocess...</p>
      </section>
      <section id="about" className="section">
        <h2>About Us</h2>
        <p>Information about our company...</p>
      </section>
      <section id="contact" className="section">
        <h2>Contact Us</h2>
        <p>Contact details here...</p>
      </section>
    </div>
  );
}

export default Home;
