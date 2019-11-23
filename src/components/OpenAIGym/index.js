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

export default function OpenAIGym() {
  const { loading, error, data } = useQuery(SimStatusQuery, {
    pollInterval: 1000
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <SimInfo
            image="openai-gym.png"
            title="OpenAI Gym"
            description="Gym is a toolkit for developing and comparing reinforcement learning algorithms. It supports teaching agents everything from walking to playing games like Pong or Pinball."
          />
        </Grid>
        <Grid item xs={9} sm={9}>
          <Grid container spacing={3}>
            {loading && "Loading simulator...."}
            {error && <ErrorCard error={error} />}
            {data && (
              <React.Fragment>
                <Grid item xs={6} sm={6}>
                  <SimControl simStatus={data.simStatus} />
                </Grid>
                <Grid item xs={6} sm={6}>
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
