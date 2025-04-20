import "../styles/contact.css";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      setResponseMsg(result.message || result.error);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setResponseMsg("Failed to send message.");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-wrapper">
        <h2 className="cgradient">Contact Us</h2>
        <div className="contact-container">
          <div className="map-container">
            <iframe
              title="R C TEX Location"
              src="https://www.google.com/maps/embed?pb=YOUR_EMBED_LINK_HERE"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          <div className="form-container">
            <form className="connect-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="5" required />
              </div>
              <button type="submit" className="submit-btn">
                Send Message
                <span className="btn-icon">→</span>
              </button>
              {responseMsg && <p className={`response ${responseMsg.includes("Failed") ? "error" : "success"}`}>{responseMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;