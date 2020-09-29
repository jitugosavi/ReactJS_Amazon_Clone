import React from 'react';

import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <img
        className="header__logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt="amazon"
      />
      <div className="header__searchbar">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__nav__option">
            <span className="option__LineOne">Hello Guest!</span>
            <span className="option__LineTwo">Sign In</span>
        </div>
        <div className="header__nav__option">
            <span className="option__LineOne">Returns</span>
            <span className="option__LineTwo">& Orders</span>
        </div>
        <div className="header__nav__option">
            <span className="option__LineOne">Your</span>
            <span className="option__LineTwo">Prime</span>
        </div>
        <div className="header__nav__option header__nav__optionBasket">
            <ShoppingBasketIcon />
            <span className="option__LineTwo option__BasketCount">0</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
