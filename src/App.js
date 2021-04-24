import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { commerce } from "./assets/lib/commerce";
import { Navbar, Products, Cart, Checkout } from "./components";
import asyncAwaitHandler from "../src/helpers/asyncAwaitHandler";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const getProducts = async () => {
    const [error, result] = await asyncAwaitHandler(commerce.products.list());

    if (!error) {
      const { data } = result;
      setProducts(data);
    }
  };

  const getCart = async () => {
    const [error, result] = await asyncAwaitHandler(commerce.cart.retrieve());
    if (!error) {
      setCart(result);
    }
  };

  const addToCartHandler = async (productId, quantity) => {
    const [error, result] = await asyncAwaitHandler(
      commerce.cart.add(productId, quantity)
    );

    if (!error) {
      setCart(result.cart);
    }
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const [error, result] = await asyncAwaitHandler(
      commerce.cart.update(productId, { quantity })
    );

    if (!error) {
      setCart(result.cart);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    console.log(
      "🚀 ~ file: App.js ~ line 49 ~ handleRemoveFromCart ~ productId",
      productId
    );
    const [error, result] = await asyncAwaitHandler(
      commerce.cart.remove(productId)
    );

    if (!error) {
      setCart(result.cart);
    }
  };

  const handleEmptyCart = async () => {
    const [error, result] = await asyncAwaitHandler(commerce.cart.empty());

    if (!error) {
      setCart(result.cart);
    }
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={addToCartHandler} />
          </Route>

          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart={cart} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
