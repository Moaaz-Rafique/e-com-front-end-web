import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { RemoveRedEye } from "@material-ui/icons";
import { useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import { LOGIN_USER } from "../Constants/apis";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMask, setPasswordMask] = useState(true);
  const loginHandler = () => {
    const salt = bcrypt.genSaltSync(10);
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
    const passwordHash = bcrypt.hashSync(password, salt);
    const newUser = {
      email,
      passwordHash,
    };
    loginUser(newUser);
  };
  const loginUser = async (user) => {
    try {
      const userData = await axios.post(LOGIN_USER, user);
      console.log(userData);
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
  }));

  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.text}>
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
