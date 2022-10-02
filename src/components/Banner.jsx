import React from "react";

export default function Banner() {
  return (
    <section id="banner" className="py-5">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="banner-content">
            <span className="text-white">Discount Up to 50%</span>
            <h2 className="mt-2">Grand Sale Offer!</h2>
            <button className="btn border-0">Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
