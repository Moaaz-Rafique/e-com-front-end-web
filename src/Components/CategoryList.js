import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { FETCH_ALL_CATEGORIES } from "../Constants/apis";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useSelector, useDispatch } from "react-redux";
import { SET_CATEGORIES } from "../store/types";
import axios from "axios";

function CategoryList() {
  const useStyles = makeStyles((theme) => ({
    mirror: {
      transform: "scaleX(-1)",
    },
    arrow: {
      fontSize: 30,
      //   transform: "scaleY(1.5)",
      color: theme.palette.text.primary,
    },
  }));
  const classes = useStyles();

  const categories = useSelector((state) => state.categoryReducer.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    try {
      const data = await axios.get(FETCH_ALL_CATEGORIES);
      dispatch({ type: SET_CATEGORIES, payload: data.data.data });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid item xs={12}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        style={{ margin: 15, marginBottom: -5 }}
      >
        <Grid
          item
          xs={8}
          sm={9}
          style={{
            overflow: "hidden",
            overflowX: "auto",
          }}
        >
          <Typography variant="body1">
            <Box>
              {categories.map((category, i) => {
                return (
                  <span key={i} style={{ padding: 25 }}>
                    {category.title}
                  </span>
                );
              })}
            </Box>
          </Typography>
        </Grid>
        <Grid item sm={2} xs={4} style={{ textAlign: "right" }}>
          <KeyboardBackspaceIcon className={classes.arrow} />
          <KeyboardBackspaceIcon className={[classes.mirror, classes.arrow]} />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default CategoryList;
