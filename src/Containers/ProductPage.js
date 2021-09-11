import {
  Box,
  Button,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ADD_CART, BASE_URL, FETCH_PRODUCT } from "../Constants/apis";
import qs from "qs";
import { Typography } from "@material-ui/core";
import { ProductCard } from "../Components";
import { useSelector, useDispatch } from "react-redux";
import { SET_PRODUCT_DETAILS, SET_SIMILAR_PRODUCTS } from "../store/types";
import swal from 'sweetalert';
 
function ProductPage() {
  const user = useSelector((state) => state.userReducer?.userDetails);
  const useStyles = makeStyles((theme) => ({
    image: {
      background: "#f0f0f0",
      width: "90%",
      height: "90%",
      padding: 20,
      objectFit: "contain",
    },
    root: {
      // display: "flex",
      // flexDirection: "row",
      // // flexWrap: "nowrap",
      // width: "fit-content",
      // justifyContent: "space-around",
      // overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
    },
    text: {
      color: theme.palette.text.primary,
    },
    imageDiv: {
      width: "100%",
      height: 500,
      // margin: 20,
    },
    button: {
      color: theme.palette.primary.main,
      width: "45%",
      minWidth: 200,
      fontSize: 16,
      margin: 5,
      height: 50,
    },
    switchColors: {
      color: theme.palette.secondary.main,
      background: theme.palette.primary.main,
    },
    desc: {
      maxHeight: 400,
      padding: "20px 0px",
      overflow: "auto",
    },
    similarGridItem: { margin: "0px" },
    category: {
      padding: 10,
    },
  }));
  const classes = useStyles();
  // const user = useSelector((state) => state.userReducer.user_details);
  const history= useHistory()
  const { id } = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector(
    (state) => state.productReducer.product_details
    );
    const product = useSelector(
      (state) => state?.productReducer?.product_details?.[id]
      );
  const similar = useSelector((state) => state?.productReducer?.similar);
  const [loading, setLoading] = useState(true);
  const [similarLoaded, setSimilarLoaded] = useState(false);
  
  const getProductFromId = async () => {
    let query = {
      id,
    };
    try {
      const data = await axios.get(FETCH_PRODUCT + qs.stringify(query));
      
      // console.log(data.data);
      // setProduct(data.data.data);
      dispatch({ type: SET_PRODUCT_DETAILS, payload: data.data.data });
      dispatch({ type: SET_SIMILAR_PRODUCTS, payload: data.data.similar });
      setLoading(false);
      setSimilarLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
  const addProductToCart = () => {
    if (!user?._id) {
      // alert("Please login to add to cart");
      swal({
        title: "You are not logged in",
        text: "Do you want to login to add product to your cart",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((goToLogin) => {
        if (goToLogin) {
          history.push('/signup')
        } 
      });
      return;
    }
    try {
      axios
      .post(ADD_CART, { product: product?._id, user: user?._id })
      .then((response) => console.log(response.data.data));
      // console.log(user)
      // axios
      //   .post(ADD_PRODUCT, myProduct)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // console.log(allProducts);
    if (!allProducts?.[id]) {
      setLoading(true);
    }
    setSimilarLoaded(false);
    getProductFromId();
  }, [id]);
  if (loading || !product) {
    return "loading product";
  }
  return (
    <Grid container direction="row" justifyContent="space-between">
      <Grid item sm={6} xs={11}>
        <div className={classes.imageDiv}>
          {product.image ? (
            <img
              src={`${BASE_URL}/images/${product?._id}/${product?.image}`}
              className={classes.image}
            />
          ) : (
            "loading image"
          )}
        </div>
      </Grid>
      <Divider
        orientation="vertical"
        style={{ width: 3, margin: "0px 10px", background: "#f0f0f0" }}
        flexItem
      />
      <Grid item sm={5} xs={11}>
        <Typography variant="h3" className={classes.text}>
          <Box>{product?.title}</Box>
        </Typography>
        <Typography
          variant="subtitle2"
          className={[classes.text, classes.desc]}
        >
          {product?.description}
        </Typography>
        <Typography variant="h5" className={classes.text} color="primary">
          <Box>Category</Box>
          <Box fontSize="16px">
            {product?.categories.map((e, i) => (
              <span className={classes.category} key={i}>
                {e.title}
              </span>
            ))}
          </Box>
        </Typography>
        <Typography variant="h5" className={classes.text} color="primary">
          <Box>Rs. {product?.price}</Box>
        </Typography>
        <div
          style={{
            width: "100%",
          }}
        >
          <Button variant="outlined" className={classes.button}>
            Buy Now
          </Button>
          <Button
            variant="outlined"
            className={[classes.button, classes.switchColors]}
            onClick={addProductToCart}
          >
            Add to Cart
          </Button>
        </div>
      </Grid>
      <Grid item sm={12} xs={11}>
        <Typography variant="subtitle1">Similar Items: </Typography>

        <Grid container className={classes.root}>
          {similarLoaded
            ? similar?.map((e, i) => {
                return (
                  <Grid
                    key={i}
                    item
                    // xs={4}
                    // sm={4}
                    className={classes.similarGridItem}
                  >
                    <ProductCard product={e} w={100} h={100} />
                  </Grid>
                );
              })
            : "LOADING SIMILAR PRODUCTS"}
        </Grid>
      </Grid>
    </Grid>
  );
}
export default ProductPage;
