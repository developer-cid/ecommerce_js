import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "../../../styles/product";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const data = {
    image: product?.media?.source || "",
    name: product?.name || "",
    price: product?.price?.formatted_with_symbol || "",
    description: product?.description || "",
  };

  const addToCartHandler = () => onAddToCart(product.id, 1);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={data.image}
        title={data.name}
      ></CardMedia>

      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {data.name}
          </Typography>
          <Typography variant="h5">{data.price}</Typography>
        </div>
        <Typography
          variant="body2"
          color="textSecondary"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={addToCartHandler}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
