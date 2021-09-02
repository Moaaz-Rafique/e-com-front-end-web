import {
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { RemoveRedEye } from "@material-ui/icons";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@material-ui/icons/Facebook";

import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [] username, setUsername] = useState()
  const useStyles = makeStyles((theme) => ({
    root: {
      boxShadow: "none",
      // backgroundColor: "#f0f0f0",
      margin: 20,
      borderRadius: 40,
      height: "80vh",
      display: "flex",
      overflow: "hidden",
    },
    sideImageContainer: {
      width: 150,
      background: "#ddd",
      // padding: 10,
      overflow: "hidden",
      display: "table-cell",
      verticalAlign: "top",
    },
    sideImage: {
      width: "100%",
      height: "100%",
    },
    text: {
      padding: "10px 30px",
    },
    inputMain: {
      width: "100%",
      padding: "10px 0px",
    },
    inputSecondary: {
      width: "48%",
      minWidth: 100,
      padding: "10px 5px",
      display: "inline-block",
    },
    link: {
      color: theme.palette.primary.main,
    },
    button: {
      color: theme.palette.secondary.main,
      width: "100%",
      minWidth: 200,
      fontSize: 16,
      margin: 5,
      height: 50,
      background: theme.palette.primary.main,
      justifyContent: "center",
      opacity: "1 !important",
      // borderRadius: 20,
    },
    hr: { flex: 1, height: 0, borderColor: theme.palette.text.secondary },
    eye: {
      color: theme.palette.text.secondary,
    },
    p: {
      color: theme.palette.text.secondary,
      padding: 10,
      fontSize: 20,
    },
    fb: {
      background: "white",
      color: "rgba(0,0,0,.54)",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      minWidth: 200,
      fontSize: 13.33,
      margin: 5,
      height: 50,
      boxShadow: "0px 2px 2px 0px",
      border: "none",
      fontFamily: "Roboto, sans-serif",
      fontWeight: 500,
    },
  }));
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={6} className={classes.sideImageContainer}>
          <img
            className={classes.sideImage}
            src="https://thumbs.dreamstime.com/z/online-store-vertical-banner-copy-space-vertical-banner-copy-space-people-characters-shopping-buying-goods-143197645.jpg"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2" className={classes.text}>
            <Box fontWeight="light" textAlign="right">
              Already have an account?
              <Link to="/login" className={classes.link}>
                Login
              </Link>
            </Box>
          </Typography>
          {/* <Grid container>
            <Grid item></Grid>
          </Grid> */}

          <Typography variant="h5" className={[classes.text, classes.link]}>
            Create Account
          </Typography>
          <Grid item xs={12} className={classes.text}>
            <InputLabel>Username</InputLabel>
            <TextField variant="outlined" className={classes.inputMain} />
            <InputLabel>Email</InputLabel>
            <TextField variant="outlined" className={classes.inputMain} />
            {/* Password and confirm */}
            <Grid container>
              <Grid item md={6} sm={12} className={classes.inputSecondary}>
                <InputLabel>Password</InputLabel>
                <TextField
                  type="password"
                  variant="outlined"
                  className={classes.inputMain}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <RemoveRedEye
                          // color="primary"
                          className={classes.eye}
                          // onClick={this.togglePasswordMask}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={12} md={6} className={classes.inputSecondary}>
                <InputLabel>Confirm</InputLabel>
                <TextField
                  type="password"
                  variant="outlined"
                  className={classes.inputMain}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <RemoveRedEye
                          className={classes.eye}
                          // onClick={this.togglePasswordMask}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button variant="outlined" className={classes.button}>
              Create account
            </Button>
            <div style={{ display: "flex", margin: 20, alignItems: "center" }}>
              <hr className={classes.hr} />
              <p className={classes.p}>{" or "}</p>

              <hr className={classes.hr} />
            </div>
            <GoogleLogin
              className={classes.button}
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={(e) => {
                console.log("success", e);
              }}
              onFailure={(e) => {
                console.log("failed", e);
              }}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              // ""
              // className={classes.button}
              icon={<FacebookIcon style={{ padding: 10, color: "#3b5998" }} />}
              cssClass={classes.fb}
              autoLoad={true}
              fields="name,email,picture"
              onClick={(e) => console.log(e)}
              callback={(user) => console.log(user)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default Signup;
