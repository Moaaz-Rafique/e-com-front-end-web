import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER } from "../store/types";
function NavBar() {
  // const currentRoute = useSelector((state) => state?.linkReducer?.currentRoute);
  const user = useSelector((state) => state?.userReducer?.user_details);
  const theme = useTheme();
  const [userMenu, setUserMenu] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
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
      height: 25,
      width: 25,
      color: theme.palette.text.primary,
      background: "none",
    },
    avatarIcon: {
      backgroundColor: "#f0f0f0",
    },
    icons: {
      padding: 10,
      minWidth: "100px",
    },
    userMenu: {
      display: "flex",
      flexDirection: "column",
      width: 100,
      // maxHeight: 200,
      position: "fixed",
      zIndex: 2,
      left: size[0] - 200,
      top: 40,
      border: "1px solid" + theme.palette.text.primary,
      borderRadius: "10px",
      backgroundColor: theme.palette.secondary.main || "#f0f0f0",
      opacity: 0.8,
      padding: 20,
      margin: 10,
      alignItems: "center",
    },
    menuLink: {
      padding: "5px 10px",
      margin: 3,
      width: "90%",
      background: "#efefef",

      color: theme.palette.text.primary,
    },
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

  const logoutUser = async (e) => {
    if (user) {
      await dispatch({ type: LOGOUT_USER });
      history.push("/");
    } else {
      history.push("/signup");
    }
  };
  const loggedInLinks = [
    {
      icon: user?.imageUrl || "",
    },
    {
      title: "My cart",
      onClick: () => {
        // alert("aaa");
        history.push("/myCart");
      },
    },
  ];
  const adminLinks = [
    {
      title: "Admin Panel",
      onClick: () => {
        history.push("/admin");
      },
    },
    {
      title: "Add Products",
      onClick: () => {
        history.push("/admin/product");
      },
    },
    {
      title: "Add Categories",
      onClick: () => {
        history.push("/admin/addCategory");
      },
    },
  ];
  useEffect(() => {
    const links = [];
    if (user) {
      links.push(...loggedInLinks);
      if (user.status == "admin") links.push(...adminLinks);
    }
    links.push({ title: user ? "Logout" : "Login", onClick: logoutUser });
    setUserMenu(links);
  }, [user]);
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
              <Avatar
                // alt={user?.username}
                // className={classes.text}
                className={classes.icon}
                src={user?.imageUrl || PersonOutlineOutlinedIcon}
                onClick={() => setShowUserMenu(!showUserMenu)}
              />
              {showUserMenu ? (
                <div
                  onMouseLeave={() => setShowUserMenu(false)}
                  onMouseEnter={() => setShowUserMenu(true)}
                  className={classes.userMenu}
                >
                  {userMenu.map((e, i) => {
                    return e?.icon ? (
                      <Avatar
                        className={classes.avatarIcon}
                        style={{ width: 50, height: 50 }}
                        src={user.imageUrl}
                        // onClick={e?.onClick}
                      />
                    ) : (
                      <div
                        key={i}
                        onClick={e?.onClick}
                        className={classes.menuLink}
                      >
                        {e.title}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default NavBar;
