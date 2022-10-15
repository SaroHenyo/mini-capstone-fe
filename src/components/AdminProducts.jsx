import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionProduct from "../redux/actions/actionProduct";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function AdminProducts() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [ratings, setRatings] = useState("1");
  const [type, setType] = useState("regular");
  const [filter, setFilter] = useState("best");
  const [description, setDescription] = useState("");
  const { getAllProducts, addProduct, deleteProduct } = bindActionCreators(
    actionProduct,
    useDispatch()
  );
  const productList = useSelector((state) => state.productList);

  // Validation
  const [invalidProductName, setInvalidProductName] = useState(false);
  const [invalidPrice, setInvalidPrice] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkIfValid()) {
      const requestBody = {
        productName: productName,
        price: price,
        ratings: ratings,
        type: type,
        filter: filter,
        description: description,
      };

      addProduct(requestBody);
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

    // Check if description has an input
    if (description.match("^$|^.*@.*..*$")) {
      setInvalidDescription(true);
      isValid = false;
    } else {
      setInvalidDescription(false);
    }

    return isValid;
  };

  function MyDropzone(product) {
    // Callback function
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("file", file);

      // Upload Image
      axios
        .put(
          `http://localhost:8080/product/${product.productId}/upload`,
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
              ? `http://localhost:8080/product/${product.productId}/download`
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
          <button onClick={() => deleteProduct(product.productId)}>
            DELETE
          </button>
        </div>
      </div>
    );
  }

  const renderProducts = (type) => {
    return (
      <>
        {productList
          .filter((product) => product.type === type)
          .map((product) => (
            <React.Fragment key={product.productId}>
              <div
                className="col-md-3 mb-4"
                style={{ height: "300px", width: "250px" }}
              >
                <MyDropzone {...product} />
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

        {/* RATINGS */}
        <Form.Group controlId="formRatings" className="w-50">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setRatings(e.target.value)}
          >
            <option value="1">1 star</option>
            <option value="2">2 star</option>
            <option value="3">3 star</option>
            <option value="4">4 star</option>
            <option value="5">5 star</option>
          </Form.Select>
        </Form.Group>

        {/* TYPE */}
        <Form.Group controlId="formType" className="w-50">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="regular">Regular</option>
            <option value="special">Special</option>
          </Form.Select>
        </Form.Group>

        {/* FILTER */}
        <Form.Group controlId="formFilter" className="w-50">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="best">Best</option>
            <option value="feat">Featured</option>
            <option value="new">New</option>
          </Form.Select>
        </Form.Group>

        {/* DESCRIPTION */}
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Control
            as="textarea"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            isInvalid={invalidDescription}
          />
          <Form.Control.Feedback type="invalid">
            Please input a product description
          </Form.Control.Feedback>
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
      <h4 className="text-danger">REGULAR</h4>
      <div className="row justify-content-center">
        {renderProducts("regular")}
      </div>
      <h4 className="text-danger">SPECIAL</h4>
      <div className="row justify-content-center">
        {renderProducts("special")}
      </div>
    </>
  );
}
