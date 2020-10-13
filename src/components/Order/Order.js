import React from 'react';
import './Order.scss';
import moment from 'moment';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../state/Reducer';

const Order = ({ order }) => {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          rating={item.rating}
        />
      ))}
      <CurrencyFormat
        renderText={(value) => <h3>Order total: {value}</h3>}
        decimalScale={2}
        value={getBasketTotal(order.data.basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'Rs.'}
      />
    </div>
  );
};

export default Order;
