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

import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { SIGNUP_USER } from "../Constants/apis";
import { useDispatch } from "react-redux";
import { SET_USER_DETAILS } from "../store/types";
import { LoginPage } from "../Components";
import swal from "sweetalert";

function Signup() {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordMask, setPasswordMask] = useState(true);

  const [loginVariable, setLoginVariable] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const signupUser = async (user) => {
    try {
      const data = await axios.post(SIGNUP_USER, user);
      if (data?.data?.success) {
        if (data?.data?.newUser) {
          dispatch({ type: SET_USER_DETAILS, payload: data.data.data });

          swal("Congratulations", "User Signup was successful", "success");
          history.push("/");
        } else {
          dispatch({
            type: SET_USER_DETAILS,
            payload: data?.data?.existingData,
          });
          // console.log(data?.data?.existingData);
          swal(
            "Welcome back " + data?.data?.existingData?.username,
            "",
            "success"
          );
          history.push("/");
        }
      } else {
        swal(
          "Error in Sign up",
          data?.data?.message || "unknown Error",

          "error"
        );
      }
    } catch (error) {
      // console.log(error);
      swal(
        "Error in Sign up",
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          "unknown Error",
        "error"
      );
      // swal(err?.message)
    }
  };

  const authAndLoginWithEmail = () => {
    if (!username || !email || !password || !passwordConfirmation) {
      swal("", "Please enter enter all info correctly", "error");
      return;
    } else if (password !== passwordConfirmation) {
      swal("", "Password and Password Confirmation should be same", "error");
      return;
    }
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      swal("", "Please enter a valid email", "error");

      return;
    }
    const passwordHash = password;
    const newUser = {
      username,
      email,
      loginType: "email",
      passwordHash,
      status: "normal",
    };
    signupUser(newUser);
    // console.log(newUser);
  };

  const sigupWithFacebook = (user) => {
    console.log("fb return-->", user);
    const newUser = {
      username: user.name,
      id: user.id,
      email: user.email,
      loginType: "facebook",
      imageUrl: user.picture.data.url,
      status: "normal",
    };
    signupUser(newUser);
    // console.log(newUser);
  };
  const sigupWithGoogle = (e) => {
    console.log("google return--->", e);
    const user = e.profileObj;
    const newUser = {
      username: user.name,
      id: user.googleId,
      email: user.email,
      loginType: "google",
      imageUrl: user.imageUrl,
      status: "normal",
    };
    signupUser(newUser);
  };
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
      color: !passwordMask
        ? theme.palette.primary.main
        : theme.palette.text.secondary,
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
        {/* Image */}
        <Grid item xs={6} className={classes.sideImageContainer}>
          <img
            className={classes.sideImage}
            src="https://thumbs.dreamstime.com/z/online-store-vertical-banner-copy-space-vertical-banner-copy-space-people-characters-shopping-buying-goods-143197645.jpg"
          />
        </Grid>
        {/*  Sign up form*/}
        {loginVariable ? (
          <LoginPage setLoginVariable={setLoginVariable} />
        ) : (
          <Grid item xs={6}>
            {/* Login Option */}
            <Typography variant="subtitle2" className={classes.text}>
              <Box fontWeight="light" textAlign="right">
                Already have an account?
                <span
                  onClick={() => setLoginVariable(true)}
                  className={classes.link}
                >
                  Login
                </span>
              </Box>
            </Typography>
            {/* Main Form */}
            <Typography variant="h5" className={[classes.text, classes.link]}>
              Create Account
            </Typography>
            <Grid item xs={12} className={classes.text}>
              <InputLabel>Username</InputLabel>
              <TextField
                variant="outlined"
                className={classes.inputMain}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputLabel>Email</InputLabel>
              <TextField
                type="email"
                variant="outlined"
                className={classes.inputMain}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* Password and confirm */}
              <Grid container>
                <Grid item md={6} sm={12} className={classes.inputSecondary}>
                  <InputLabel>Password</InputLabel>
                  <TextField
                    type={passwordMask ? "password" : "text"}
                    variant="outlined"
                    className={classes.inputMain}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <RemoveRedEye
                            // color="primary"
                            className={classes.eye}
                            onClick={() => {
                              // console.log(passwordMask);
                              setPasswordMask(!passwordMask);
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item sm={12} md={6} className={classes.inputSecondary}>
                  <InputLabel>Confirm</InputLabel>
                  <TextField
                    type={passwordMask ? "password" : "text"}
                    variant="outlined"
                    className={classes.inputMain}
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <RemoveRedEye
                            className={classes.eye}
                            onClick={() => alert(passwordMask)}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={authAndLoginWithEmail}
              >
                Create account
              </Button>
              <div
                style={{ display: "flex", margin: 20, alignItems: "center" }}
              >
                <hr className={classes.hr} />
                <p className={classes.p}>{" or "}</p>

                <hr className={classes.hr} />
              </div>
              <GoogleLogin
                className={classes.button}
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={sigupWithGoogle}
                onFailure={(e) => {
                  if (e.error == "idpiframe_initialization_failed") {
                    swal("Please Allow Cookies to login with google account");
                  }
                  swal("Failed", e.details || e.error, "error");
                  // console.log("failed", e);
                }}
                cookiePolicy={"single_host_origin"}
              />
              <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={false}
                icon={
                  <FacebookIcon style={{ padding: 10, color: "#3b5998" }} />
                }
                cssClass={classes.fb}
                fields="name,email,picture"
                onClick={(e) => e}
                callback={sigupWithFacebook}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
export default Signup;
