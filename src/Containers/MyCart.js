import {
  Button,
  Grid,
  InputBase,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../Components";
import { GET_CURRENT_CART } from "../Constants/apis";
import { SET_CARTS } from "../store/types";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router";

function MyCart() {
  // const user={
  //     _id: "6123a3b8b1094424685248cc",
  //     name: "Guest User",
  //   }
  const user = useSelector((state) => state?.userReducer?.user_details);
  const myCart = useSelector((state) => state.cartReducer.carts);
  //   const [myCart, setMyCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [Total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push("/login");
      alert("You have to login to view your cart");
      return;
    }
    getMyCart();
    // calculateTotal();
  }, []);
  const calculateTotal = () => {
    let currentSubTotal = 0;
    for (let cart of myCart) {
      currentSubTotal += cart?.count * cart?.product?.price;
    }
    setSubTotal(currentSubTotal);
    let currentShipping = Math.floor(currentSubTotal * 0.04);
    setShipping(currentShipping);
    setTotal(currentSubTotal + currentShipping);
  };
  useEffect(() => {
    calculateTotal();
  }, [myCart]);
  const getMyCart = async () => {
    const cartFor = { user: user?._id };
    const data = await axios.get(GET_CURRENT_CART, { params: cartFor });
    dispatch({ type: SET_CARTS, payload: data.data.data });
    // console.log(data.data.data)
  };
  const useStyles = makeStyles((theme) => ({
    cartsContainer: {},
    root: {
      //   alignItems: "center",
      textAlign: "center",
      //   justifyContent: "center",
      //   color: theme.palette.text.secondary,
      //   background: "#eee",
    },
    text: {
      padding: 10,
      paddingTop: 20,
      color: "#eee",
      color: theme.palette.text.secondary,
      fontSize: "18px",
      border: ".1px solid #ddd",
      textAlign: "center",
      //   background: "#eee",
    },
    bottomTitles: {
      color: theme.palette.text.secondary,
      textAlign: "Right",
      padding: 20,
    },
    bottomTitle: {
      padding: "5px 0px",
      verticalAlign: "top",
    },
    sideCard: {
      background: "#fdd",
      height: "90vh",
      width: "100%",
      borderRadius: "0px 30px 30px 0px",
    },

    paymentCard: {
      background: "#fff",
      margin: "50px 10px",
      padding: 20,
      textAlign: "Left",
      borderRadius: 20,
    },
    cards: {
      height: 200,
      margin: 20,
      width: "90%",
      background: "#aaa",
      borderRadius: 10,
    },
    paymentTitles: {
      margin: "20px 10px",
    },
    table: {
      minWidth: "700px !important",
      minHeight: 300,
      maxHeight: 700,
      overflow: "auto",
    },
  }));
  const classes = useStyles();
  if (!myCart?.length) {
    return "the products you add to cart will appear hear";
  }
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={8} sm={12} className={classes.cartsContainer}>
        <Typography variant={"h4"} style={{ textAlign: "left" }}>
          Shopping Cart
        </Typography>
        <TableContainer style={{ minWidth: 300 }}>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.text}>
                  <Typography variant="h6">Image</Typography>
                </TableCell>
                <TableCell className={classes.text}>
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell className={classes.text}>
                  <Typography variant="h6">Price</Typography>
                </TableCell>
                <TableCell className={classes.text}>
                  <Typography variant="h6">Quantity</Typography>
                </TableCell>
                <TableCell className={classes.text}>
                  <Typography variant="h6">Total</Typography>
                </TableCell>
                <TableCell className={classes.text}>
                  <Typography variant="h6">Remove</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.table}>
              {myCart?.map((e, i) => {
                return (
                  <CartItem key={i} cart={e} calculateTotal={calculateTotal} />
                );
              })}
            </TableBody>

            <TableRow>
              <TableCell colSpan={4} style={{ border: "none" }} />
              <TableCell className={classes.text}>Subtotal</TableCell>
              <TableCell align="right" className={classes.text}>
                {" "}
                Rs. {subTotal}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} style={{ border: "none" }} />
              <TableCell className={classes.text}>Shipping</TableCell>
              <TableCell align="right" className={classes.text}>
                {" "}
                Rs. {shipping}
              </TableCell>
              {/* <TableCell align="right">879879</TableCell> */}
            </TableRow>

            <TableRow>
              <TableCell colSpan={4} style={{ border: "none" }} />
              <TableCell className={classes.text}>Total</TableCell>
              <TableCell align="right" className={classes.text}>
                <Typography variant="h5" color="primary">
                  Rs. {Total}
                </Typography>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>

        <Grid item xs={12} style={{ textAlign: "left" }}>
          <Button color="primary">
            <KeyboardBackspaceIcon /> Continue Shopping
          </Button>
        </Grid>
      </Grid>
      <Grid xs={12} sm={12} md={4} className={classes.sideCard}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={11} className={classes.paymentCard}>
            <Typography variant="h4">Payment Details</Typography>
            <div style={{ margin: "30px 10px" }}>
              <Typography variant="subtitle1">Card Type</Typography>
              <div className={classes.cards}></div>
            </div>
            <div className={classes.paymentTitles}>
              <Typography variant="subtitle2">Name on the card</Typography>
              <InputBase defaultValue="Zaaalim" />
            </div>

            <div className={classes.paymentTitles}>
              <Typography variant="subtitle2">Card number</Typography>
              <InputBase type="password" defaultValue="Zaaalim" />
            </div>

            <div className={classes.paymentTitles}>
              <Typography variant="subtitle2">Expiration date</Typography>
              <InputBase defaultValue="Zaaalim" />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MyCart;
