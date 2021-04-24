import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Button,
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import { commerce } from "../../assets/lib/commerce";
import asyncAwaitHandler from "../../../src/helpers/asyncAwaitHandler";
import FormInput from "../CheckoutForm/FormInput";

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState(null);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState(null);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState(null);
  const [shippingOption, setShippingOption] = useState("");

  const countries = shippingCountries
    ? Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name,
      }))
    : [];

  const subdivisions = shippingSubdivisions
    ? Object.entries(shippingSubdivisions).map(([code, name]) => ({
        id: code,
        label: name,
      }))
    : [];

  const options = shippingOptions
    ? shippingOptions.map((option) => ({
        id: option.id,
        label: `${option.description} - ${option.price.formatted_with_symbol}`,
      }))
    : [];

  const fetchShippingCountries = async (checkoutTokenId) => {
    const [error, result] = await asyncAwaitHandler(
      commerce.services.localeListShippingCountries(checkoutTokenId)
    );

    if (!error) {
      const { countries } = result;
      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    }
  };

  const fetchShippingSubdivisions = async (countryCode) => {
    const [error, result] = await asyncAwaitHandler(
      commerce.services.localeListSubdivisions(countryCode)
    );

    if (!error) {
      const { subdivisions } = result;
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    }
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const [error, result] = await asyncAwaitHandler(
      commerce.checkout.getShippingOptions(checkoutTokenId, {
        country,
        region,
      })
    );

    if (!error) {
      setShippingOptions(result);
    }
  };

  useEffect(() => {
    if (checkoutToken?.id) {
      fetchShippingCountries(checkoutToken.id);
    }
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision, shippingCountry, checkoutToken]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />
            <FormInput name="address" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="ZIP / Postal Code" />

            <Grid item xs={12}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                fullWidth
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                fullWidth
                value={shippingSubdivision}
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                fullWidth
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
