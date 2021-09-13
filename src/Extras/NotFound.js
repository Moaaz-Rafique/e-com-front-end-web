import { Button, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

function NotFound() {
  const history = useHistory();
  return (
    <Grid>
      <Typography variant="h1" color="primary">
        404-NotFound.
      </Typography>
      <Typography variant="subtitle1">
        This page does not exist or has been removed
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => history.goBack()}
      >
        Go back
      </Button>
    </Grid>
  );
}
export default NotFound;
