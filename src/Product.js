import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, price, image, rating }) {
  const [{ basket }, dispatcher] = useStateValue();
  //console.log(basket);
  const addToBasket = () => {
    dispatcher({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>

        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, ind) => {
              return <span key={ind}>⭐️</span>;
            })}
        </div>
      </div>

      <img src={image} alt="" />
      <div className="product__button">
        <button onClick={addToBasket}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;
