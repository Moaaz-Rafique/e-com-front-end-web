import { useEffect, useState } from "react";
import { ADD_PRODUCT, FETCH_ALL_CATEGORIES } from "../Constants/apis";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  Paper,
} from "@material-ui/core";
import DropZoneForImages from "../Components/DropZoneForImages";
import { Button } from "@material-ui/core";

function AddProduct() {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: 10,
    },
    paper: {
      padding: 100,
      color: theme.palette.text.secondary,
      padding: theme.spacing(2),
    },
    numbers: {
      width: "auto",
    },
    textArea: {
      width: "100%",
      // margin: 10,
      marginLeft: 10,
    },
    texCat: {
      width: "100%",
      //   margin: 10,
    },
    text: {
      //   marginRight: 0,

      width: "100%",
    },
  }));
  const [data, setData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [myAlert, setMyAlert] = useState(false);
  useEffect(() => {
    getAllCategories();
    console.log(allCategories);
  }, []);
  const addProduct = () => {
    const myProduct = new FormData();
    if (!selectedImage) {
      setMyAlert(true);
      return;
    }
    myProduct.append("image", selectedImage);
    myProduct.append("title", title);
    myProduct.append("price", price);
    myProduct.append("description", description);
    for (const category of productCategories) {
      myProduct.append("categories", category);
    }
    try {
      axios
        .post(ADD_PRODUCT, myProduct)
        .then((response) => setData(response.data.data));
    } catch (err) {
      console(err);
    }
  };
  const getAllCategories = () => {
    try {
      axios
        .get(FETCH_ALL_CATEGORIES)
        .then((response) => setAllCategories(response.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  const addProductCategory = () => {
    console.log(productCategories);
    setProductCategories([...productCategories, selectedCategory]);
  };
  const classes = useStyles();

  return (
    <Grid container direction="column-reverse" alignItems="center">
      <Grid item xs={12}>
        <Paper elevation={3} className={classes.paper}>
          <Grid
            container
            // xs={12}
            className={classes.root}
            style={{ margin: 0 }}
          >
            <Grid item xs={12} sm={9} className={classes.root}>
              <InputLabel>Title</InputLabel>
              <TextField
                error={!title && myAlert}
                type="text"
                className={classes.text}
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                helperText="Enter a suitable title"
              />
            </Grid>
            <Grid item xs={12} sm={3} className={classes.root}>
              <InputLabel>Price</InputLabel>
              <TextField
                className={classes.text}
                error={!price && myAlert}
                type="number"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                helperText="Enter product price"
              />
            </Grid>
            <Grid item xs={12} sm={9} className={classes.root}>
              <InputLabel>Description</InputLabel>
              <TextField
                variant="outlined"
                multiline
                error={!description && myAlert}
                rows={4}
                className={classes.text}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                helperText="Explain your product"
              />
            </Grid>

            <Grid item xs={12} sm={3} className={classes.root}>
              <InputLabel>Category</InputLabel>
              <Select
                variant="outlined"
                className={classes.text}
                value={selectedCategory}
                onChange={(e) => {
                  console.log(e.target.value);
                  setSelectedCategory(e.target.value);
                }}
              >
                {allCategories.map((e, i) => {
                  return (
                    <MenuItem key={i} value={e._id} style={{ color: e.color }}>
                      {e.title}
                    </MenuItem>
                  );
                })}
              </Select>
              <Button
                variant="outlined"
                onClick={addProductCategory}
                style={{ width: "100%", height: "47.5px", marginTop: 10 }}
              >
                Add Category
              </Button>
            </Grid>
            {/* <button onClick={() => console.log(data)}>Show product</button> */}
            {/* <button onClick={() => console.log(allCategories)}>
              Show category
            </button> */}
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.root}
            // justifyContent="center"
            // alignItems="center"
            style={{ textAlign: "center" }}
          >
            <DropZoneForImages
              setSelectedImage={setSelectedImage}
              imgError={myAlert}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                onClick={addProduct}
                style={{ width: "100%", height: "47.5px", margin: 10 }}
              >
                {" "}
                Add product
              </Button>
            </div>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default AddProduct;
