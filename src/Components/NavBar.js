import { Icon, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER } from "../store/types";
function NavBar() {
  // const currentRoute = useSelector((state) => state?.linkReducer?.currentRoute);
  const user = useSelector((state) => state?.userReducer?.user_details);
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: 10,
      background: theme.palette.secondary.main,
      height: "100px",
      padding: 25,
      minWidth: 300,
    },
    links: {
      padding: 10,
    },
    link: {
      padding: 20,
      textDecoration: "none",
      color: theme.palette.text.primary,
    },
    icon: {
      //   padding: "14px",
      color: theme.palette.text.primary,
    },
    icons: {
      padding: 10,
      minWidth: "100px",
    },
    // paper: {
    //   padding: 100,
    //   color: theme.palette.text.secondary,
    //   padding: theme.spacing(2),
    // },
  }));
  const classes = useStyles();
  const navLinks = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Products",
      route: "/products",
    },
    // {
    //   name: user ? "Logout" : "Login",
    //   route: "/login",
    // },
  ];
  const navButtons = [
    { icon: <SearchIcon /> },
    { icon: <ShoppingCartOutlinedIcon />, link: "/mycart" },
  ];
  const history = useHistory();
  const dispatch = useDispatch();
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const logoutUser = async (e) => {
    if (user) {
      await dispatch({ type: LOGOUT_USER });
      history.push("/");
    } else {
      history.push("/signup");
    }
  };
  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={6} md={4} lg={6}>
          <Typography
            variant="h4"
            style={{ minWidth: 105 }}
            onClick={() => history.push("/")}
          >
            <span style={{ color: theme.palette.primary.main }}>E</span>-shop
          </Typography>
        </Grid>
        {/* {size[0] > 1000 ? (
          <Grid item md={4} lg={4} className={classes.links}>
            {navLinks.map((e, i) => {
              return (
                <Link key={i} to={e.route} className={classes.link}>
                  {e.name}
                </Link>
              );
            })}
          </Grid>
        ) : (
          ""
        )} */}

        {user?.status == "admin" ? (
          <Grid item>
            <Link to="/admin">Admin Page</Link>
          </Grid>
        ) : null}
        <Grid item xs={5} md={4} lg={2} className={classes.icons}>
          <Grid container justifyContent="space-around">
            {navButtons.map((e, i) => {
              return (
                <Grid key={i} item>
                  <Link to={e.link || "#"} className={classes.icon}>
                    {e.icon}
                  </Link>
                </Grid>
              );
            })}

            <Grid item>
              <PersonOutlineOutlinedIcon onClick={logoutUser} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default NavBar;
