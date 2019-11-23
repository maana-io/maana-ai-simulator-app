// --- External imports
import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// --- Internal imports

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const Simulator = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="subtitle1">
        Welcome to the Maana Q AI Simulator
      </Typography>
      <Typography variant="caption">
        This application hosts a variety of simulation environments that can be
        interfaced with any conforming GraphQL-based AI Agents
      </Typography>
    </Paper>
  );
};

export default Simulator;
