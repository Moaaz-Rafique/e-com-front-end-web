import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar, ProductList } from "../Components";
import AddCategory from "../Containers/AddCategory";
import AddProduct from "../Containers/AddProduct";
import Home from "../Containers/Home";
// import {LoginPage} from "../Components";
import ProductPage from "../Containers/ProductPage";
import Signup from "../Containers/Signup";
import MyCart from "../Containers/MyCart";
import AdminPage from "../Containers/Admin";

function AppRouter() {
  return (
    <Router>
      <Container maxWidth={false} style={{ width: "90%", minWidth: 350 }}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          {/* <Route exact path="/login" component={LoginPage} /> */}
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/product/:id" component={ProductPage} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/admin/product/:id?" component={AddProduct} />
          <Route exact path="/admin/addcategory" component={AddCategory} />
          <Route exact path="/mycart" component={MyCart} />
        </Switch>
      </Container>
    </Router>
  );
}

export default AppRouter;
