import React, { createContext, useState, useEffect } from "react";
import products from "../data/products";

// Created the context
export const myContext = createContext();

const Context = ({ children }) => {
  // cartData as product data
  const [cartData, setCartData] = useState(products);
  const [subtotal, setSubtotal] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [isCustoms, setIsCustoms] = useState({});

  // useEffect for Quantities and custom input
  useEffect(() => {
    Object.keys(cartData).forEach((id) => {
      setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: 1 }));
      setIsCustoms((prevIsCustoms) => ({ ...prevIsCustoms, [id]: false }));
    });
  }, []);
  // useEffect to recalcuate the total
  useEffect(() => {
    calculateSubtotal();
  }, [quantities]);

  // Handle select change event for quantity selection
  const handleSelectChange = (id, event) => {
    const value = event.target.value;
    if (value === "10+") {
      setIsCustoms((prevIsCustoms) => ({ ...prevIsCustoms, [id]: true }));
      setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: 10 }));
    } else {
      const quantity = parseInt(value, 10);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: Math.min(Math.max(quantity, 1), 100),
      }));
      setIsCustoms((prevIsCustoms) => ({ ...prevIsCustoms, [id]: false }));
    }
  };

  // Handle input change event for custom quantity input
  const handleInputChange = (id, event) => {
    const value = event.target.value;
    const quantity = parseInt(value, 10) || 1;
    if (quantity > 100) {
      document
        .getElementById(`limit-${id}`)
        .classList.remove("visually-hidden");
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: 100,
      }));
    } else {
      document.getElementById(`limit-${id}`).classList.add("visually-hidden");
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: Math.min(Math.max(quantity, 1), 100),
      }));
    }
  };

  // Calculate the subtotal based on the quantities and prices of the products
  const calculateSubtotal = () => {
    let newSubtotal = 0;
    Object.keys(cartData).forEach((id) => {
      const quantity = quantities[id] || 0;
      const price = cartData[id].price;
      newSubtotal += quantity * price;
    });
    setSubtotal(newSubtotal);
  };

  // Handle remove event for removing a product from the cart
  const handleRemove = (id) => {
    setCartData((prevCartData) => {
      const newCartData = { ...prevCartData };
      delete newCartData[id];
      return newCartData;
    });
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[id];
      return newQuantities;
    });
    setIsCustoms((prevIsCustoms) => {
      const newIsCustoms = { ...prevIsCustoms };
      delete newIsCustoms[id];
      return newIsCustoms;
    });
  };
  return (
    <myContext.Provider
      value={{
        cartData,
        setCartData,
        subtotal,
        setSubtotal,
        quantities,
        setQuantities,
        isCustoms,
        setIsCustoms,
        calculateSubtotal,
        handleRemove,
        handleSelectChange,
        handleInputChange,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default Context;
