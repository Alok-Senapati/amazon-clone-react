import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Address.css";
import { useStateValue } from "./StateProvider";

function Address() {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pin, setPin] = useState("");
  const [mobile, setMobile] = useState("");
  const history = useHistory();

  const [_, dispatcher] = useStateValue();

  const validateAddress = (e) => {
    e.preventDefault();
    if (
      [name, street, city, state, country, pin, mobile].some(
        (element) => element === ""
      )
    ) {
      alert("Please fill all the mandatory fields");
    } else if (!pin.match(/^[0-9]+$/)) {
      alert("PIN can contain only numeric value");
    } else if (!mobile.match(/^[+0-9][0-9 ]+[0-9]$/)) {
      alert("Invalid Phone Number");
    } else {
      dispatcher({
        type: "SET_ADDRESS",
        item: {
          name: name,
          street: street,
          city: city,
          state: state,
          country: country,
          pin: pin,
          mobile: mobile,
        },
      });
      history.replace("/orderPreview");
    }
  };

  return (
    <div className="address">
      <form className="address__form">
        <h1>Provide Your Address</h1>
        <input
          type="text"
          className="address__formInput"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="address__formInput"
          placeholder="Street / Scoiety"
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          className="address__formInput"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          className="address__formInput"
          placeholder="State"
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          className="address__formInput"
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <div>
          <input
            type="text"
            className="address__formInput"
            placeholder="PIN Code"
            onChange={(e) => setPin(e.target.value)}
          />
          <input
            type="text"
            className="address__formInput"
            placeholder="Mobile Number"
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <button type="submit" onClick={validateAddress}>
          Preview your Order
        </button>
      </form>
    </div>
  );
}

export default Address;
