import { useEffect, useState } from "react";
import {
  ADD_PRODUCT,
  BASE_URL,
  FETCH_ALL_CATEGORIES,
  FETCH_PRODUCT,
  UPDATE_PRODUCT,
} from "../../Constants/apis";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import DropZoneForImages from "../../Components/DropZoneForImages";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@material-ui/icons/Close";
import { SET_CATEGORIES, SET_PRODUCT_DETAILS } from "../../store/types";
import qs from "qs";
import swal from "sweetalert";

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
    category: {
      padding: 10,
      borderRadius: 20,
    },
  }));

  const user = useSelector((state) => state?.userReducer?.user_details);
  const history = useHistory();
  const { id } = useParams();
  const product = useSelector(
    (state) => state?.productReducer?.product_details?.[id]
  );
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const allCategories = useSelector(
    (state) => state?.categoryReducer?.categories
  );
  const [myAlert, setMyAlert] = useState(false);
  const imageUrl = product
    ? `${BASE_URL}/images/${product?._id}/${product?.image}`
    : null;
  useEffect(() => {
    if (user.status != "admin") {
      history.push("/");
    }
    getAllCategories();
    if (product && id) {
      // setSelectedImage(Object.assign({ file: imageUrl }));
      loadProduct();
      setTitle(product?.title);
      setDescription(product?.description);
      setPrice(product?.price);
      setProductCategories([...product?.categories]);
    }
    // console.log(allCategories);
  }, []);
  const loadProduct = async () => {
    let query = {
      id,
    };
    try {
      const data = await axios.get(FETCH_PRODUCT + qs.stringify(query));

      dispatch({ type: SET_PRODUCT_DETAILS, payload: data.data.data });
      // dispatch({ type: SET_SIMILAR_PRODUCTS, payload: data.data.similar });
    } catch (error) {
      swal("", error.message, "error");
    }
  };
  const removeCategory = (id) => {
    const newCategories = [...productCategories];
    const index = newCategories.indexOf(id);
    if (index !== -1) {
      newCategories.splice(index, 1);
    }
    setProductCategories(newCategories);
  };
  const addProduct = async () => {
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
      const data = await axios.post(ADD_PRODUCT, myProduct);
      // .then((response) => console.log(response.data.data));
      if (data?.data?.data?._id) {
        swal("Product Updated Successfully", "", "success");
        history.push("/product/" + data?.data?.data?._id);
      } else {
        swal("Why");
        console.log(data.data);
      }
      // swal("Product Added successfully", "", "success");
    } catch (err) {
      swal("", err.message, "error");
    }
  };
  const updateProduct = async () => {
    const myProduct = new FormData();

    myProduct.append("_id", product?._id);
    if (selectedImage) myProduct.append("image", selectedImage);
    myProduct.append("title", title);
    myProduct.append("price", price);
    myProduct.append("description", description);
    for (const category of productCategories) {
      myProduct.append("categories", category);
    }
    try {
      // console.log(productCategories);
      const data = await axios.post(UPDATE_PRODUCT, myProduct);
      dispatch({ type: SET_PRODUCT_DETAILS, payload: data?.data?.data });
      if (data?.data?.data?._id)
        swal("Product Updated Successfully", "", "success");
      // else {
      //   swal('Why')
      // }
    } catch (err) {
      swal("", err.message, "error");
    }
  };
  const getAllCategories = async () => {
    try {
      const data = await axios.get(FETCH_ALL_CATEGORIES);
      // .then((response) => setAllCategories(response.data.data));
      dispatch({ type: SET_CATEGORIES, payload: data.data.data });
    } catch (err) {
      swal("", err.message, "error");
    }
  };
  const addProductCategory = () => {
    // console.log(productCategories);
    if (productCategories.findIndex((e) => e == selectedCategory) > -1) return;
    else if (!selectedCategory) return;
    setProductCategories([...productCategories, selectedCategory]);
  };
  const classes = useStyles();

  return (
    <Grid container direction="column-reverse" alignItems="center">
      <Grid item xs={12}>
        <Paper elevation={0} className={classes.paper}>
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
                onChange={(e) => setSelectedCategory(e.target.value)}
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
            style={{ textAlign: "center" }}
          >
            {productCategories?.map((e, i) => {
              return (
                <Typography
                  key={i}
                  // sty
                  display="inline"
                  className={classes.category}
                  style={{
                    color: allCategories?.find((i) => {
                      return i._id == e;
                    })?.color,
                  }}
                >
                  <Button>
                    {
                      allCategories?.find((i) => {
                        return i._id == e;
                      })?.title
                    }
                    <CloseIcon
                      color="primary"
                      onClick={() => removeCategory(e)}
                    />
                  </Button>
                </Typography>
              );
            })}
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
              selectedImage={imageUrl}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {id ? (
                <Button
                  variant="outlined"
                  onClick={updateProduct}
                  style={{ width: "100%", height: "47.5px", margin: 10 }}
                >
                  {" "}
                  update product
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={addProduct}
                  style={{ width: "100%", height: "47.5px", margin: 10 }}
                >
                  {" "}
                  Add product
                </Button>
              )}
            </div>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default AddProduct;
