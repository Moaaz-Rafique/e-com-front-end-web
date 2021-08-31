import { Box, Button, Divider, Grid, ImageList, ImageListItem, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL, FETCH_PRODUCT } from "../Constants/apis";
import qs from "qs";
import { Typography } from "@material-ui/core";
import {ProductCard} from "../Components";
function ProductPage() {
  const useStyles = makeStyles((theme) => ({
    image: {
      background: "#f0f0f0",
      width: "90%",
      height: "90%",
      padding: 20,
      objectFit: "contain",
    },
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      width: 'fit-content',
      // justifyContent: 'space-around',
      // overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      // flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      // transform: 'translateZ(0)',
    },
    
    text: {
      color: theme.palette.text.primary,
    },
    imageDiv: {
      width: "100%",
      height: 500,
      // margin: 20,
    },
    button: {
      color: theme.palette.primary.main,
      width: "45%",
      minWidth: 200,
      fontSize: 16,
      margin: 5,
      height: 50,
    },
    switchColors: {
      color: theme.palette.secondary.main,
      background: theme.palette.primary.main,
    },
    desc: {
      maxHeight: 400,
      padding: "20px 0px",
      overflow: "auto",
    },
    similarGridItem:{margin: '0px'},
    category:{
      ...theme.palette.MuiButton
    }
  }));
  const classes = useStyles();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    getProductFromId();
    console.log(similar)
  }, []);
  const getProductFromId = async () => {
    let query = {
      id,
    };
    try {
      const data = await axios.get(FETCH_PRODUCT + qs.stringify(query));

      console.log(data.data);
      setProduct(data.data.data);
      setSimilar(data.data.similar)
    } catch (err) {
      console.log(err);
    }
  };
  if(!product){
    return 'loading product'
  }
  return (
    <Grid container direction="row" justifyContent="space-between">
      <Grid item sm={6} xs={11}>        
        <div className={classes.imageDiv}>
          {product.image? 
            <img
              src={`${BASE_URL}/images/${product?._id}/${product?.image}`}
              className={classes.image}
            />
            : 'loading image'
          
        }
        </div>
        <div>
          <Typography variant="subtitle1">Similar Items: </Typography>
          <div style={{overflow:'auto'}}>

          <Grid container className={classes.root}>

            {similar.map((e,i)=>{
              return <Grid key={i} item xs={4} sm={5} className={classes.similarGridItem}>
                  <ProductCard product={e} w={'100'} h={100}/>
              </Grid>
            })
          }
          </Grid>
          </div>
        </div>
      </Grid>
      <Divider
        orientation="vertical"
        style={{ width: 3, margin: "0px 10px", background: "#f0f0f0" }}
        flexItem
      />
      <Grid item sm={5} xs={11}>
        <Typography variant="h2" className={classes.text}>
          <Box>{product?.title}</Box>
        </Typography>
        <Typography
          variant="subtitle2"
          className={[classes.text, classes.desc]}
        >
          {product?.description}
        </Typography>
        <Typography variant="h4" className={classes.text} color="primary">
        <Box>
        Category
        </Box>
        <Box fontSize="16px">{product?.categories.map((e,i)=><span className={classes.category}key={i}>{e.title}</span>)}</Box>
        </Typography>
        <Typography variant="h3" className={classes.text} color="primary">
          <Box >Rs. {product?.price}</Box>
        </Typography>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Button variant="outlined" className={classes.button}>
            Buy Now
          </Button>
          <Button
            variant="outlined"
            className={[classes.button, classes.switchColors]}
          >
            Add to basket
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}
export default ProductPage;
