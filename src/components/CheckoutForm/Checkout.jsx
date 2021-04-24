import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  // CircularProgress,
  // Divider,
  // Button,
} from "@material-ui/core";

import { commerce } from "../../assets/lib/commerce";
import asyncAwaitHandler from "../../../src/helpers/asyncAwaitHandler";

import useStyles from "../../styles/checkout";
import PaymentForm from "./PaymentForm";
import AddressForm from "./AddressForm";

const steps = ["Shipping address", "Payment Details"];

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [checkoutToken, setCheckoutToken] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      const [error, token] = await asyncAwaitHandler(
        commerce.checkout.generateToken(cart.id, { type: "cart" })
      );
      console.log(
        "🚀 ~ file: Checkout.jsx ~ line 31 ~ generateToken ~ token",
        token
      );

      if (!error) {
        setCheckoutToken(token);
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevState) => prevState + 1);
  const backStep = () => setActiveStep((prevState) => prevState - 1);

  const next = (data) => {
    console.log("🚀 ~ file: Checkout.jsx ~ line 46 ~ next ~ data", data);
    setShippingData(data);
    nextStep();
  };

  const Form =
    activeStep === 0
      ? checkoutToken && (
          <AddressForm checkoutToken={checkoutToken} next={next} />
        )
      : checkoutToken && (
          <PaymentForm
            shippingData={shippingData}
            checkoutToken={checkoutToken}
          />
        );
  const ConfirmationForm = () => <div>Confirmation Form</div>;

  return (
    <div>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? <ConfirmationForm /> : Form}
        </Paper>
      </main>
    </div>
  );
};

export default Checkout;
