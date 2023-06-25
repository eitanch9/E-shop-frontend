import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  CheckoutSteps,
  Form,
  Helmet,
  SAVE_PAYMENT_METHOD,
  Store,
  useNavigate,
} from '../Imports';

const PaymentMethodPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const navigate = useNavigate();
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'PayPal'
  );

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/place-order');
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  return (
    <div>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 />
      <div className="container small-container">
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="stripe"
              label="stripe"
              value="stripe"
              checked={paymentMethodName === 'stripe'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
