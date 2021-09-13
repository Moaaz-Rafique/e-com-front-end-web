import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router";
import {
  AddCategory,
  AddProduct,
  AdminHome,
  UsersList,
  UpdateCategories,
  UpdateProduct,
} from "./AdminPaths";
import { AdminPanel } from "../Components";
import { NotFound, DeniedAccessError } from "../Extras";
import { useSelector } from "react-redux";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function AdminPage() {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    sideMenu: {
      height: "100vh",
      paddingLeft: "10px",
      width: "100%",
      overflow: "auto",
      // position: "fixed",
      // border: "4px 0px " + theme.palette.primary.main,
      // v border: 20px solid black;
      boxShadow: "inset -4px 0px" + theme.palette.primary.main,
      boxSizing: "border-box",
    },
    divider: { backgroundColor: theme.palette.primary.main },
  }));
  const classes = useStyles();

  const panels = ["DashBoard", ""];

  let { path, url } = useRouteMatch();
  const user = useSelector((state) => state?.userReducer?.user_details);
  if (user.status != "admin") {
    return <DeniedAccessError />;
  }
  return (
    <Grid container justifyContent="space-between">
      <AdminPanel />
      <Grid item xs={11} sm={9} md={10}>
        <Switch>
          <Route exact path={path} component={AdminHome} />
          <Route exact path={`${path}/product/:id?`} component={AddProduct} />
          <Route exact path={`${path}/addcategory`} component={AddCategory} />
          <Route
            exact
            path={`${path}/UpdateCategories`}
            component={UpdateCategories}
          />
          <Route
            exact
            path={`${path}/UpdateProduct`}
            component={UpdateProduct}
          />
          <Route exact path={`${path}/userlist`} component={UsersList} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
    </Grid>
  );
}
export default AdminPage;
