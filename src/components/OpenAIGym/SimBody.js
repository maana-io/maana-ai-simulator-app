// --- External imports
import React, { useContext, useEffect, useReducer } from "react";
import { useQuery } from "react-apollo";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import ErrorCard from "../ErrorCard";
import SimulatorClientContext from "../../util/SimulatorClientContext";
import { Codes, Modes } from "../../util/enums";
import GymContext from "./state/GymContext";
import gymReducer from "./state/gymReducer";
import SimControl from "./SimControl";
import SimObservation from "./SimObservation";
import { StatusQuery } from "./graphql";
import { SET_STATUS } from "./state/types";

const useStyles = makeStyles(theme => ({
  root: {}
}));

const initialStatus = {
  id: "",
  code: { id: Codes.Unknown },
  errors: []
};

export default function SimBody() {
  // Manage some global (to the gym simulator) state
  const [state, dispatch] = useReducer(gymReducer, initialStatus);

  const setStatus = status => dispatch({ type: SET_STATUS, payload: status });

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

  // Update when the status changes
  useEffect(() => {
    if (data && data.status) {
      setStatus(data.status);
    }
  }, [data]);

  const classes = useStyles();

  const showData = data && !loading && !error;

  return (
    <Grid className={classes.root} container spacing={3}>
      {loading && "Loading simulator...."}
      {error && <ErrorCard error={error} />}
      {showData && (
        <GymContext.Provider value={{ status: state.status, setStatus }}>
          <Grid item xs={6} sm={6}>
            <SimControl />
          </Grid>
          <Grid item xs={6} sm={6}>
            <SimObservation />
          </Grid>
        </GymContext.Provider>
      )}
    </Grid>
  );
}
