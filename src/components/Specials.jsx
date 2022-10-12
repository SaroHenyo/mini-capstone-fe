import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { specials } from "../utilities/enums";

export default function Specials() {
  const renderSpecials = () => {
    return specials.map((item) => (
      <div className="col-md-6 col-lg-4 col-xl-3 p-2" key={item.id}>
        <div className="special-img position-relative overflow-hidden">
          <img src={item.image} alt={item.name} className="w-100" />
          <span className="position-absolute d-flex align-items-center justify-content-center text-primary fs-4">
            <FontAwesomeIcon icon={faHeart} />
          </span>
        </div>
        <div className="text-center">
          <p className="text-capitalize mt-3 mb-1">{item.name}</p>
          <span className="fw-bold d-block">{item.price}</span>
          <button className="btn btn-primary mt-3">Add to Cart</button>
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
