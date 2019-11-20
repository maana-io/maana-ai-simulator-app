// --- External imports
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

// --- Internal imports
import { GET_INFO } from "../../graphql/QService";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const Simulator = () => {
  // --- State

  // --- Other hooks

  // --- Lazy state update

  // --- Handlers

  // --- Rendering

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">Welcome to the Maana Q AI Simulator</Typography>
      <Typography component="p">
        This application hosts a variety of simulation environments that can be
        interfaced with any conforming GraphQL-based AI Agents
      </Typography>
    </Paper>
  );
};

export default Simulator;
