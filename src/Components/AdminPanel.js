import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router";

function AdminPanel() {
  const useStyles = makeStyles((theme) => ({
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
  const history = useHistory();

  return (
    <Grid item xs={1} sm={3} md={2} className={classes.sideMenu}>
      {/* EHasdkljgf yjtifd */}
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemText primary="Products" />
        </ListItem>
        <List>
          <ListItem
            button
            onClick={() => {
              history.push("/admin/product");
            }}
          >
            <ListItemText secondary="Add Products" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push("/admin/updateproduct");
            }}
          >
            <ListItemText secondary="Update Products" />
          </ListItem>
        </List>
      </List>
      <Divider className={classes.divider} />
      <List>
        <ListItem>
          <ListItemText primary="Categories" />
        </ListItem>
        <List>
          <ListItem
            button
            onClick={() => {
              history.push("/admin/addcategory");
            }}
          >
            <ListItemText secondary="Add Categories" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push("/admin/updatecategories");
            }}
          >
            <ListItemText secondary="Update Categories" />
          </ListItem>
        </List>
      </List>
      <Divider className={classes.divider} />
      <List component="nav">
        <ListItem
          button
          onClick={() => {
            history.push("/admin/userlist");
          }}
        >
          <ListItemText primary="Users" />
        </ListItem>
        {/* <List>
              <ListItem button>
                <ListItemText secondary="User List" />
              </ListItem>
            </List> */}
      </List>
    </Grid>
  );
}
export default AdminPanel;
