import { Grid } from "@material-ui/core";
import { Card, Paper } from "@material-ui/core";
import { useState, useEffect } from "react";
import { ProductCard } from ".";
import { FETCH_ALL_PRODUCTS } from "../Constants/apis";
function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductList();
  }, []);
  const getProductList = async () => {
    await fetch(FETCH_ALL_PRODUCTS)
      .then((response) => response.json())

      .then((data) => {
        setProducts(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Grid item xs={12}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        style={{ margin: 15 }}
      >
        {products.map((product, i) => {
          return <ProductCard key={i} product={product} />;
        })}
      </Grid>
    </Grid>
  );
}
export default ProductList;
