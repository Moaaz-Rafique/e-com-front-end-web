import { Box, Button, Divider, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL, FETCH_PRODUCT } from "../Constants/apis";
import qs from "qs";
import { Typography } from "@material-ui/core";
function ProductPage() {
  const useStyles = makeStyles((theme) => ({
    image: {
      background: "#f0f0f0",
      width: "90%",
      height: "90%",
      padding: 20,
      objectFit: "contain",
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
      fontSize: 16,
      margin: 5,
      height: 50,
    },
    switchColors: {
      color: theme.palette.secondary.main,
      background: theme.palette.primary.main,
    },
    desc: {
      height: 400,
      padding: "20px 0px",
      overflow: "auto",
    },
  }));
  const classes = useStyles();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    getProductFromId();
  }, []);
  const getProductFromId = async () => {
    let query = {
      id,
    };
    try {
      const data = await axios.get(FETCH_PRODUCT + qs.stringify(query));

      console.log(data.data.data);
      setProduct(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid container direction="row" justifyContent="space-between">
      <Grid item sm={6} xs={11}>
        <div className={classes.imageDiv}>
          <img
            src={`${BASE_URL}/images/${product?._id}/${product?.image}`}
            className={classes.image}
          />
        </div>
        <div>
          <Typography variant="subtitle1">Similar Items: </Typography>
          <Grid container></Grid>
        </div>
      </Grid>
      <Divider
        orientation="vertical"
        style={{ width: 3, margin: "0px 10px", background: "#f0f0f0" }}
        flexItem
      />
      <Grid item sm={5} xs={11}>
        <Typography variant="h1" className={classes.text}>
          <Box>{product?.title}</Box>
        </Typography>
        <Typography
          variant="subtitle2"
          className={[classes.text, classes.desc]}
        >
          {product?.description}
        </Typography>
        <Typography variant="h3" className={classes.text} color="primary">
          <Box>Rs. {product?.price}</Box>
        </Typography>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Button variant="outlined" className={classes.button}>
            Buy Now
          </Button>
          <Button
            variant="outlined"
            className={[classes.button, classes.switchColors]}
          >
            Add to basket
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}
export default ProductPage;
