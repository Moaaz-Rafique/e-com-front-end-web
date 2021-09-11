import {
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useLayoutEffect } from "react";

function MainPicture() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginLeft: 20,
      marginRight: 50,
      height: size[0] > 900 ? 400 : "auto",
      background: "pink",
      boxShadow: "none",
      borderRadius: 20,
    },
    gridItem: {
      padding: 20,
      height: "100%",
    },
    filledInput: {
      padding: "10px",
      //   paddingRight: 20,
      //   paddingLeft: 20,
      width: "100%",
      fontSize: 20,
      background: theme.palette.secondary.main,
      borderRadius: 25,
      border: "none",
      borderBottom: "none",
      marginRight: "100px !important",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      width: "80%",
    },
    iconButton: {
      padding: 10,
    },
    gridImage: {
      background: "yellow",
      height: "90%",
      marginTop: 15,
      borderRadius: 10,
    },
  }));

  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Grid container className={classes.paper} alignItems="center">
        <Grid
          item
          sm={size[0] > 1300 ? 4 : size[0] > 900 ? 6 : 11}
          xs={10}
          className={classes.gridItem}
          style={{ marginRight: 30 }}
        >
          <Typography variant={size[0] > 900 ? "h4" : "h6"}>
            <Box fontWeight="fontWeightBold" p={size[0] > 800 ? 8 : 2}>
              Get The Best Products of The World <br />
              <Paper className={classes.filledInput}>
                <InputBase
                  className={classes.input}
                  placeholder="Search your favorite products"
                />
              </Paper>
            </Box>
          </Typography>
        </Grid>
        {size[0] > 900 ? (
          <>
            <Grid item sm={5} className={classes.gridItem}>
              <div className={classes.gridImage}></div>
            </Grid>
            {size[0] > 1300 ? (
              <Grid item sm={2} className={classes.gridItem}>
                <div className={classes.gridImage}></div>
              </Grid>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
}
export default MainPicture;
