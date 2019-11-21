// --- External imports
import React, { useCallback, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo";

// Material UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// --- Internal imports
import { GameStatusQuery, RunMutation, StopMutation } from "./queries";
import { Status } from "./enums";

// --- Styles

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const GameControl = ({ id }) => {
  // --- Hooks
  const { loading, error, data } = useQuery(GameStatusQuery, {
    variables: { id }
  });
  const [
    run,
    { loading: runLoading, error: runError, data: runData }
  ] = useMutation(RunMutation, { variables: { config: { id: 0 } } });
  const [
    stop,
    { loading: stopLoading, error: stopError, data: stopData }
  ] = useMutation(RunMutation, { variables: { id: 0 } });
  const [uriBot1, setUriBot1] = useState();
  const classes = useStyles();

  // --- Handlers

  const handleChangeBot1 = newValue => {
    setUriBot1(newValue);
  };

  const handleOnClickRun = async () => {
    if (gameStatus.Status === Status.Running) {
      stop();
    } else {
      run();
    }
  };

  // --- Rendering

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const { gameStatus } = data;

  return (
    <Paper>
      <Typography gutterBottom variant="h5">
        Configuration
      </Typography>
      <form>
        <input
          value={uriBot1}
          onChange={e => handleChangeBot1(e.target.value)}
          placeholder="URI for bot 1"
          type="text"
          name="uriBot1"
          required
        />
      </form>
      <Button onClick={handleOnClickRun}>
        {gameStatus.status === Status.Running ||
        gameStatus.status === Status.Starting
          ? "Stop"
          : "Run"}
      </Button>
    </Paper>
  );
};

export default GameControl;
