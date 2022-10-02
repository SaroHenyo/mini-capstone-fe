import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="hero">
      <Carousel className="container h-100 d-flex align-items-center">
        <Carousel.Item className="text-center">
          <h2 className="text-white">Best Collection</h2>
          <h1 className="text-white py-2 fw-bold">NEW ARRIVALS</h1>
          <Link to="/products" className="btn">
            SHOP NOW
          </Link>
        </Carousel.Item>
        <Carousel.Item className="text-center">
          <h2 className="text-white">Best Price & Offer</h2>
          <h1 className="text-white py-2 fw-bold">NEW SEASON</h1>
          <Link to="/products" className="btn">
            BUY NOW
          </Link>
        </Carousel.Item>
        <Carousel.Item className="text-center">
          <h2 className="text-white">Best Time To Buy</h2>
          <h1 className="text-white py-2 fw-bold">SUMMER SALE</h1>
          <Link to="/products" className="btn">
            GET IT NOW
          </Link>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}
