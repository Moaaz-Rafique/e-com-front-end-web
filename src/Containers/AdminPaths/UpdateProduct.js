import { Button, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

function UpdateProduct() {
  const history = useHistory();
  return (
    <Grid style={{ paddingLeft: 20 }}>
      <Typography variant="h4" color="primary">
        Please access the product you want to update from home page.
        {/* 404-NotFound. */}
      </Typography>
      <Button variant="outlined" onClick={() => history.push("/")}>
        Go to Home
      </Button>
      <Button variant="outlined" onClick={() => history.goBack()}>
        Go back
      </Button>
    </Grid>
  );
}

export default UpdateProduct;
