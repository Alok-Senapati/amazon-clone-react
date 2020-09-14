import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";
import OrderItems from "./OrderItems";
import "./Orders.css";
import { useStateValue } from "./StateProvider";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }, dispatcher] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((element) => ({
              id: element.id,
              data: element.data(),
            }))
          );
        });
    }
  }, [user]);
  return (
    <div>
      <h2>
        {!orders.length ? "You don't have any Orders" : "Your Orders are:"}
      </h2>
      {orders.map((order) => (
        <OrderItems order={order} />
      ))}
    </div>
  );
}

export default Orders;
