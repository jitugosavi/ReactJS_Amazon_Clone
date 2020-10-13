import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../state/StateProvider';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import './Payment.scss';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../state/Reducer';
import axios from '../../axios';
import { db } from '../../firebase';

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecrete, setClientSecrete] = useState(true);
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getClientSecrete = async () => {
      if (getBasketTotal(basket) <= 0) {
        return;
      }

      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });

      setClientSecrete(response.data.clientSecrete);
    };

    getClientSecrete();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecrete, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        dispatch({
          type: 'CLEAR_BASKET',
        });

        history.replace('/orders');
      });
  };

  const handleChange = (e) => {
    // Listen for card changes
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout <Link to="/checkout"> {basket.length} items</Link>
        </h1>
        <section className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Baner, Mhalunge</p>
            <p>Pune - 411045</p>
            <tel>+91-9808080808</tel>
          </div>
        </section>

        <section className="payment__section">
          <div className="payment__title">
            <h3>Review items</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </section>

        <section className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payemnt__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rs.'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>
              {error && <div className="payment__error">{error}</div>}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payment;
