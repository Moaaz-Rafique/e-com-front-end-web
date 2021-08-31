import { Paper } from "@material-ui/core";
import {
  Card,
  Typography,
  CardActionArea,
  CardMedia,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { BASE_URL } from "../Constants/apis";


function ProductCard(props) {
  const history = useHistory();
  const { product } = props;
  const { w,h } = props;
  const useStyles = makeStyles((theme) => ({
    card: { margin: 10, boxShadow: "none" },  
    image: {
      background: "#f0f0f0",
      width: w||280,
      height: h||320,
      padding: 20,
      objectFit: "contain",
      minWidth: 120,
    },
    text: {
      color: theme.palette.text.primary,
    },
  }));
  const classes = useStyles();

  return (
    <Paper
      className={classes.card}
      onClick={() => {
        history.push("/product/" + product._id);
      }}
    >
      <CardActionArea>
        <div className={classes.imageDiv}
        onClick={() => {
          history.push("/product/" + product._id);
        }}>
          <img
            src={`${BASE_URL}/images/${product?._id}/${product?.image}`}
            className={classes.image}
          />
        </div>
        <Typography variant="subtitle1" className={classes.text}>
          <Box fontWeight="fontWeightLight">{product?.title}</Box>
          <Box fontWeight="fontWeightBold">Rs.{product?.price}</Box>
        </Typography>
      </CardActionArea>
    </Paper>
  );
}

export default ProductCard;
