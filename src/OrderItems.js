import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import "./OrderItems.css";

function OrderItems({ order }) {
  const [address, setAddress] = useState({});

  useEffect(() => {
    setAddress(order.data.address);
  }, [order]);
  return (
    <div className="orderItem">
      <div className="orderItem__addressId">
        <div className="orderItem__addressContainer">
          <h4>Your Delivery Address is :</h4>
          <div className="orderItem__address">
            <p>{address?.name}</p>
            <p>{address?.street + ", " + address?.city}</p>
            <p>{address?.state + ", " + address?.country}</p>
            <p>{"PIN : " + address?.pin}</p>
            <p>{"Contact : " + address?.mobile}</p>
          </div>
        </div>
        <div className="orderItem__orderIdDate">
          <p>
            <strong>Order Id:</strong> {order.id}
          </p>
          <p>
            <strong>Order Date: </strong>
            {moment.unix(order.data.created).format("DD MMMM YYYY, hh:mm a")}
          </p>
        </div>
      </div>
      <div className="orderItem__items">
        {order.data.basket.map((item, index) => (
          <CartItem
            index={index}
            title={item.title}
            price={item.price}
            rating={item.rating}
            image={item.image}
            button={"hidden"}
          />
        ))}
      </div>
      <div className="orderItem__total">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <h2>Total Order Ammount : {value}</h2>
            </>
          )}
          decimalScale={2}
          value={order.data.amount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₹"}
        />
      </div>
    </div>
  );
}

export default OrderItems;
