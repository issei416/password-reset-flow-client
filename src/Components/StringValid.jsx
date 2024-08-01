import axios from "axios";
import React, { useEffect, useState } from "react";
import emailicon from "../assets/email-icon.png";
import passwordicon from "../assets/password-icon.png";

const StringValid = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false); 
  const baseURL = "https://password-reset-flow-server.onrender.com/api/user/";
  const redirectURL = "https://password-reset-flow-client-devit.netlify.app";
  // const baseURL = import.meta.env.VITE_backendBaseURL;
  // const redirectURL = import.meta.env.VITE_frontendRedirectURL;

  const handleSetError = (msg) => {
    setError(msg);
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (email == "" || otp == "") {
      handleSetError("Please fill all the fields");
      return;
    }
    try {
      const payload = { email, matchString: otp };
      const res = await axios.post(`${baseURL}checkstring`, payload);
      setVerified(true);
      //   setShowModal(true);
    } catch (error) {
      handleSetError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const handleSavechanges = async (e) => {
    e.preventDefault();
    if (newPassword == "" || confirmpassword == "") {
      handleSetError("Fill all the required fields");
      return;
    }
    if (newPassword !== confirmpassword) {
      handleSetError("passwords doesn't match");
      return;
    }
    try {
      const payload = { email, newPassword };
      const res = await axios.post(`${baseURL}changepassword`, payload);
      setError("");
      console.log("password changed successfully");
      window.location.href = redirectURL;
    } catch (error) {
      handleSetError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      const toastEl = document.getElementById("error-toast");
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }, [error]);

  return (
    <>
      <div className="home-page">
        <div className="p-5 border border-dark rounded form-width d-flex flex-column justify-content-center align-items-center">
          <h2 className="mb-5">Password Reset</h2>
          <form className="d-flex flex-column align-items-center gap-5 w-75 w-md-50">
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
            {!verified && (
              <div className="input-group d-flex col-12 align-items-center border border-secondary rounded">
                <label htmlFor="otp" className="col-2">
                  <img src={passwordicon} className="p-2" alt="otpicon" />
                </label>
                <input
                  type="text"
                  name="otp"
                  placeholder="OTP"
                  className="rounded fs-5 p-2 border border-0 ms-2 ms-sm-0 col-9"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
            {verified && (
              <div className="d-flex flex-column gap-5 justify-content-center align-items-center w-100">
                <div className="input-group d-flex col-12 align-items-center border border-secondary rounded">
                  <label htmlFor="newPassword" className="col-2">
                    <img
                      src={passwordicon}
                      className="p-2"
                      alt="passwordicon"
                    />
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    className="rounded fs-5 p-2 border border-0 ms-2 ms-sm-0 col-9"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="input-group d-flex col-12 align-items-center border border-secondary rounded">
                  <label htmlFor="confirmpassword" className="col-2">
                    <img
                      src={passwordicon}
                      className="p-2"
                      alt="passwordicon"
                    />
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    className="rounded fs-5 p-2 border border-0 ms-2 ms-sm-0 col-9"
                    required
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                  />
                </div>
              </div>
            )}
            {error && (
              <div
                className="toast align-items-center text-white fs-5 bg-danger border-0 w-100"
                id="error-toast"
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
            {verified && (
              <div
                className="btn btn-primary fs-5 col-12 col-sm-6 col-md-8"
                onClick={handleSavechanges}
              >
                save changes
              </div>
            )}

            {!verified && (
              <div
                className="btn btn-primary fs-5 col-12 col-sm-6"
                onClick={handleVerify}
              >
                Verify
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default StringValid;
