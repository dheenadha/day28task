import React from "react";
import Context from "./Components/Context";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import "./App.css";

const App = () => {
  return (
    <>
      <Context>
        <Navbar />
        <Cart />
      </Context>
      <Footer />
    </>
  );
};

export default App;
