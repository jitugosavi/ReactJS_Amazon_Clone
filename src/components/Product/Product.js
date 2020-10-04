import React from 'react';
import { useStateValue } from '../../state/StateProvider';
import './Product.scss';

const Product = ({ id, title, price, image, rating }) => {
  const [{ basket }, dispatch] = useStateValue();

  console.log('basket ', basket);

  const addToBasket = () => {
      // Dispatch item to data layer
      dispatch({
        type: 'ADD_TO_BASKET',
        item: {
            id,
            title,
            price,
            image,
            rating
        }
      });
  }
  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title">{title}</p>
        <p className="product__price">
          <small>Rs.</small>
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
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
