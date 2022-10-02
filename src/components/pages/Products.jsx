import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { renderLoading } from "../../utilities/loader";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [componentMounted, setComponentMounted] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");

      if (componentMounted) {
        setData(await response.clone().json());
        setFilteredProducts(await response.json());
        setLoading(false);
      }

      return () => {
        setComponentMounted(false);
      };
    };

    getProducts();
  }, [componentMounted]);

  const filterProducts = (category) => {
    const updatedList = data.filter((item) => item.category === category);
    setFilteredProducts(updatedList);
  };

  const renderProducts = () => {
    return (
      <>
        <div className="row g-0">
          <div className="d-flex flex-wrap mb-5 justify-content-center">
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => setFilteredProducts(data)}
            >
              ALL
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => filterProducts("men's clothing")}
            >
              Men's Clothing
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => filterProducts("women's clothing")}
            >
              Women's Clothing
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => filterProducts("jewelery")}
            >
              Jewelery
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => filterProducts("electronics")}
            >
              Electronics
            </button>
          </div>
        </div>

        {filteredProducts.map((product) => (
          <React.Fragment key={product.id}>
            <div className="col-md-3 mb-4">
              <div className="card h-100 text-center p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top"
                  height="250px"
                />
                <div className="card-body">
                  <h5 className="card-title mb-0">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-tex lead fw-bold">$ {product.price}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-outline-dark"
                  >
                    Buy now
                  </Link>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center py-5">
              Latest Products
            </h1>
            <hr />
          </div>
        </div>

        <div className="row justify-content-center">
          {loading ? renderLoading() : renderProducts()}
        </div>
      </div>
    </div>
  );
}
