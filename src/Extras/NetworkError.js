import { Button, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

function NetworkError() {
  const history = useHistory();
  return (
    <Grid style={{ padding: 100 }}>
      <Typography variant="h3" color="primary">
        Server temporarily unavailable
      </Typography>

      <Typography variant="subtitle1">
        Server cannot be reached at the moment.
      </Typography>
    </Grid>
  );
}
export default NetworkError;
