import React from 'react';
import './Subtotal.scss';

import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../../state/StateProvider';

const Subtotal = () => {
    const [ {basket}, dispatch] = useStateValue();
    const total = basket.reduce((acc, prod) => acc + prod.price, 0);
    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal {basket.length} items: <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={total}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rs.'}
            />
            <button>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal
