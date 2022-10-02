import React from "react";
import { topRated, bestSelling, onSale } from "../../utilities/enums";
import Footer from "../Footer";

export default function AboutUs() {
  const renderPopular = (data) => {
    return data.map((product) => (
      <div
        className="d-flex align-items-start justify-content-start"
        key={data.id}
      >
        <img
          src={product.image}
          alt={product.title}
          className="img-fluid w-25 pe-3"
        />
        <div className="description">
          <p className="mb-0">{product.title}</p>
          <span>{product.price}</span>
        </div>
      </div>
    ));
  };

  return (
    <>
      <section id="aboutUs">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-1 order-lg-1">
              <div className="title pt-3 pb-5">
                <h2 className="position-relative d-inline-block">About Us</h2>
              </div>
              <p className="lead text-muted">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
                nihil quisquam nemo et omnis?
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
                quidem doloribus culpa, doloremque quibusdam consequatur
                eligendi repellat labore animi eius dolor repellendus quod
                asperiores! Fugit, quam quis! Quia, ea harum!
              </p>
            </div>

            <div className="col-lg-6 order-lg-0">
              <img
                src="images/about_us.jpg"
                alt="about-us"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="popular" className="py-5">
        <div className="container">
          <div className="title text-center pt-3 pb-5">
            <h2 className="position-relative d-inline-block">
              Popular Of This Year
            </h2>
          </div>

          <div className="row">
            <div className="col-md-6 col-lg-4 g-3 row">
              <h3 className="fs-5">Top Rated</h3>
              {renderPopular(topRated)}
            </div>
            <div className="col-md-6 col-lg-4 g-3 row">
              <h3 className="fs-5">Best Selling</h3>
              {renderPopular(bestSelling)}
            </div>
            <div className="col-md-6 col-lg-4 g-3 row">
              <h3 className="fs-5">On sale</h3>
              {renderPopular(onSale)}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
