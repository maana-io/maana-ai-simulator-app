// --- External imports
import React, { useContext, useState } from "react";
import { useMutation } from "react-apollo";
import { Race, RaceId, Status } from "@node-sc2/core/constants/enums";

// Material UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";

// --- Internal imports
import { RunMutation, StopMutation } from "./graphql";
import GameStatusContext from "./GameStatusContext";

// --- Styles

const useStyles = makeStyles(theme => ({
  paper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
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

const GameControl = () => {
  // --- Hooks
  const { gameStatus, setGameStatus } = useContext(GameStatusContext);

  const [raceBot1, setRaceBot1] = useState(Race.RANDOM);
  const [raceBot2, setRaceBot2] = useState(Race.RANDOM);
  const [uriBot1, setUriBot1] = useState();
  const [uriBot2, setUriBot2] = useState();

  const [run] = useMutation(RunMutation, {
    variables: { config: { id: gameStatus.id } },
    onCompleted: data => setGameStatus(data.run)
  });

  const [stop] = useMutation(StopMutation, {
    variables: { id: gameStatus.id },
    onCompleted: data => setGameStatus(data.stop)
  });

  const classes = useStyles();

  // --- Handlers

  const handleOnClickRun = async () => {
    if (gameStatus.Status === Status.IN_GAME) {
      stop();
    } else {
      setGameStatus({ ...gameStatus, status: Status.LAUNCHED });
      run();
    }
  };

  // --- Rendering

  const disableControls =
    gameStatus &&
    (gameStatus.status === Status.IN_GAME ||
      gameStatus.status === Status.LAUNCHED ||
      gameStatus.status === Status.INIT_GAME);

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.heading}>Player One</Typography>
      <Box>
        <TextField
          id="raceBot1"
          select
          label="Race"
          disabled={disableControls}
          className={classes.textField}
          value={raceBot1}
          onChange={e => setRaceBot1(e.target.value)}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
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
          disabled={disableControls}
          defaultValue="Computer"
          className={classes.textField}
          margin="normal"
          value={uriBot1}
          onChange={e => setUriBot1(e.target.value)}
        />
      </Box>
      <Typography className={classes.heading}>Player Two</Typography>
      <Box>
        <TextField
          id="raceBot2"
          select
          label="Race"
          disabled={disableControls}
          className={classes.textField}
          value={raceBot2}
          onChange={e => setRaceBot2(e.target.value)}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
        >
          {Object.keys(RaceId).map(raceId => (
            <MenuItem key={`raceId:${raceId}`} value={raceId}>
              {RaceId[raceId]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="uriBot2"
          label="URI"
          disabled={disableControls}
          defaultValue="Computer"
          className={classes.textField}
          margin="normal"
          value={uriBot2}
          onChange={e => setUriBot2(e.target.value)}
        />
      </Box>
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
