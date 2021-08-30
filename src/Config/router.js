import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar, ProductList } from "../Components";
import AddCategory from "../Containers/AddCategory";
import AddProduct from "../Containers/AddProduct";
import Home from "../Containers/Home";
import ProductPage from "../Containers/ProductPage";

function AppRouter() {
  return (
    <Router>
      <Container maxWidth={false} style={{ width: "90%" }}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/admin/addproduct" component={AddProduct} />
          <Route exact path="/admin/addcategory" component={AddCategory} />
          <Route exact path="/product/:id" component={ProductPage} />
        </Switch>
      </Container>
    </Router>
  );
}

export default AppRouter;
