import React, { useEffect, useState } from "react";
import "./OrderPreview.css";
import { useStateValue } from "./StateProvider";
import CartItem from "./CartItem";
import FlipMove from "react-flip-move";
import CurrencyFormat from "react-currency-format";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import axios from "./axios";
import { db } from "./firebase";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "18px",
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

function OrderPreview() {
  const [{ basket, address, user }, dispatcher] = useStateValue();
  const [displayFlag, setDisplayFlag] = useState("hidden");
  const [paymentClassName, setPaymentClassName] = useState("payment__window");
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [error, setError] = useState("");
  const [disableFlag, setDisableFlag] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [pIntent, setPIntent] = useState(null);

  useEffect(() => {
    if (!basket.length) {
      history.replace("/");
    }
    const basketTotal = getBasketTotal(basket);
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${basketTotal * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const getBasketTotal = (basket) =>
    basket.reduce((accumulator, item) => accumulator + Number(item.price), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayFlag("inherit");
    setPaymentClassName(paymentClassName + " animate__paymentWindow");
  };

  const goBack = (e) => {
    e.preventDefault();
    setDisplayFlag("hidden");
    setPaymentClassName("payment__window");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((paymentIntent) => {
        setSucceeded(true);
        setProcessing(false);
        setError(null);
        setPIntent(paymentIntent.paymentIntent);

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.paymentIntent.id)
          .set({
            amount: paymentIntent.paymentIntent.amount / 100,
            basket: basket,
            created: paymentIntent.paymentIntent.created,
            address: address,
          });

        dispatcher({
          type: "CLEAR_CART",
          item: null,
        });

        history.replace("/orders");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleChange = (e) => {
    setDisableFlag(e.empty);
    setError(e.error);
  };

  console.log(pIntent);
  return (
    <div>
      <div className="orderPreview">
        <div className="orderPreview__addressContainer">
          <h2>Your Delivery Address is :</h2>
          <div className="orderPreview__address">
            <p>{address?.name}</p>
            <p>{address?.street + ", " + address?.city}</p>
            <p>{address?.state + ", " + address?.country}</p>
            <p>{"PIN : " + address?.pin}</p>
            <p>{"Contact : " + address?.mobile}</p>
          </div>
        </div>

        <div className="orderPreview__cartItemContainer">
          <h2>Products Selected :</h2>
          <div className="orderPreview__cartItems">
            <FlipMove
              staggerDelayBy={15}
              appearAnimation="fade"
              leaveAnimation="fade"
            >
              {basket.map((item, index) => (
                <CartItem
                  key={index}
                  index={index}
                  title={item.title}
                  image={item.image}
                  rating={item.rating}
                  price={item.price}
                  button={"visible"}
                />
              ))}
            </FlipMove>
          </div>
        </div>

        <div className="orderPreview__total">
          <CurrencyFormat
            renderText={(value) => (
              <>
                <h2>Total Order Amount : </h2>
                <h3>{value}</h3>
              </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Proceed to Pay</button>
        </div>

        <div className="payment" style={{ visibility: displayFlag }}>
          <div className={paymentClassName}>
            <h2>Enter Card Details</h2>
            <form className="payment__cardForm">
              <div className="payment__cardDetails">
                <CardElement options={CARD_OPTIONS} onChange={handleChange} />
              </div>
              <p>{error ? error : ""}</p>
              <button
                type="submit"
                onClick={handlePayment}
                className="payment_button"
                disabled={disableFlag || processing || succeeded}
              >
                {processing ? "Processing..." : "Pay Now"}
              </button>
              <button onClick={goBack} className="payment__goback">
                Go Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPreview;
