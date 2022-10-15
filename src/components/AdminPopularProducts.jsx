import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionPopularProducts from "../redux/actions/actionPopularProduct";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function AdminPopularProducts() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("topRated");

  const popularProductList = useSelector((state) => state.popularProductList);
  const { getAllPopularProducts, addPopularProduct, deletePopularProduct } =
    bindActionCreators(actionPopularProducts, useDispatch());

  // Validation
  const [invalidProductName, setInvalidProductName] = useState(false);
  const [invalidPrice, setInvalidPrice] = useState(false);

  useEffect(() => {
    getAllPopularProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkIfValid()) {
      const body = {
        productName: productName,
        price: price,
        type: type,
      };

      addPopularProduct(body);
    }
  };

  const checkIfValid = () => {
    let isValid = true;

    // Check if productName is valid
    if (productName.match("^$|^.*@.*..*$")) {
      setInvalidProductName(true);
      isValid = false;
    } else {
      setInvalidProductName(false);
    }

    // Check if price has value
    if (price.match("^$|^.*@.*..*$") || isNaN(price) || price <= 0) {
      setInvalidPrice(true);
      isValid = false;
    } else {
      setInvalidPrice(false);
    }

    return isValid;
  };

  function MyDropzone(product) {
    // Callback function
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("file", file);

      // Upload to s3
      axios
        .put(
          `http://localhost:8080/popular/${product.productId}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          console.log("file uploaded successfully");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    // React Dropzone
    const { getRootProps } = useDropzone({ onDrop });

    // Return statement
    return (
      <div className="card h-100 text-center p-4">
        <img
          src={
            product.imageLink
              ? `http://localhost:8080/popular/${product.productId}/download`
              : "/images/empty-image.jpeg"
          }
          alt={product.productName}
          {...getRootProps()}
        />
        <div className="card-body">
          <h5 className="card-title mb-0">
            {product?.productName.substring(0, 12)}...
          </h5>
          <p className="card-text lead fw-bold">$ {product.price}</p>
          <button onClick={() => deletePopularProduct(product.productId)}>
            DELETE
          </button>
        </div>
      </div>
    );
  }

  const renderPopulars = () => {
    return (
      <>
        {popularProductList.map((blog) => (
          <React.Fragment key={blog.blogId}>
            <div
              className="col-md-3 mb-4"
              style={{ height: "300px", width: "250px" }}
            >
              <MyDropzone {...blog} />
            </div>
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      <hr />
      <Form onSubmit={handleSubmit} className="row">
        {/* PRODUCT NAME */}
        <Form.Group controlId="formProductName" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            isInvalid={invalidProductName}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please input a product name
          </Form.Control.Feedback>
        </Form.Group>

        {/* PRODUCT PRICE */}
        <Form.Group controlId="formPrice" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isInvalid={invalidPrice}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Price must be a number
          </Form.Control.Feedback>
        </Form.Group>

        {/* TYPE */}
        <Form.Group controlId="formType" className="w-50">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="topRated">Top Rated</option>
            <option value="bestSelling">Best Selling</option>
            <option value="onSale">On Sale</option>
          </Form.Select>
        </Form.Group>

        <div className="col-12 d-flex flex-wrap justify-content-center">
          <button
            className="bg-primary text-center text-white w-50"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
      </Form>
      <hr />
      <div className="row justify-content-center">{renderPopulars()}</div>
    </>
  );
}
