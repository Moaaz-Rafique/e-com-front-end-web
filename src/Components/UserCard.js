import {
  Avatar,
  Box,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { UPDATE_USER } from "../Constants/apis";

function UserCard({ user, classes, size }) {
  const [userStatus, setUserStatus] = useState("normal");
  useEffect(() => {
    setUserStatus(user?.status || "normal");
  }, [user]);
  const changeUserStatus = async (e) => {
    const newStatus = e.target.value;
    try {
      const data = await axios.post(UPDATE_USER, {
        ...user,
        id: user?._id,
        status: newStatus,
      });
      //   console.log(data);
    } catch (error) {
      swal(
        "Error updating user status",
        error?.response?.data?.message || "unknown Error",
        "error"
      );
    }
    setUserStatus(newStatus);
  };
  return (
    <Grid
      container
      className={classes.root}
      direction={size?.[0] > 950 ? "row" : "column"}
    >
      <Grid item sm={12} md={1} className={classes.text}>
        <Avatar
          alt={user?.username}
          className={classes.avatarIcon}
          src={user.imageUrl}
        />
      </Grid>
      <Grid item sm={12} md={2} className={classes.text}>
        <Typography className={classes.text}>{user.username}</Typography>
      </Grid>
      <Grid item sm={12} md={4} className={classes.text}>
        <Typography variant="body1">
          <Box className={classes.text}>
            {user?.email || "email does not exist"}
          </Box>
        </Typography>
      </Grid>
      <Grid item sm={12} md={2} className={classes.text}>
        <IconButton size="small" edge={"end"}>
          <Select
            value={userStatus}
            className={classes.text}
            onChange={changeUserStatus}
          >
            {["admin", "normal", "banned"].map((e, i) => {
              return (
                <MenuItem
                  key={i}
                  value={e}
                  // style={{ color: e.color }}
                >
                  {e}
                </MenuItem>
              );
            })}
            {/* <EditIcon fontSize="small" /> */}
          </Select>
        </IconButton>
      </Grid>
      <Grid item sm={12} md={2} className={classes.text}>
        <Typography className={classes.text}>{user?.loginType}</Typography>
      </Grid>
    </Grid>
  );
}
export default UserCard;
