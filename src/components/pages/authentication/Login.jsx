import React, { useEffect, useState } from "react";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { auth, facebookProvider, googleProvider } from "../../../firebase";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as actionUser from "../../../redux/actions/actionUser";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const [darkMode, setDarkMode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation
  const [invalidUser, setInvalidUser] = useState(false);

  const navigate = useNavigate();
  const { loginUser, loginUserViaProvider } = bindActionCreators(
    actionUser,
    useDispatch()
  );
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user || localStorage.email) {
      // navigate home page
      navigate("/");
    }
  }, [localStorage.email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser({ email: email, password: password })
      .then(() => {
        localStorage.setItem("email", email);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setInvalidUser(true);
      });
  };

  const facebookSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(facebookProvider)
      .then((response) => {
        loginUserViaProvider(response?.additionalUserInfo.profile.email);
        localStorage.setItem("email", email);
        navigate("/");
      })
      .catch((e) => alert(e.message));
  };

  const googleSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(googleProvider)
      .then((response) => {
        loginUserViaProvider(response?.additionalUserInfo.profile.email);
        localStorage.setItem("email", email);
        navigate("/");
      })
      .catch((error) => alert(error.message));
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
              <button
                className={`btn mt-5 mb-3 service-btn${darkMode}`}
                onClick={facebookSignIn}
              >
                <FontAwesomeIcon icon={faFacebook} />
                <span> Login with Facebook</span>
              </button>
              <button
                className={`btn mb-3 service-btn${darkMode}`}
                onClick={googleSignIn}
              >
                <FontAwesomeIcon icon={faGoogle} />
                <span> Login with Google</span>
              </button>
              <hr />

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className={`form-control auth-input${darkMode}`}
                    size="sm"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={invalidUser}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Invalid User
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className={`form-control auth-input${darkMode}`}
                    size="sm"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={invalidUser}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Invalid User
                  </Form.Control.Feedback>
                </Form.Group>

                <button
                  className="btn auth-btn mt-2 mb-4 bg-secondary w-100 text-white"
                  type="submit"
                >
                  Login
                </button>
              </Form>

              <p className="text-center mb-1">
                <a href="index.html" className="text-muted">
                  Forgot Password?
                </a>
              </p>
              <p className="text-center mb-4">
                Don't have an account?
                <Link to="/signup" className="text-muted">
                  Register here
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
