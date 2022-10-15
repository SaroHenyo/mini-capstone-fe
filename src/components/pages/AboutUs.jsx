import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import * as actionPopularProducts from "../../redux/actions/actionPopularProduct";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

export default function AboutUs() {
  const [topRated, setTopRated] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [onSale, setOnsale] = useState([]);
  const { getAllPopularProducts } = bindActionCreators(
    actionPopularProducts,
    useDispatch()
  );

  useEffect(() => {
    getAllPopularProducts().then((response) => {
      setTopRated(
        response.payload.filter((product) => product.type === "topRated")
      );
      setBestSelling(
        response.payload.filter((product) => product.type === "bestSelling")
      );
      setOnsale(
        response.payload.filter((product) => product.type === "onSale")
      );
    });
  }, []);

  const renderPopular = (data) => {
    return data.map((product) => (
      <div
        className="d-flex align-items-start justify-content-start"
        key={data.productId}
      >
        <img
          src={
            product.imageLink
              ? `http://localhost:8080/popular/${product.productId}/download`
              : "/images/empty-image.jpeg"
          }
          alt={product.productName}
          className="img-fluid w-25 pe-3"
        />
        <div className="description">
          <p className="mb-0">{product.productName}</p>
          <span>$ {product.price}</span>
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
