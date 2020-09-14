import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login.js";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Register from "./Register";
import Address from "./Address";
import OrderPreview from "./OrderPreview";
import { stripePromise } from "./stripe";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

function App() {
  const [state, dispatcher] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatcher({
          type: "SET_USER",
          item: auth.currentUser,
        });
      } else {
        dispatcher({
          type: "SET_USER",
          item: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/orderPreview">
            <Header />
            <Elements stripe={stripePromise}>
              <OrderPreview />
            </Elements>
          </Route>
          <Route path="/getAddress">
            <Header />
            <Address />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
