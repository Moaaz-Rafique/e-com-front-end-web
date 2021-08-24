import { Paper } from "@material-ui/core";

function ProductCard(props) {
  const { product } = props;
  const { title } = product;
  return (
    <Paper variant="outlined" square color="secondary">
      {title || "title"}
    </Paper>
  );
}

export default ProductCard;
