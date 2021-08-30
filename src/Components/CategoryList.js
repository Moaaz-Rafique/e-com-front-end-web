import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { FETCH_ALL_CATEGORIES } from "../Constants/apis";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

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

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    await fetch(FETCH_ALL_CATEGORIES)
      .then((response) => response.json())

      .then((data) => {
        setCategories(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
          Item
          xs={8}
          sm={9}
          style={{
            overflow: "hidden",
            overflowX: "auto",
          }}
        >
          <Typography variant="body1">
            <Box o>
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
        <Grid Item sm={2} xs={4} style={{ textAlign: "right" }}>
          <KeyboardBackspaceIcon className={classes.arrow} />
          <KeyboardBackspaceIcon className={[classes.mirror, classes.arrow]} />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default CategoryList;
