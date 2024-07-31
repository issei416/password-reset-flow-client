import React from "react";
import Login from "./Login";
import { BrowserRouter, Router } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="home-page">
        <Login />
      </div>
    </>
  );
};

export default Home;
