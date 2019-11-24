// --- External imports
import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import SimInfo from "../SimInfo";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2)
  }
}));

export default function Simulator() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <SimInfo
            image="simulator.webp"
            title="Maana Q AI Simulator"
            description="This application hosts a variety of simulation environments that can be interfaced with any conforming GraphQL-based AI Agents"
          />
        </Grid>
        <Grid item xs={9} sm={9}></Grid>
      </Grid>
    </div>
  );
}
