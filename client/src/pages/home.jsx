import Navbar from "../components/Navbar";
import Product from "../components/Product";
import About from "../components/About";
import Manufacture from "../components/Manufacture";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <section id="about"><About /></section>
      <section id="product"><Product /></section>
      <section id="manufacture"><Manufacture /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </div>
  );
}

export default Home;
