import React, { useContext } from "react";
import { myContext } from "./Context";
import Summary from "./Summary";

const Cart = () => {
  const {
    cartData,
    quantities,
    isCustoms,
    handleRemove,
    handleSelectChange,
    handleInputChange,
  } = useContext(myContext);

  return (
    <>
      <main id="Product-details" className="container pt-5 mt-5 product-container position-relative">
        <div className="row d-flex justify-content-center mb-4">
          <h2 className="col-10 p-4"> Shopping Cart</h2>
          {/* Check if the cart is empty */}
          {cartData ? (
            Object.keys(cartData).length === 0 ? (
              <h3 className="h3 text-center py-3">Your Cart is Empty</h3>
            ) : (
              // Map over the cart data and render each product
              Object.keys(cartData).map((id) => (
                <div
                  className="col-sm-12 col-md-6 col-lg-10 col-xl-10 mb-4"
                  key={id}
                >
                  <div className="card p-3 h-100">
                    <div className="row h-auto">
                      <div className="col-sm-12 col-md-12 col-lg-2 col-xl-2 d-flex justify-content-center align-items-center">
                        <img
                          className="img-fluid product-img"
                          src={cartData[id].image}
                          alt=""
                        />
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <div className="card-body">
                          <h2 className="card-title mb-3">
                            {cartData[id].title}
                          </h2>
                          {/* Product rating */}
                          <div className="d-flex align-items-center mb-2">
                            <div className="ratings">
                              {Array.from({ length: 5 }, (_, starIndex) => (
                                <i
                                  key={starIndex}
                                  className={`fa-star ${
                                    starIndex <
                                    Math.round(cartData[id].rating.rate)
                                      ? "fas text-warning"
                                      : "far"
                                  }`}
                                ></i>
                              ))}
                            </div>
                            <span className="ms-1">
                              {cartData[id].rating.rate}
                            </span>

                            <span className="ms-2">
                              {cartData[id].rating.count} reviews
                            </span>
                          </div>

                          <p className="card-text lead mb-0">
                            {cartData[id].category}
                          </p>
                          {/* Product description accordion */}
                          <div className="accordion" id={`accordion-${id}`}>
                            <div className="accordion-item ">
                              <h2 className="accordion-header ">
                                <button
                                  className="accordion-button collapsed px-0 fw-semibold"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse-${id}`}
                                  aria-expanded="false"
                                  aria-controls={`collapse-${id}`}
                                >
                                  Product Description
                                </button>
                              </h2>
                              <div
                                id={`collapse-${id}`}
                                className="accordion-collapse collapse"
                                data-bs-parent={`accordion-${id}`}
                              >
                                <div className="accordion-body px-0">
                                  <p className="card-text">
                                    {cartData[id].description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Product quantity and price */}
                      <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 ">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-6">
                              {!isCustoms[id] ? (
                                <select
                                  className="form-select text-center "
                                  value={quantities[id]}
                                  onChange={(event) =>
                                    handleSelectChange(id, event)
                                  }
                                >
                                  {[...Array(9)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                      {i + 1}
                                    </option>
                                  ))}
                                  <option value="10+">10+</option>
                                </select>
                              ) : (
                                <input
                                  type="number"
                                  className="form-control text-center"
                                  value={quantities[id]}
                                  onChange={(event) =>
                                    handleInputChange(id, event)
                                  }
                                  min="10"
                                  placeholder="Qnty"
                                />
                              )}
                            </div>
                            <div className="col-6 text-end pt-1 pe-4 ps-0">
                              <h4>${cartData[id].price}</h4>
                            </div>
                          </div>
                          {/* Product quantity limit alert */}
                          <div
                            id={`limit-${id}`}
                            className="visually-hidden text-danger text-center alert alert-warning fw-semibold mt-3"
                            role="alert"
                          >
                            The Maximum Quantity you may purchase is 100
                          </div>
                          {/* Product Remove button */}
                          <div className="col-12 text-end mt-5">
                            <button
                              type="button"
                              className="btn rm-btn btn-link text-decoration-none "
                              onClick={() => handleRemove(id)}
                            >
                              <h5>REMOVE</h5>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row fw-semibold">
                        <hr />
                        <div className="col-6 text-secondary h5 px-3 text-start text-opacity-75">
                          <p>SUBTOTAL : </p>
                          <p> SHIPPING :</p>
                        </div>
                        <div className="col-6 fw-semibold h5 px-3 text-end">
                          <p>
                            ${(quantities[id] * cartData[id].price).toFixed(2)}
                          </p>
                          <p>FREE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
      <Summary />
    </>
  );
};

export default Cart;
