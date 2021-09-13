import { Grid, Typography, makeStyles } from "@material-ui/core";

function AdminHome() {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: 10,
    },
    heading: {
      textAlign: "center",
    },
  }));
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Grid item xs={12} className={classes.root}>
        <Typography variant="h3" color="primary" className={classes.heading}>
          Admin Home
        </Typography>
        {/* <Typography variant="h5">Products</Typography>
        <Typography variant="h5">Categories</Typography>
        <Typography variant="h5">Users</Typography> */}
        <Typography>
          This is your admin page. Please use the admin panel to perform your
          tasks.
        </Typography>
      </Grid>
    </Grid>
  );
}
export default AdminHome;
