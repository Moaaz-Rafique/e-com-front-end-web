import { useEffect, useState } from "react";
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
} from "../../Constants/apis";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import swal from "sweetalert";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { ChromePicker } from "react-color";
import { NetworkError } from "../../Extras";
import { UPDATE_CATEGORY_REDUX } from "../../store/types";
function AddCategory({ category }) {
  const user = useSelector((state) => state?.userReducer?.user_details);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [networkError, setNetworkError] = useState(false);
  const [color, setColor] = useState("#000");
  const dispatch = useDispatch();
  // const [myAlert, setMyAlert] = useState("");
  useEffect(() => {
    setTitle(category?.title || "");
    setColor(category?.color || "black");
    if (user.status != "admin") {
      history.push("/");
    }
  }, []);
  const addCategory = async () => {
    if (!title) {
      swal("Title is not added", "Please add a suitable title", "error");
    }
    const article = { title, color };

    try {
      axios.post(ADD_CATEGORY, article);
    } catch (error) {
      if (!error.response) {
        // network error
        setNetworkError(true);
      } else {
        // this.errorStatus = error.response.data.message;
        swal(
          "Error adding category",
          error?.response?.data?.message || "unknown Error",
          "error"
        );
      }
    }
  };
  const updateCategory = async () => {
    if (!title) {
      swal("Title is not added", "Please add a suitable title", "error");
    }
    const article = { id: category?._id, title, color, active: true };

    try {
      const data = await axios.post(UPDATE_CATEGORY, article);
      dispatch({ type: UPDATE_CATEGORY_REDUX, payload: data.data.data });
    } catch (error) {
      if (!error.response) {
        // network error
        setNetworkError(true);
      } else {
        // this.errorStatus = error.response.data.message;
        swal(
          "Error updating category",
          error?.response?.data?.message || "unknown Error",
          "error"
        );
      }
    }
  };
  const removeCategory = async () => {
    const confirmDelete = await swal(
      "Are you sure you want to delete this category?",
      "This action cannot be undone",
      "warning"
    );
    // console.log(confirmDelete);
    if (!confirmDelete) {
      const data = await axios.post(REMOVE_CATEGORY, { id: category._id });
      // console.log(data);
    }
  };
  if (networkError) {
    return <NetworkError />;
  }
  return (
    <Grid container>
      <Grid item xs={12} style={{ padding: "10px 50px" }}>
        {!category ? (
          <Typography
            variant="h3"
            color="primary"
            style={{ textAlign: "center" }}
          >
            Add a new category
          </Typography>
        ) : null}
        <InputLabel>Title</InputLabel>
        <TextField
          error={!title}
          type="text"
          fullWidth
          // className={classes.text}
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          helperText="Enter a suitable title"
        />
        <InputLabel>Color</InputLabel>
        <ChromePicker
          disableAlpha={true}
          color={color}
          onChange={(e) => setColor(e.hex)}
          width="100%"
          style={[{ marginLeft: 1000 }]}
        />

        {category ? (
          <div style={{ paddingTop: 50 }}>
            <Button onClick={updateCategory} variant="outlined">
              Update category
            </Button>

            <Button onClick={removeCategory} variant="outlined">
              Remove category
            </Button>
          </div>
        ) : (
          <Button
            onClick={addCategory}
            variant="outlined"
            style={{ marginTop: 50 }}
          >
            Add category
          </Button>
        )}
      </Grid>
      {/* <Button onClick={() => console.log(title, color)}>Show category</Button> */}
    </Grid>
  );
}
export default AddCategory;
