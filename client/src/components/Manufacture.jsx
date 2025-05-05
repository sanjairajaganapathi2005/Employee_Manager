import React from "react";
import "../styles/manufacture.css";

function Manufacture() {
  return (
    <section id="manufacture" className="manufact-section">
      <h2 className="mgradient">Our Manufacturing</h2>
      <p className="manufact-desc">
        We specialize in producing high-quality cotton towels and cloths, available in a variety of colors and designs for everyday use. Our facilities are equipped with cutting-edge weaving machines, advanced dyeing units, and precision finishing systems. We follow a lean manufacturing process with strict quality checks to ensure we meet global quality standards.
      </p>
      <div className="manufacture-slideshow">
        <div className="slide-track">
          <img src="/img8.jpeg" alt="nulll to boni" />
          <img src="/img9.jpeg" alt="nulll to boni" />
          <img src="/img10.jpeg" alt="boni to tar " />
          <img src="/img11.jpeg" alt="cone to tar" />
          <img src="/img12.jpeg" alt="tar to loam" />
          <img src="/img13.jpeg" alt="tar and loam" />
          <img src="/img14.jpeg" alt="cutting and fold" />
        </div>
      </div>
    </section>
  );
}

export default Manufacture;