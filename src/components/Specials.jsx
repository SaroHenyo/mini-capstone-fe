import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import * as actionProduct from "../redux/actions/actionProduct";
import * as actionCart from "../redux/actions/actionCart";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

export default function Specials() {
  const [specials, setSpecials] = useState([]);
  const { getAllProducts } = bindActionCreators(actionProduct, useDispatch());
  const { addToCart } = bindActionCreators(actionCart, useDispatch());

  useEffect(() => {
    getAllProducts().then((response) => {
      setSpecials(
        response.payload.filter((product) => product.type === "special")
      );
    });
  }, []);

  const addProductToCart = (productId) => {
    if (localStorage.email) {
      addToCart(localStorage.email, productId);
      window.location.reload();
    }
  };

  const renderSpecials = () => {
    return specials.map((item) => (
      <div className="col-md-6 col-lg-4 col-xl-3 p-2" key={item.productId}>
        <div className="special-img position-relative overflow-hidden">
          <img
            src={
              item.imageLink
                ? `http://localhost:8080/product/${item.productId}/download`
                : "/images/empty-image.jpeg"
            }
            alt={item.productName}
            className="w-100"
          />
          <span className="position-absolute d-flex align-items-center justify-content-center text-primary fs-4">
            <FontAwesomeIcon icon={faHeart} />
          </span>
        </div>
        <div className="text-center">
          <p className="text-capitalize mt-3 mb-1">{item.productName}</p>
          <span className="fw-bold d-block">$ {item.price}</span>
          <button
            className="btn btn-primary mt-3"
            onClick={() => addProductToCart(item.productId)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    ));
  };
  return (
    <section id="specials" className="pb-5">
      <div className="container">
        <div className="title text-center py-5">
          <h2 className="position-relative d-inline-block">
            Special Selection
          </h2>
        </div>

        <div className="row">{renderSpecials()}</div>
      </div>
    </section>
  );
}
