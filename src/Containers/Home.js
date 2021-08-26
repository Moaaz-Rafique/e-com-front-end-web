import { useEffect } from "react";
import { useState } from "react";
import { NavBar, MainPicture, ProductList } from "../Components";
import { FETCH_ALL_PRODUCTS } from "../Constants/apis";
import { useTheme } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";

function Home() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductList();
  }, []);
  const getProductList = async () => {
    await fetch(FETCH_ALL_PRODUCTS)
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container maxWidth={false} style={{ width: "90%" }}>
      <Grid container>
        <NavBar />
        <MainPicture />
        <ProductList />
      </Grid>
    </Container>
  );
}
export default Home;
