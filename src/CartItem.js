import React, { forwardRef } from "react";
import "./CartItem.css";
import { useStateValue } from "./StateProvider";

const CartItem = forwardRef(
  ({ index, title, price, rating, image, button }, ref) => {
    const [{ basket }, dispatcher] = useStateValue();
    const removeFromCart = () => {
      dispatcher({
        type: "REMOVE_FROM_CART",
        index: index,
      });
    };
    return (
      <div className="cartItem" ref={ref}>
        <img src={image} alt="" className="cartItem__image" />

        <div className="cartItem__right">
          <div className="cartItem__info">
            <p className="cartItem__title">{title}</p>
            <p className="cartItem__price">
              <small>₹</small>
              <strong>{price}</strong>
            </p>
            <div className="cartItem__rating">
              {Array(rating)
                .fill()
                .map((_, ind) => {
                  return <span key={ind}>⭐️</span>;
                })}
            </div>
          </div>

          <div className="cartItem__button" style={{ visibility: button }}>
            <button onClick={removeFromCart}>Remove From Cart</button>
          </div>
        </div>
      </div>
    );
  }
);

export default CartItem;
