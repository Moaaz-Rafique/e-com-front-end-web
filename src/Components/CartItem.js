import {
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
  InputBase,
  Button,
  TableRow,
  TableCell,
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
      backgroundColor: "red",
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
      height: 50,
      objectFit: "contain",
      background: "#f0f0f0",
    },
    imageContainer: {
      minWidth: "fit-content",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    cartParts: {
      //   borderLeft: "1px solid #f3f3f3",
      justifyContent: "center",
      padding: 10,
    },
    row: {
      border: "none",
    },
    text: {
      border: ".1px solid #eee",
      textAlign: "center",
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
    <TableRow className={classes.row}>
      <TableCell className={classes.text}>
        <div className={classes.imageContainer}>
          <img
            src={product?.image}
            className={classes.image}
          />
        </div>
      </TableCell>
      <TableCell align="right" className={classes.text}>
        {product?.title}
      </TableCell>
      <TableCell align="right" className={classes.text}>
        Rs. {product?.price}
      </TableCell>
      <TableCell align="right" className={classes.text}>
        <InputBase
          type="number"
          className="f1"
          value={cartCount}
          onChange={updateCount}
        />
      </TableCell>
      <TableCell align="right" className={classes.text}>
        Rs. {cartCount * product?.price}
      </TableCell>
      <TableCell align="right" className={classes.text}>
        <Button style={{ width: "100%" }}>
          <CloseIcon onClick={removeCart} />
        </Button>
      </TableCell>
    </TableRow>
  );
}
export default CartItem;
