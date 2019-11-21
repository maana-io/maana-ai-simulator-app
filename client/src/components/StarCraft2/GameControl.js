// --- External imports
import React, { useCallback, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Race, RaceId, Status } from "@node-sc2/core/constants/enums";

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

  const { loading, error, data } = useQuery(GameStatusQuery, {
    variables: { id }
  });

  const [run] = useMutation(RunMutation, {
    variables: { config: { id } },
    update(cache, { data }) {
      console.log("run", data);
      setGameStatus(data.run.status);
    }
  });

  const [stop] = useMutation(StopMutation, {
    variables: { id },
    update(cache, { data }) {
      console.log("stop", data);
      setGameStatus(cache, data.stop.status);
    }
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
      run();
    }
  };

  // --- Rendering

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  if (!gameStatus && data) {
    console.log("gameStatus", gameStatus);
    setGameStatus(data.gameStatus);
  }

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
            label="Race"
            disabled={gameStatus && gameStatus.status !== Status.IN_GAME}
            className={classes.textField}
            value={raceBot1}
            onChange={e => handleChangeRaceBot1(e.target.value)}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Player race"
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
            label="URI"
            disabled={gameStatus && gameStatus.status !== Status.IN_GAME}
            defaultValue="Computer"
            className={classes.textField}
            helperText="Optional GraphQL endpoint"
            margin="normal"
            variant="outlined"
            value={uriBot1}
            onChange={e => handleChangeUriBot1(e.target.value)}
          />
        </div>
      </form>
      <Button
        disabled={!!!gameStatus}
        onClick={handleOnClickRun}
        variant="outlined"
        className={classes.button}
      >
        {gameStatus &&
        (gameStatus.status === Status.IN_GAME ||
          gameStatus.status === Status.LAUNCHED)
          ? "Stop"
          : "Run"}
      </Button>
    </Paper>
  );
};

export default GameControl;
