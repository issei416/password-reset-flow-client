import React, { useEffect, useState } from "react";
import axios from "axios";
import usericon from "../assets/user-icon.png";
import emailicon from "../assets/email-icon.png";
import passwordicon from "../assets/password-icon.png";

const Login = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [action, setAction] = useState("Register");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const baseURL = "https://password-reset-flow-server.onrender.com/api/user/";
  // const baseURL = import.meta.env.VITE_backendBaseURL;
  //   const [showToast, setShowToast] = useState({ success: false, failure: false });

  const handleSetError = (msg) => {
    setError(msg);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };
  const handleSignup = async (e) => {
    if (action == "Register") {
      e.preventDefault();
      if (username == "" || email == "" || password == "") {
        handleSetError("Please fill all the fields");
        return;
      }
      const payload = { name: username, email, password };
      try {
        const res = await axios.post(
          `${baseURL}register`,
          payload
        );
        handleSetError("");
        //   setShowToast({ ...showToast, success: res.data.message })
        setRegistered(true);
        setTimeout(() => {
          setRegistered(false);
        }, 3000);
        setUsername("");
        setEmail("");
        setPassword("");
      } catch (err) {
        if (err.response.status !== 200) {
          handleSetError(err.response.data.message);
          // setShowToast({ ...showToast, failure: err });
        } else {
          handleSetError("An error occurred. Please try again.");
        }
      }
    } else {
      setAction("Register");
      setUsername("");
      setEmail("");
      setPassword("");
      setLoggedin(false);
      console.log(action);
    }
  };
  const handleLogin = async (e) => {
    if (action == "Login") {
      e.preventDefault();
      if (email == "" || password == "") {
        handleSetError("Please fill all the fields");
        //   setShowToast({ ...showToast, failure: error });
        return;
      }
      const payload = { email, password };
      try {
        const res = await axios.post(
          `${baseURL}login`,
          payload
        );
        handleSetError("");
        setLoggedin(true);
        setTimeout(() => {
          setLoggedin(false);
        }, 1000);
        //   setShowToast({ ...showToast, success: res.data.message })
        setEmail("");
        setPassword("");
      } catch (err) {
        setLoggedin(false);
        if (err.response.status !== 200) {
          handleSetError(err.response.data.message);
          // setShowToast({ ...showToast, failure: err });
        } else {
          handleSetError("An error occurred. Please try again.");
        }
      }
    } else {
      setAction("Login");
      setUsername("");
      setEmail("");
      setPassword("");
      setRegistered(false);
      console.log(action);
    }
  };

  const handleForgotClick = async () => {
    try {
      if (email == "") {
        handleSetError("Please enter your email");
        return;
      } else {
        console.log(email);
        const payload = { email };
        const res = await axios.post(
          `${baseURL}forgotpassword`,
          payload
        );
        setShowModal(true);
      }
    } catch (error) {
      if (error.response.status !== 200) {
        handleSetError(error.response.data.message);
      } else {
        handleSetError("An error occurred. Please try again.");
      }
    }
  };

  //   useEffect(() => {
  //     if (showToast.success) {
  //       const toastEl = document.getElementById("login-toast");
  //       const toast = new bootstrap.Toast(toastEl);
  //       toast.show();
  //       setShowToast({ ...showToast, success: false });
  //     }
  //     if (showToast.faliure) {
  //       const toastEl = document.getElementById("error-toast");
  //       const toast = new bootstrap.Toast(toastEl);
  //       toast.show();
  //       setShowToast({ ...showToast, faliure: false });
  //     }
  //   }, [showToast]);

  useEffect(() => {
    if (loggedin) {
      const toastEl = document.getElementById("login-toast");
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
    if (error) {
      const toastEl = document.getElementById("error-toast");
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
    if (registered) {
      const toastEl = document.getElementById("register-toast");
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
    if (showModal) {
      const modalEl = document.getElementById("verifyModal");
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }, [loggedin, error, registered, showModal]);
  return (
    <>
      <div className="p-5 border border-dark rounded form-width d-flex flex-column justify-content-center align-items-center">
        <h2 className="mb-5">{action}</h2>
        <form className="d-flex flex-column align-items-center gap-5 w-75 w-md-50">
          {action == "Login" ? (
            ""
          ) : (
            <div className="input-group d-flex col-12 align-items-center border border-secondary rounded">
              <label htmlFor="username" className="col-2">
                <img src={usericon} className="p-2" alt="usericon" />
              </label>
              <input
                type="text"
                name="useraname"
                placeholder="username"
                className="rounded fs-5 p-2 border border-0 ms-2 ms-sm-0 col-9"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="input-group d-flex col-12 align-items-center border border-secondary rounded">
            <label htmlFor="email" className="col-2">
              <img src={emailicon} className="p-2" alt="emailicon" />
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="rounded fs-5 p-2 border border-0 ms-2 ms-sm-0 col-9"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group d-flex col-12 align-items-center border border-secondary rounded">
            <label htmlFor="password" className="col-2">
              <img src={passwordicon} className="p-2" alt="passwordicon" />
            </label>
            <input
              type="password"
              name="password"
              placeholder="Passowrd"
              className="rounded fs-5 p-2 border border-0 ms-2 ms-sm-0 col-9"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div
              id="error-toast"
              className="toast align-items-center text-bg-danger border-0 w-100"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="d-flex">
                <div className="toast-body">{error}</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          )}
          {registered && (
            <div
              id="register-toast"
              className="toast align-items-center text-bg-success border-0 w-100"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="d-flex">
                <div className="toast-body">User Registered Successfully</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          )}
          {loggedin && (
            <div
              id="login-toast"
              className="toast align-items-center text-bg-success border-0 w-100"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="d-flex">
                <div className="toast-body">Login Successfull</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          )}
          <div className="buttons col-12 d-flex flex-column flex-md-row align-items-center justify-content-around">
            <div
              className={
                "btn col-12 mb-2 mb-md-0 col-md-5 fs-6 rounded rounded-pill" +
                (action == "Login" ? " btn-secondary" : " btn-primary")
              }
              onClick={handleSignup}
            >
              Sign Up
            </div>
            <div
              className={
                "btn col-12 mb-2 mb-md-0 col-md-5 fs-6 rounded rounded-pill" +
                (action == "Register" ? " btn-secondary" : " btn-primary")
              }
              onClick={handleLogin}
            >
              Login
            </div>
          </div>
          {action == "Login" ? (
            <p
              className="forgot-password text-decoration-underline"
              onClick={handleForgotClick}
            >
              Forgot Password?
            </p>
          ) : (
            ""
          )}
        </form>
        {showModal && (
          <div
            className="modal fade"
            id="verifyModal"
            tabIndex="-1"
            aria-labelledby="verifyModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title text-center fs-4"
                    id="verifyModalLabel"
                  >
                    Check your Email
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setShowModal(false);
                      setEmail("");
                      setPassword("");
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="fs-5">
                    A mail has been sent to your registerd mail ID. please
                    follow the redirect link provided in the mail to
                    <b> RESET</b> your password.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
