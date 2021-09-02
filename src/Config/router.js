import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar, ProductList } from "../Components";
import AddCategory from "../Containers/AddCategory";
import AddProduct from "../Containers/AddProduct";
import Home from "../Containers/Home";
import LoginPage from "../Containers/login";
import ProductPage from "../Containers/ProductPage";
import Signup from "../Containers/Signup";

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
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Container>
    </Router>
  );
}

export default AppRouter;
