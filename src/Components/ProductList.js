import { Grid } from "@material-ui/core";
import { Card, Paper } from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { ProductCard } from ".";
import { FETCH_ALL_PRODUCTS } from "../Constants/apis";
import NetworkError from "../Extras/NetworkError";
import { SET_PRODUCT_LIST } from "../store/types";
function ProductList() {
  const products = useSelector((state) => state.productReducer.product_list);
  const dispatch = useDispatch();
  const [networkError, setNetworkError] = useState(false);
  useEffect(() => {
    getProductList();
  }, []);
  const getProductList = async () => {
    try {
      const data = await axios.get(FETCH_ALL_PRODUCTS);
      dispatch({ type: SET_PRODUCT_LIST, payload: data?.data?.data }); // console.log(data.data);
    } catch (error) {
      if (!error.response) {
        // network error
        setNetworkError(true);
      } else {
        // this.errorStatus = error.response.data.message;
        swal("", error?.response?.data?.message || "unknown Error", "error");
      }
    }
  };
  if (networkError) {
    return <NetworkError />;
  }
  return (
    <Grid item xs={12}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        style={{ margin: 15 }}
      >
        {products?.map((product, i) => {
          return <ProductCard key={i} product={product} />;
        })}
      </Grid>
    </Grid>
  );
}
export default ProductList;
