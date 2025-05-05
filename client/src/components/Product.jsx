import React from "react";
import "../styles/product.css";

function Product() {
  return (
    <section id="products" className="product-section">
      <h2 className="pgradient">Our Products</h2>
      <p className="product-desc">
        We specialize in producing high-quality cotton towels and cloths, available in a variety of colors and designs. Our products are crafted for everyday use and tested for softness, durability, and long-lasting color to ensure comfort and satisfaction.
      </p>

      <div className="product-slideshow">
        <div className="slide-track">
          <img src="/img1.jpeg" alt="Premium Cotton Fabric" />
          <img src="/img2.jpeg" alt="Cotton-Polyester Blend" />
          <img src="/img3.jpeg" alt="Yarn-Dyed Textile" />
          <img src="/img4.jpeg" alt="Specialty Material" />
          <img src="/img5.jpeg" alt="Apparel Fabric" />
          <img src="/img6.jpeg" alt="Home Textile" />
          <img src="/img7.jpeg" alt="Home Textile" />

        </div>
      </div>
    </section>
  );
}

export default Product;