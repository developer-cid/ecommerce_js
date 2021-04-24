import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@material-ui/core";

import useStyles from "../../styles/cart";
import CartItem from "../Cart/CartItem";

const Cart = ({
  cart,
  handleRemoveFromCart,
  handleUpdateCartQty,
  handleEmptyCart,
}) => {
  const classes = useStyles();
  const { line_items, subtotal } = cart;

  const cartItems = line_items?.length ? line_items : [];

  const EmptyCart = () => (
    <Typography variant="subtitle1" gutterBottom>
      You have no items in your shopping cart,
      <Link to="/" className={classes.link}>
        start adding some !
      </Link>
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cartItems.map((item, i) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal : {subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>

          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            to="/checkout"
            component={Link}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {line_items?.length ? <FilledCart /> : <EmptyCart />}
    </Container>
  );
};

export default Cart;
