import { Button, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

function NotFound() {
  const history = useHistory();
  return (
    <Grid>
      <Typography variant="h1" color="primary">
        403-Access denied.
      </Typography>
      <Typography variant="subtitle1">
        You dont have permission to access this content
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => history.goBack()}
      >
        Go back
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => history.push("/")}
      >
        Go to Home
      </Button>
    </Grid>
  );
}
export default NotFound;
