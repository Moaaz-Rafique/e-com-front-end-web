import { Grid, makeStyles } from "@material-ui/core";

function AdminPage() {
  const useStyles = makeStyles((theme) => ({
    sideMenu: {
      height: "100vh",
      width: "100%",
      overflow: "auto",
      position: "fixed",
      boxShadow: "4px 5px " + theme.palette.primary.main,
    },
  }));
  const classes = useStyles();

  const panels = ["DashBoard", ""];

  return (
    <Grid container>
      <Grid item sm={3} md={2} className={classes.sideMenu}>
        <ul>
          <li>
            Products
            <ul>
              <li>Add new products</li>
              <li>Update products</li>
              <li>Remove products</li>
            </ul>
          </li>
          <li>
            Categories
            <ul>
              <li>Add new categories</li>
              <li>Update categories</li>
              <li>Remove categories</li>
            </ul>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
}
export default AdminPage;
