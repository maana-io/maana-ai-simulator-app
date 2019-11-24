// --- External imports
import React from "react";
import { useQuery } from "react-apollo";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import { ObserveQuery } from "./graphql";

// --- Constants

// --- Styles

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "97%"
  },
  listRoot: {},
  input: {
    display: "none"
  }
}));

export default function SimObservation() {
  const { loading, error, data } = useQuery(ObserveQuery, {
    fetchPolicy: "no-cache",
    pollInterval: 10000
    // onCompleted: data => {
    //   console.log("onCompleted2", data);
    // }
  });

  let observation;
  let simStatus;
  if (data) {
    observation = data.observe;
    simStatus = observation.simStatus;
  }

  console.log("observation", observation);
  console.log("simStatus", simStatus);

  const classes = useStyles();

  // --- Rendering
  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Observation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography gutterBottom variant="caption">
            Coming Soon!
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
