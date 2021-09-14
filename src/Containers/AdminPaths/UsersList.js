import { Button, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ALL_USER } from "../../Constants/apis";
import { SET_USERS } from "../../store/types";
import { UserCard } from "../../Components";

function UsersList() {
  const users = useSelector((state) => state?.userReducer?.users);
  const dispatch = useDispatch();
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const data = await axios.get(FETCH_ALL_USER);
    dispatch({ type: SET_USERS, payload: data.data.data });
    // console.log(users);
  };
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
      margin: "10px 0px",
    },
    avatarIcon: {
      backgroundColor: "#f0f0f0",
    },
    text: {
      // height: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // color: theme.palette.primary.main,
    },
  }));
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" alignItem="center">
      <Grid item xs={12}>
        {users?.map((user, i) => {
          return <UserCard key={i} user={user} classes={classes} size={size} />;
        })}
        {/* <Button onClick={() => console.log("users", users)}>Users</Button> */}
      </Grid>
    </Grid>
  );
}

export default UsersList;
