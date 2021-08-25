import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddCategory from "../Containers/AddCategory";
import AddProduct from "../Containers/AddProduct";
import Home from "../Containers/Home";

function Products() {
  return <p>dash</p>;
}
function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/DashBoard" component={Products} />
        <Route exact path="/admin/addproduct" component={AddProduct} />
        <Route exact path="/admin/addcategory" component={AddCategory} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
