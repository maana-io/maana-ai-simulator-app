// --- External imports
import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// --- Internal imports

// --- Constants

// --- Styles

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const GameObservation = ({ observation }) => {
  // --- Hooks

  const classes = useStyles();

  // --- Rendering
  return (
    <Typography variant="body2" color="textPrimary" component="p">
      observation: {observation.gameStatus.status}
    </Typography>
  );
};

export default GameObservation;
