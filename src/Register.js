import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";
import { auth } from "./firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const registerUser = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        if (authUser) {
          alert("Registration Successful");
        }
        auth.currentUser.updateProfile({
          displayName: name,
        });
        auth.signOut();
        history.push("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const gotoSignIn = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <div className="register">
      <Link to="/">
        <img
          src="https://cdn.freebiesupply.com/images/large/2x/amazon-logo-transparent.png"
          alt=""
          className="register__logo"
        />
      </Link>

      <div className="register__container">
        <h1>Sign up</h1>

        <form>
          <h5>Name</h5>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="register__inputName"
          />
          <h5>E-mail</h5>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="register__inputEmail"
          />

          <h5>Password</h5>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="register__inputPassword"
          />

          <p>
            By continuing, you agree to Amazon fake clone Conditions of Use and
            Privacy Notice.
          </p>

          <button onClick={registerUser} className="register__createAccount">
            Create your Amazon Account
          </button>
        </form>

        <button onClick={gotoSignIn} className="login__signinButton">
          Go back to Sign in
        </button>
      </div>
    </div>
  );
}

export default Register;
