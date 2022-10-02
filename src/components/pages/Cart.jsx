import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [total, setTotal] = useState(0);
  const activeUser = useSelector((state) => state.activeUser);
  const navigate = useNavigate();
  const [cartProducts] = useCollection(
    activeUser?.id &&
      db
        .collection("users")
        .doc(activeUser.id)
        .collection("cart")
        .orderBy("timestamp")
  );

  useEffect(() => {
    if (!activeUser.email) {
      navigate("/");
    }
  });

  useEffect(() => {
    let value = 0;
    cartProducts?.docs.forEach((doc) => {
      value = value + doc.data().product.price;
    });
    setTotal(value);
  }, [cartProducts]);

  return (
    <div>
      <Container fluid style={{ marginTop: "120px" }}>
        <Row style={{ marginTop: "20px" }}>
          <Col xs={12} md={6}>
            <ListGroup>
              {cartProducts?.docs.map((doc) => (
                <ListGroup.Item key={doc.id}>
                  <div className="cartContainer">
                    <div className="cartImage">
                      <img
                        src={doc.data().product.image}
                        alt={doc.data().product.title}
                        width="auto"
                        height="100px"
                      />
                    </div>
                    <div className="cartProdName">
                      <h4 className="prodName">{doc.data().product.title}</h4>
                      <p className="prodPrice">
                        Price: ${doc.data().product.price}
                      </p>
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
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
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
                Subtotal ({cartProducts ? cartProducts?.docs.length : 0})
              </h4>
              <hr />
              <div>
                {cartProducts?.docs.map((doc) => (
                  <div
                    key={doc.id}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>{doc.data().product.title} (1)</p>
                    <p>$ {doc.data().product.price}</p>
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
