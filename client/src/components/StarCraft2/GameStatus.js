// --- External imports
import React from "react";
import { useQuery, useSubscription } from "react-apollo";

import { Status, StatusId } from "@node-sc2/core/constants/enums";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

// --- Internal imports
import { OnObservation } from "./graphql";
import GameObservation from "./GameObservation";

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

const GameStatus = ({ gameStatus }) => {
  // --- Hooks
  const { data, loading, error } = useSubscription(OnObservation, {
    variables: { id: gameStatus.id }
  });

  const classes = useStyles();

  const ObservationFragment = () => {
    return (
      <React.Fragment>
        {loading && "Loading..."}
        {error && `Error! ${error.message}`}
        {data && <GameObservation />}
      </React.Fragment>
    );
  };

  console.log("gameStatus", gameStatus, StatusId[gameStatus.status]);

  // --- Rendering
  return (
    <Paper>
      <Typography gutterBottom variant="h5">
        Game Status
      </Typography>
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="status"
            label="Status"
            className={classes.textField}
            helperText="Game engine status"
            margin="normal"
            variant="outlined"
            value={StatusId[gameStatus.status]}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="gameLoop"
            label="Game Loop"
            className={classes.textField}
            helperText="Game steps played"
            margin="normal"
            variant="outlined"
            value={gameStatus.gameLoop}
            InputProps={{
              readOnly: true
            }}
          />
        </div>
      </form>
      {gameStatus.status === Status.Running && <ObservationFragment />}
    </Paper>
  );
};

export default GameStatus;
