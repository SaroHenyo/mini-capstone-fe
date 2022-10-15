import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { renderLoading } from "../utilities/loader";
import * as actionProducts from "../redux/actions/actionProduct";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

export default function Collection() {
  const { getAllProducts } = bindActionCreators(actionProducts, useDispatch());
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getAllProducts().then((response) => {
      setTimeout(() => {
        const allProducts = response.payload.filter(
          (product) => product.type === "regular"
        );

        if (activeFilter !== "ALL") {
          setProducts(
            allProducts.filter((product) => product.filter === activeFilter)
          );
          setLoading(false);
        } else {
          setProducts(allProducts);
          setLoading(false);
        }
      }, 1000);
    });
  }, [activeFilter]);

  const renderRatings = (ratings) => {
    const sequence = [];
    for (let step = 1; step <= parseInt(ratings); step++) {
      sequence.push(1);
    }

    return sequence.map(() => (
      <span className="text-primary">
        <FontAwesomeIcon icon={faStar} />
      </span>
    ));
  };

  const renderCollectionList = () => {
    return products.map((item) => (
      <div className="col-md-6 col-lg-4 col-xl-3 p-2 new" key={item.productId}>
        <div className="collection-img position-relative">
          <Link to={`/product/${item.productId}`}>
            <img
              src={
                item.imageLink
                  ? `http://localhost:8080/product/${item.productId}/download`
                  : "/images/empty-image.jpeg"
              }
              alt={item.productName}
              className="w-100"
            />
          </Link>

          <span className="bg-primary position-absolute d-flex align-items-center justify-content-center text-white">
            sale
          </span>
        </div>
        <div className="text-center">
          <div className="rating">{renderRatings(item.ratings)}</div>
          <p className="text-capitalize my-1">{item.productName}</p>
          <span className="fw-bold">$ {item.price}</span>
        </div>
      </div>
    ));
  };

  return (
    <section id="collection" className="py-5">
      <div className="container">
        <div className="title text-center">
          <h2 className="position-relative d-inline-block">New Collection</h2>
        </div>

        <div className="row g-0">
          <div className="d-flex flex-wrap mt-5 justify-content-center">
            <button className="btn m-2" onClick={() => setActiveFilter("ALL")}>
              All
            </button>
            <button className="btn m-2" onClick={() => setActiveFilter("best")}>
              Best Sellers
            </button>
            <button className="btn m-2" onClick={() => setActiveFilter("feat")}>
              Featured
            </button>
            <button className="btn m-2" onClick={() => setActiveFilter("new")}>
              New Arrival
            </button>
          </div>
          <div className="collection-list row mt-4 gx-0 gy-3">
            {loading ? renderLoading() : renderCollectionList()}
          </div>
        </div>
      </div>
    </section>
  );
}
