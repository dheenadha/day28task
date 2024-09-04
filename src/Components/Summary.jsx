import React, { useContext } from "react";
import { myContext } from "./Context";

const Summary = () => {
  const { subtotal } = useContext(myContext);

  const handlePlaceOrder = () => {
    if (subtotal > 0) {
      alert("Order placed successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert("Please add items to your cart before placing an order.");
    }
  };

  return (
    <>
      <section id="Order-placement" className="container sticky-div ">
        <div className="row py-2  fw-bold bg-white d-flex justify-content-center align-items-center">
          <hr />
          <div className="col-5 text-start ">
            <h2 className="total">Total : </h2>
          </div>
          <div className="col-5 text-end ">
            <h2>$ {subtotal.toFixed(2)}</h2>
            <button
              type="button"
              className="btn btn-warning"
              disabled={subtotal === 0}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Summary;
