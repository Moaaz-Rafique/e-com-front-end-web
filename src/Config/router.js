import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
      </Switch>
    </Router>
  );
}

export default AppRouter;
