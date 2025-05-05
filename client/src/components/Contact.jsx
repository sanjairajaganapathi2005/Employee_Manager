import { useState } from "react";
import "../styles/contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setResponseMsg(result.message || result.error);
      if (res.ok) {
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
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
              title="RC TEX Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.174238226501!2d78.0905929!3d11.5147576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babe636fe3610c1%3A0xc578cf945121f2ed!2sRC%20TEX!5e1!3m2!1sen!2sin!4v1714900000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""

              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="form-container">
            <form className="connect-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Send Message <span className="btn-icon">→</span>
              </button>
              {responseMsg && (
                <p
                  className={`response ${responseMsg.includes("Failed") ? "error" : "success"
                    }`}
                >
                  {responseMsg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section >
  );
}

export default Contact;
