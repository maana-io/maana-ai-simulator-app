// --- External imports
import React, { useState } from "react";
import { useQuery, useSubscription } from "react-apollo";

import { Status, StatusId } from "@node-sc2/core/constants/enums";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

// --- Internal imports
import { OnObservation } from "./graphql";

// --- Constants

// --- Styles

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const GameObservation = ({ id }) => {
  // --- Hooks
  const [observation, setObservation] = useState();
  const { data, loading, error } = useSubscription(OnObservation, {
    variables: { id },
    onComplete: data => {
      console.log("onSubscription", data);
    }
  });

  const classes = useStyles();

  // --- Rendering

  // --- Rendering
  return (
    <Paper>
      <Typography gutterBottom variant="h5">
        Game Observation
      </Typography>
      {loading && "Loading..."}
      {error && `Error: ${JSON.stringify(error)}`}
      {observation && (
        <form className={classes.container} noValidate autoComplete="off">
          <div>
            <TextField
              id="gameLoop"
              label="Game Loop"
              className={classes.textField}
              helperText="Game steps played"
              margin="normal"
              variant="outlined"
              value={observation.gameStatus.gameLoop}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
        </form>
      )}
    </Paper>
  );
};

export default GameObservation;
