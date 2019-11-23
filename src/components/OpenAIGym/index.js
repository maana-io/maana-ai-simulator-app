// --- External imports
import React, { useState } from "react";
import { useQuery } from "react-apollo";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import SimInfo from "./SimInfo";
import SimControl from "./SimControl";
import SimObservation from "./SimObservation";
import SimStatusContext from "./SimStatusContext";
import { SimStatusQuery } from "./graphql";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2)
  }
}));

export default function OpenAIGym() {
  // --- Hooks
  const [simStatus, setSimStatus] = useState(null);

  const { loading, error } = useQuery(SimStatusQuery, {
    pollInterval: 1000,
    onCompleted: data => {
      console.log("onCompleted: ", data);
      setSimStatus(data.simStatus);
    }
  });

  const classes = useStyles();

  return (
    <SimStatusContext.Provider
      value={{
        simStatus,
        setSimStatus
      }}
    >
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3} sm={3}>
            <SimInfo />
          </Grid>
          {loading && "Loading simulator...."}
          {error && `Error loading simulator: ${error}`}
          {simStatus && (
            <React.Fragment>
              <Grid item xs={5} sm={5}>
                <SimControl />
              </Grid>
              <Grid item xs={4} sm={4}>
                <SimObservation />
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </div>
    </SimStatusContext.Provider>
  );
}
