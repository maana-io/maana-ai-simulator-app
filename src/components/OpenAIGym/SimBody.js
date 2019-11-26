// --- External imports
import React, { useContext } from "react";
import { useQuery } from "react-apollo";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import ErrorCard from "../ErrorCard";
import SimulatorClientContext from "../../util/SimulatorClientContext";
import SimControl from "./SimControl";
import SimObservation from "./SimObservation";
import { StatusQuery } from "./graphql";

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function SimBody() {
  const client = useContext(SimulatorClientContext);

  const { loading, error, data } = useQuery(StatusQuery, {
    pollInterval: 100000,
    client
  });

  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={3}>
      {loading && "Loading simulator...."}
      {error && <ErrorCard error={error} />}
      {data && (
        <React.Fragment>
          <Grid item xs={6} sm={6}>
            <SimControl status={data.status} />
          </Grid>
          <Grid item xs={6} sm={6}>
            <SimObservation status={data.status} />
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
}
