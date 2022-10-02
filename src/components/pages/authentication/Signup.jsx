import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Form, Modal } from "react-bootstrap";
import { auth, db } from "../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

export default function Signup() {
  const [darkMode, setDarkMode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Validation
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [userList] = useCollection(db.collection("users"));
  const [user] = useAuthState(auth);
  const activeUser = useSelector((state) => state.activeUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user || activeUser.email) {
      navigate("/");
    }
  });

  const checkIfValid = () => {
    let isValid = true;
    userList?.docs.forEach((doc) => {
      // Check if email is valid
      if (doc.data().email === email || !email) {
        isValid = false;
        setInvalidEmail(true);
      } else {
        setInvalidEmail(false);
      }
    });

    // Check if password is same with confirmPassword
    if (password !== confirmPassword || !password) {
      setInvalidPassword(true);
      isValid = false;
    } else {
      setInvalidPassword(false);
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkIfValid()) {
      db.collection("users").add({
        email: email,
        password: password,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setShowModal(true);
    }
  };

  const closeRegistration = () => {
    setShowModal(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="auth">
      <div className={`page-content${darkMode} d-flex align-items-center`}>
        <div className="container d-flex justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
            <div className={`auth-card${darkMode}`}>
              <div className="p-3 mt-3 d-flex justify-content-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs055yivZN4dfPP9jh9UmjZIx18bysfdrmRZ8vC2ebaON8ddVtMG_QiaSNwC8sooS-Ar4&usqp=CAU"
                  alt="Site Icon"
                  style={{ height: "50px" }}
                />
                <span id="brand-name" className="fw-bold fs-4 pt-3">
                  ULTRA
                </span>
              </div>
              <h5 className="text-center fst-italic">Shopping-Style-Fashion</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className={`form-control auth-input${darkMode}`}
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={invalidEmail}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    email already exist.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className={`form-control auth-input${darkMode}`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={invalidPassword}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    The password confirmation does not match
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    className={`form-control auth-input${darkMode}`}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isInvalid={invalidPassword}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    The password confirmation does not match
                  </Form.Control.Feedback>
                </Form.Group>

                <Modal show={showModal}>
                  <Modal.Header>
                    <Modal.Title className="text-dark">
                      Congratulation!
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="text-dark">
                    Successful Registration!
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      variant="secondary"
                      onClick={() => closeRegistration()}
                    >
                      Close
                    </button>
                  </Modal.Footer>
                </Modal>

                <button
                  className="btn auth-btn mt-2 mb-4 bg-secondary w-100 text-white"
                  type="submit"
                >
                  Register
                </button>
              </Form>

              <p className="text-center mb-4">
                Already have an account?
                <Link to="/login" className="text-muted">
                  Login now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        id="theme-button"
        className={`btn btn-theme${darkMode}`}
        onClick={() => setDarkMode(darkMode ? "" : "-dark")}
      >
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </button>
    </div>
  );
}
