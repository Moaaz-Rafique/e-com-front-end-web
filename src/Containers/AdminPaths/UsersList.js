import { Avatar, Button, Grid, Icon, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ALL_USER } from "../../Constants/apis";
import { SET_USERS } from "../../store/types";

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
  return (
    <Grid container>
      <Grid item xs={12}>
        {users?.map((user, i) => {
          return (
            <Grid container key={i} justifyContent="center" alignItem="center">
              <Grid item xs={1}>
                <Avatar
                  alt={user?.username}
                  src={
                    user.imageUrl ||
                    "https://cdn4.iconfinder.com/data/icons/e-commerce-181/512/477_profile__avatar__man_-512.png"
                  }
                />
              </Grid>
              <Grid item xs={3} align="center">
                <Typography>{user.username}</Typography>
              </Grid>
              <Grid item xs={4} align="center">
                <Typography>{user?.email || "email does not exist"}</Typography>
              </Grid>
              <Grid item xs={2} align="center">
                <Typography>{user?.status || "normal"}</Typography>
              </Grid>
              <Grid item xs={2} align="center">
                <Typography>{user?.loginType}</Typography>
              </Grid>
            </Grid>
          );
        })}
        <Button onClick={() => console.log("users", users)}>Users</Button>
      </Grid>
    </Grid>
  );
}

export default UsersList;
