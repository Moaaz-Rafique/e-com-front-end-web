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
    </Grid>
  );
}
export default Home;
