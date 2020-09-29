import React from 'react';
import './Product.scss';

const Product = ({ id, title, price, image, rating }) => {
  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title">{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span role="img" aria-label="star">
                🌟
              </span>
            ))}
        </div>
      </div>
      <img src={image} alt="product" />
      <button>Add to Basket</button>
    </div>
  );
};

export default Product;
