import { NavBar, MainPicture, ProductList, CategoryList } from "../Components";
import { Container, Grid } from "@material-ui/core";

function Home() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="stretch"
    >
      <MainPicture />
      <CategoryList />
      <ProductList />
      <button
        onClick={() => console.log(process.env.REACT_APP_NOT_SECRET_CODE)}
      ></button>
    </Grid>
  );
}
export default Home;
