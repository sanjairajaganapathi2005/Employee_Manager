import React from "react";
import "../styles/manufacture.css";

function Manufacture() {
  return (
    <section id="manufacture" className="manufact-section">
      <h2 className="gradient-heading">Our Manufacturing</h2>
      <p className="manufact-desc">
        Our facilities are equipped with cutting-edge weaving machines, dyeing units, and precision finishing systems.
        We follow a lean manufacturing process with strict quality checks to meet global benchmarks.
      </p>
      <div className="manufacture-slideshow">
        <div className="slide-track">
          <img src="/img1.jpg" alt="nulll to boni" />
          <img src="/img1.jpg" alt="boni to tar " />
          <img src="/img1.jpg" alt="cone to tar" />
          <img src="/img1.jpg" alt="tar to loam" />
          <img src="/img1.jpg" alt="tar and loam" />
          <img src="/img1.jpg" alt="cutting and fold" />
        </div>
      </div>
    </section>
  );
}

export default Manufacture;