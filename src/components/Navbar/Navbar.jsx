import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";

import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/img/logo_shopping.svg";
import useStyles from "../../styles/navBar";

const NavBar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Shopping"
              height="25px"
              className={classes.image}
            />
            Shopping
          </Typography>
          <div className={classes.grow}></div>
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                aria-label="Show cart items"
                component={Link}
                to="/cart"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
