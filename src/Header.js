import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [state, dispatcher] = useStateValue();
  const history = useHistory();

  const handleAuthentication = () => {
    if (state.user) {
      auth.signOut();

      dispatcher({
        type: "SET_USER",
        item: null,
      });
    }
  };

  const gotoOrder = () => {
    if (state.user) {
      history.push("/orders");
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon-logo"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!state.user ? "/login" : "/"} className="header__link">
          <div className="header__option" onClick={handleAuthentication}>
            <span className="header__optionLineOne">
              Hello {state.user ? state.user.displayName : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              Sign {state.user ? "Out" : "In"}
            </span>
          </div>
        </Link>
        <div className="header__option" onClick={gotoOrder}>
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
      </div>

      <Link to="/checkout" className="header__link">
        <div className="header__optionBasket">
          <AddShoppingCartIcon className="header__cartIcon" />
          <span className="header__optionLineTwo header__basketCount">
            {state.basket?.length}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
