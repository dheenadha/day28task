import React, { useContext } from "react";
import { myContext } from "./Context";

const Navbar = () => {
  const { cartData } = useContext(myContext);
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-warning-subtle fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand p-2 fs-2 fw-bold" href="/">
          DummyCart <i className="fa-solid fa-cart-shopping"></i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse text-center mx-auto fs-4"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto pe-5  mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="">
                Account Details
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Orders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active fw-semibold " href="#">
                Cart ({Object.keys(cartData).length})
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
