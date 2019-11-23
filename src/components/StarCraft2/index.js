// --- External imports
import React from "react";
import { useQuery } from "react-apollo";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import ErrorCard from "../ErrorCard";
import SimInfo from "../SimInfo";
import SimControl from "./SimControl";
import SimObservation from "./SimObservation";
import { SimStatusQuery } from "./graphql";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2)
  }
}));

export default function StarCraft2() {
  const { loading, error, data } = useQuery(SimStatusQuery, {
    pollInterval: 100000
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <SimInfo
            image="starcraft2.jpg"
            title="StarCraft II"
            description="The StarCraft II Learning Environment (SC2LE) exposes Blizzard Entertainment's StarCraft II Machine Learning API to GraphQL agents. This is a collaboration between DeepMind and Blizzard to develop StarCraft II into a rich environment for RL research, providing an interface for RL agents to interact with StarCraft 2, getting observations and sending actions."
          />
        </Grid>
        <Grid item xs={9} sm={9}>
          <Grid container spacing={3}>
            {loading && "Loading simulator...."}
            {error && <ErrorCard error={error} />}
            {data && (
              <React.Fragment>
                <Grid item xs={7} sm={7}>
                  <SimControl simStatus={data.simStatus} />
                </Grid>
                <Grid item xs={5} sm={5}>
                  <SimObservation simStatus={data.simStatus} />
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
