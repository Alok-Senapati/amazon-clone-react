import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault(); // prevents page from refreshing;

    // Firebase code to SignIn
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const register = (e) => {
    e.preventDefault(); //prevents page from refreshing.
    history.push("/register");
    // Firebase code to register
    /*auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));*/
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://cdn.freebiesupply.com/images/large/2x/amazon-logo-transparent.png"
          alt=""
          className="login__logo"
        />
      </Link>

      <div className="login__container">
        <h1>Sign in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login__inputEmail"
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login__inputPassword"
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signinButton"
          >
            Sign in
          </button>
        </form>

        <p>
          By continuing, you agree to Amazon fake clone Conditions of Use and
          Privacy Notice.
        </p>

        <button onClick={register} className="login__createAccount">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
