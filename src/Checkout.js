import React, { useEffect } from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CartItem from "./CartItem";
import FlipMove from "react-flip-move";

function Checkout() {
  const [{ basket, user }, _] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Laptops/INTEL/LFH_Work--Banner--1500x200.jpg"
          alt=""
          className="checkout__ad"
        />

        <h6>Hello, {user?.displayName}</h6>
        <h4 className="checkout__title">Your Shopping Cart</h4>
        <div className="checkout__itemContainer">
          <FlipMove
            staggerDelayBy={150}
            appearAnimation="elevator"
            leaveAnimation="elevator"
          >
            {basket.length ? (
              basket.map((item, index) => (
                <CartItem
                  key={index}
                  index={index}
                  title={item.title}
                  image={item.image}
                  rating={item.rating}
                  price={item.price}
                  button={"visible"}
                />
              ))
            ) : (
              <h1>Cart is Empty</h1>
            )}
          </FlipMove>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
