import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const [{ basket, user }, dispather] = useStateValue();
  const history = useHistory();

  const getBasketTotal = (basket) => {
    return basket.reduce(
      (accumulator, basketItem) => accumulator + Number(basketItem.price),
      0
    );
  };

  const getAddress = () => {
    if (basket.length > 0 && user) {
      history.push("/getAddress");
    } else if (!user) {
      history.push("/login");
    } else {
      alert("Please add products to card before proceeding");
    }
  };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button onClick={getAddress}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
