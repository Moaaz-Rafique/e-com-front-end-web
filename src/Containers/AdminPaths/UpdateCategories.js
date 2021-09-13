import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { CategoryCard } from "../../Components";
import { FETCH_ALL_CATEGORIES } from "../../Constants/apis";
import { SET_CATEGORIES } from "../../store/types";

function EditCategories() {
  const categories = useSelector((state) => state?.categoryReducer?.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = async () => {
    try {
      const data = await axios.get(FETCH_ALL_CATEGORIES);
      // .then((response) => setAllCategories(response.data.data));
      dispatch({ type: SET_CATEGORIES, payload: data.data.data });
      console.log(data);
    } catch (err) {
      swal(
        "Error loading categories",
        err?.response?.data?.message || "unknown Error",
        "error"
      );
    }
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" color="primary">
          Update Categories
        </Typography>
        {categories.map((category, i) => {
          return <CategoryCard key={i} category={category} />;
        })}
      </Grid>
      {/* <Button onClick={() => console.log(categories)}>Console Categories</Button> */}
    </Grid>
  );
}

export default EditCategories;
