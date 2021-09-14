import { NavBar, MainPicture, ProductList, CategoryList } from "../Components";
import { Container, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { SET_CURRENT_ROUTE } from "../store/types";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("weser");
    // dispatch({ type: SET_CURRENT_ROUTE, payload: "aasd" });
  }, []);
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="stretch"
    >
      <MainPicture />
      {/* <CategoryList /> */}
      <ProductList />
    </Grid>
  );
}
export default Home;
