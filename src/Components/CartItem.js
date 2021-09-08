import {
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
  InputBase,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, UPDATE_CART } from "../Constants/apis";
import { SET_CART_COUNT, REMOVE_CART } from "../store/types";
import CloseIcon from "@material-ui/icons/Close";
function CartItem({ cart, calculateTotal }) {
  //   const cart = useSelector((state) => state?.cartReducer?.carts?.[cartId]);
  const dispatch = useDispatch();
  const { product } = cart;
  const [cartCount, setCartCount] = useState(cart?.count || 1);
  const updateCart = async () => {
    try {
      const updatedCart = { ...cart, count: cartCount };
      dispatch({
        type: SET_CART_COUNT,
        payload: updatedCart,
      });
      const data = await axios.post(UPDATE_CART, updatedCart);
    } catch (err) {
      console.log(err);
    }
    // console.log(data);
  };
  const removeCart = async () => {
    try {
      dispatch({ type: REMOVE_CART, payload: cart });
      let updatedCart = { ...cart, status: "removed" };
      const data = await axios.post(UPDATE_CART, updatedCart);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (cart?.count !== cartCount) {
      updateCart();
      calculateTotal();
    }
  }, [cartCount]);

  // console.log(product)
  const useStyles = makeStyles((theme) => ({
    root: {
      borderBottom: "1px solid #f0f0f0",
      //   borderLeft: "none",
      //   borderRight: "none",
      //   marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    inputBase: {
      border: "none",
      textAlign: "center !important",
      "&:focus-visible": {
        outline: "none",
      },
      "&:hover": {
        border: "none",
      },
    },

    image: {
      width: "90%",
      height: 100,
      objectFit: "contain",
    },
    imageContainer: {
      minWidth: "fit-content",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      background: "#f0f0f0",
    },
    cartParts: {
      //   borderLeft: "1px solid #f3f3f3",
      justifyContent: "center",
      padding: 10,
    },
  }));
  const classes = useStyles();
  const updateCount = (e) => {
    let newCount = e.target.value;
    if (newCount < 1 || !newCount) {
      return;
    }
    setCartCount(Math.floor(newCount));
  };
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item xs={3} sm={2}>
        <div className={classes.imageContainer}>
          <img
            src={`${BASE_URL}/images/${product?._id}/${product?.image}`}
            className={classes.image}
          />
        </div>
      </Grid>
      <Grid item xs={3} className={classes.cartParts}>
        <Typography variant="h6">{product?.title}</Typography>
      </Grid>
      <Grid item xs={6} sm={2} className={classes.cartParts}>
        <Typography variant="h6">Rs. {product?.price}</Typography>
      </Grid>
      <Grid item xs={6} sm={2} className={classes.cartParts}>
        <InputBase
          type="number"
          value={cartCount}
          onChange={updateCount}
          variant="filled"
          className={classes.inputBase}
          InputProps={{
            style: {
              borderRadius: 100,
            },
            classes: { root: classes.inputBase },
          }}
        />
        {/* <TextField
        /> */}
      </Grid>
      <Grid item xs={4} sm={2} className={classes.cartParts}>
        <Typography variant="h6">Rs. {cartCount * product?.price}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Button style={{ width: "100%" }}>
          <CloseIcon onClick={removeCart} />
        </Button>
      </Grid>
      {/* <Grid item xs={12} sm={12}></Grid> */}
    </Grid>
  );
}
export default CartItem;
