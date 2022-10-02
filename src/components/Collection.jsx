import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { collections } from "../utilities/enums";
import { Link } from "react-router-dom";
import { renderLoading } from "../utilities/loader";

export default function Collection() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [products, setProducts] = useState(collections);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (activeFilter !== "ALL") {
        setProducts(
          collections.filter((product) => product.filter === activeFilter)
        );
        setLoading(false);
      } else {
        setProducts(collections);
        setLoading(false);
      }
    }, 1000);
  }, [activeFilter]);

  const renderCollectionList = () => {
    return products.map((item) => (
      <div className="col-md-6 col-lg-4 col-xl-3 p-2 new" key={item.id}>
        <div className="collection-img position-relative">
          <Link to={`/product/${item.id}`}>
            <img src={item.image} alt={item.name} className="w-100" />
          </Link>

          <span className="bg-primary position-absolute d-flex align-items-center justify-content-center text-white">
            sale
          </span>
        </div>
        <div className="text-center">
          <div className="rating">
            <span className="text-primary">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="text-primary">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="text-primary">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="text-primary">
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="text-primary">
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
          <p className="text-capitalize my-1">{item.name}</p>
          <span className="fw-bold">{item.price}</span>
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
            <button className="btn m-2" onClick={() => setActiveFilter("BEST")}>
              Best Sellers
            </button>
            <button className="btn m-2" onClick={() => setActiveFilter("FEAT")}>
              Featured
            </button>
            <button className="btn m-2" onClick={() => setActiveFilter("NEW")}>
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
