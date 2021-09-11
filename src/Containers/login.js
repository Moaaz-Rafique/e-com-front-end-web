import {
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { RemoveRedEye } from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";
import { LOGIN_USER } from "../Constants/apis";
import { SET_USER_DETAILS } from "../store/types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function LoginPage({setLoginVariable}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMask, setPasswordMask] = useState(false);
  const history = useHistory();
  const loginHandler = () => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !password) {
      alert("You must enter all info correctly");
      return;
    }
    if (!re.test(email)) {
      alert("Enter Valid Mail");
      return;
    }
    const passwordHash = password;
    const newUser = {
      email,
      passwordHash,
    };
    loginUser(newUser);
  };
  const loginUser = async (user) => {
    try {
      console.log(user);
      const userData = await axios.post(LOGIN_USER, user);
      console.log(userData);
      if (userData.data.success) {
        dispatch({ type: SET_USER_DETAILS, payload: userData.data.data });
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const useStyles = makeStyles((theme) => ({
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
    button: {
      color: theme.palette.secondary.main,
      width: "100%",
      minWidth: 200,
      fontSize: 16,
      height: 50,
      background: theme.palette.primary.main,
      justifyContent: "center",
      opacity: "1 !important",
      // borderRadius: 20,
    },
    eye: {
      color: theme.palette.text.secondary,
    },
    link: {
      color: theme.palette.primary.main,
    },
  }));

  const classes = useStyles();
  return (
    <Grid item xs={6} className={classes.text}>
      <Typography variant="subtitle2" className={classes.text}>
        <Box fontWeight="light" textAlign="right">
          Don't have an account?
          <span onClick={()=>setLoginVariable(false)} className={classes.link}>
            Signup
          </span>
        </Box>
      </Typography>
      <InputLabel>Email</InputLabel>
      <TextField
        type="email"
        variant="outlined"
        className={classes.inputMain}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Password */}
      <Grid item sm={12}>
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
                    console.log(passwordMask);
                    setPasswordMask(!passwordMask);
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Button className={classes.button} onClick={loginHandler}>
        Login
      </Button>
    </Grid>
  );
}
export default LoginPage;
