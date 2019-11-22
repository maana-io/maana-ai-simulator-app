// --- External imports
import React, { useCallback, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Race, RaceId, Status, StatusId } from "@node-sc2/core/constants/enums";

// Material UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// --- Internal imports
import { GameStatusQuery, RunMutation, StopMutation } from "./graphql";

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

const GameControl = ({ id }) => {
  // --- Hooks
  const [gameStatus, setGameStatus] = useState();
  const [raceBot1, setRaceBot1] = useState(Race.RANDOM);
  const [uriBot1, setUriBot1] = useState();

  const { loading, error } = useQuery(GameStatusQuery, {
    variables: { id },
    pollInterval: 1000,
    onCompleted: data => setGameStatus(data.gameStatus)
  });

  const [run] = useMutation(RunMutation, {
    variables: { config: { id } },
    onCompleted: data => setGameStatus(data.run)
  });

  const [stop] = useMutation(StopMutation, {
    variables: { id },
    onCompleted: data => setGameStatus(data.stop)
  });

  const classes = useStyles();

  // --- Handlers

  const handleChangeRaceBot1 = newValue => {
    console.log("handleChangeRaceBot1", newValue);
    setRaceBot1(newValue);
  };

  const handleChangeUriBot1 = newValue => {
    setUriBot1(newValue);
  };

  const handleOnClickRun = async () => {
    if (gameStatus.Status === Status.IN_GAME) {
      stop();
    } else {
      setGameStatus({ ...gameStatus, status: Status.LAUNCHED });
      run();
    }
  };

  // --- Rendering

  if (loading) return "Loading...";
  if (error) return `Control error! ${error}`;

  const disableControls =
    gameStatus &&
    (gameStatus.status === Status.IN_GAME ||
      gameStatus.status === Status.LAUNCHED ||
      gameStatus.status === Status.INIT_GAME);

  return (
    <Paper>
      <Typography gutterBottom variant="h5">
        Configuration
      </Typography>
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="raceBot1"
            select
            label="Player 1 Race"
            disabled={disableControls}
            className={classes.textField}
            value={raceBot1}
            onChange={e => handleChangeRaceBot1(e.target.value)}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Select a race"
            margin="normal"
            variant="outlined"
          >
            {Object.keys(RaceId).map(raceId => (
              <MenuItem key={`raceId:${raceId}`} value={raceId}>
                {RaceId[raceId]}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="uriBot1"
            label="Player 1 Bot URI"
            disabled={disableControls}
            defaultValue="Computer"
            className={classes.textField}
            helperText="Optional GraphQL endpoint"
            margin="normal"
            variant="outlined"
            value={uriBot1}
            onChange={e => handleChangeUriBot1(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="status"
            label="Status"
            disabled={disableControls}
            className={classes.textField}
            helperText="Game engine status"
            margin="normal"
            variant="outlined"
            value={StatusId[gameStatus ? gameStatus.status : Status.UNKNOWN]}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="gameLoop"
            label="Game Loop"
            disabled={disableControls}
            className={classes.textField}
            helperText="Game steps played"
            margin="normal"
            variant="outlined"
            value={gameStatus ? gameStatus.gameLoop : 0}
            InputProps={{
              readOnly: true
            }}
          />
        </div>
      </form>
      <Button
        disabled={!!!gameStatus}
        onClick={handleOnClickRun}
        variant="outlined"
        className={classes.button}
      >
        {disableControls ? "Stop" : "Run"}
      </Button>
    </Paper>
  );
};

export default GameControl;
