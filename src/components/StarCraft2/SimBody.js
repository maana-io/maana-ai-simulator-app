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
  // Use the GraphQL client that has been configured for this simulator
  const simulatorClientContext = useContext(SimulatorClientContext);
  const { client, sessionId } = simulatorClientContext;

  // Poll for the status
  const { loading, error, data } = useQuery(StatusQuery, {
    fetchPolicy: "no-cache",
    pollInterval: 1000,
    client,
    variables: { sessionId }
    // NOTE: would use the 'onCompleted' callback to update status, but
    // at the time of writing, it doesn't get called when polling, so
    // I'm using an 'effect' instead
    // onCompleted: data => {
    //   if (data && data.status) {
    //     setStatus(data.status);
    //   }
    // }
  });

  const classes = useStyles();

  const showData = data && !loading && !error;

  return (
    <Grid className={classes.root} container spacing={3}>
      {loading && "Loading simulator...."}
      {error && <ErrorCard error={error} />}
      {showData && (
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
