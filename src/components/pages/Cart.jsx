import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Form, ListGroup, Row, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as actionCart from "../../redux/actions/actionCart";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

export default function Cart() {
  const [total, setTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const activeUser = localStorage;
  const { getAllProductsByUser, checkOut } = bindActionCreators(
    actionCart,
    useDispatch()
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser.email) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (localStorage.email) {
      getAllProductsByUser(activeUser.email).then((response) => {
        setCartProducts(response.payload);
      });
    }
  }, []);

  useEffect(() => {
    let value = 0;
    cartProducts?.forEach((product) => {
      const productValue =
        product.price * (product.quantity ? product.quantity : 1);
      value = value + productValue;
    });
    setTotal(value);
  }, [cartProducts]);

  const cartCheckOut = (e) => {
    e.preventDefault();
    checkOut(activeUser.email).then((response) => {
      setShowModal(true);
      setCartProducts(response.payload);
    });
  };

  const closeModal = (e) => {
    e.preventDefault();
    setShowModal(false);
    window.location.reload();
  };

  const setQuantity = (productId, quantity) => {
    const newProductList = [];

    cartProducts.forEach((data) => {
      if (productId === data.productId) {
        newProductList.push({
          productId: data.productId,
          productName: data.productName,
          imageLink: data.imageLink,
          price: data.price,
          ratings: data.ratings,
          quantity: quantity,
        });
      } else {
        newProductList.push(data);
      }
    });

    setCartProducts(newProductList);
  };

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

  return (
    <div>
      <Container fluid style={{ marginTop: "120px" }}>
        <Row style={{ marginTop: "20px" }}>
          <Col xs={12} md={6}>
            <ListGroup>
              {cartProducts?.map((product) => (
                <ListGroup.Item key={product.productId}>
                  <div className="cartContainer">
                    <div className="cartImage">
                      <img
                        src={
                          product.imageLink
                            ? `http://localhost:8080/product/${product.productId}/download`
                            : "/images/empty-image.jpeg"
                        }
                        alt={product.productName}
                        width="auto"
                        height="100px"
                      />
                    </div>
                    <div className="cartProdName">
                      <h4 className="prodName">{product.productName}</h4>
                      <p className="prodPrice">Price: ${product.price}</p>
                      <div className="rating">
                        {renderRatings(product.ratings)}
                      </div>
                      <p className="prodDelivery">Fast Delivery</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <p>QTY</p>
                      <Form.Select
                        aria-label="QTY"
                        style={{ marginLeft: "10px", width: "69px" }}
                        onChange={(e) =>
                          setQuantity(product.productId, e.target.value)
                        }
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </Form.Select>
                    </div>
                    <div className="RemoveCartItem"></div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col xs={12} md={6} style={{ margin: "0px" }}>
            <div className="Cart-total">
              <h4 className="Cart-total-heading">
                Subtotal ({cartProducts ? cartProducts?.length : 0})
              </h4>
              <hr />
              <div>
                {cartProducts?.map((product) => (
                  <div
                    key={product.productId}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      {product.productName} (
                      {product.quantity ? product.quantity : 1})
                    </p>
                    <p>
                      ${" "}
                      {product.price *
                        (product.quantity ? product.quantity : 1)}
                    </p>
                  </div>
                ))}
              </div>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Total Before Tax:</p>
                <p>${total}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Shipping & Handling:</p>
                <p> $0.00</p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "bold" }}>Order Total:</p>
                <p>$ {Math.round(total)}</p>
              </div>

              <button className="btn btn-primary mt-5" onClick={cartCheckOut}>
                CHECKOUT
              </button>

              <Modal show={showModal}>
                <Modal.Header>
                  <Modal.Title className="text-dark">
                    Congratulation!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-dark">
                  Successful Checkout!
                </Modal.Body>
                <Modal.Footer>
                  <button variant="secondary" onClick={closeModal}>
                    Close
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
