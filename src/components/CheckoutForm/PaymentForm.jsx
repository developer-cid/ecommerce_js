import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const REACT_STRIPE_PUBLIC_KEY =  process.env.REACT_STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(REACT_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, shippingData, backStep }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const {
        firstName,
        lastName,
        email,
        address1,
        city,
        shippingSubdivision,
        zip,
        shippingCountry,
        shippingOption,
      } = shippingData;

      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: firstName,
          lastname: lastName,
          email,
        },
        shipping: {
          name: "Primary",
          street: address1,
          town_city: city,
          county_state: shippingSubdivision,
          postal_zip_code: zip,
          country: shippingCountry,
        },
        fullfilment: { shipping_method: shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
    }
  };
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography
        gutterBottom
        variant="h6"
        style={{ margin: "20px 0" }}
      ></Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={handleSubmit}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
