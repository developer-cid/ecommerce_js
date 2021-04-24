import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import useStyles from "../../styles/cartitem";

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();
  const { id, media, name, line_total, quantity } = item;

  const handleUpdateQtyAction = (value) =>
    onUpdateCartQty(id, quantity + value);

  const handleRemoveQtyAction = () => onRemoveFromCart(id);

  return (
    <Card>
      <CardMedia image={media.source} alt={name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h5">{line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button
            size="small"
            type="button"
            onClick={() => handleUpdateQtyAction(-1)}
          >
            -
          </Button>
          <Typography>{quantity}</Typography>
          <Button
            size="small"
            type="button"
            onClick={() => handleUpdateQtyAction(1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={handleRemoveQtyAction}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
