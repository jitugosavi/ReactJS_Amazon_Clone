import React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../state/StateProvider';
import { auth } from '../../firebase';

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const userName = user ? user.email : 'Guest';

  const handleAuthetication = () => {
    if (user) {
      auth.signOut();
    }

    dispatch({
        type: 'CLEAR_BASKET'
    })
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon"
        />
      </Link>
      <div className="header__searchbar">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div className="header__nav__option" onClick={handleAuthetication}>
            <span className="option__LineOne">Hello {userName}!</span>
            <span className="option__LineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>
        <div className="header__nav__option">
          <span className="option__LineOne">Returns</span>
          <span className="option__LineTwo">& Orders</span>
        </div>
        <div className="header__nav__option">
          <span className="option__LineOne">Your</span>
          <span className="option__LineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__nav__option header__nav__optionBasket">
            <ShoppingBasketIcon />
            <span className="option__LineTwo option__BasketCount">
              {' '}
              {basket?.length}{' '}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
