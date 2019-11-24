// --- External imports
import React, { useContext, useState } from "react";
import { useMutation } from "react-apollo";
import { useLocalStorage } from "react-recipes";
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
import SimulatorClientContext from "../../util/SimulatorClientContext";
import { RunMutation, StopMutation } from "./graphql";

// --- Styles

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1)
  },
  formControl: {
    marginLeft: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "97%"
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

export default function SimControl({ simStatus }) {
  // --- Hooks
  const client = useContext(SimulatorClientContext);

  const [simStatusState, setSimStatusState] = useState(simStatus);

  const [raceBot1, setRaceBot1] = useLocalStorage(
    "starcraft2-race-bot1",
    Race.RANDOM
  );
  const [raceBot2, setRaceBot2] = useLocalStorage(
    "starcraft2-race-bot2",
    Race.RANDOM
  );
  const [uriBot1, setUriBot1] = useLocalStorage(
    "starcraft2-uri-bot1",
    "Computer"
  );
  const [uriBot2, setUriBot2] = useLocalStorage(
    "starcraft2-uri-bot2",
    "Computer"
  );
  const [tokenBot1, setTokenBot1] = useLocalStorage("starcraft2-token-bot1");
  const [tokenBot2, setTokenBot2] = useLocalStorage("starcraft2-token-bot2");

  const [run] = useMutation(RunMutation, {
    variables: {
      config: {
        players: [
          { race: raceBot1, uri: uriBot1, token: tokenBot1 },
          { race: raceBot2, uri: uriBot2, token: tokenBot2 }
        ]
      }
    },
    onCompleted: data => setSimStatusState(data.run),
    client
  });

  const [stop] = useMutation(StopMutation, {
    onCompleted: data => setSimStatusState(data.run),
    client
  });

  const classes = useStyles();

  // --- Handlers

  const handleOnClickRun = async () => {
    if (simStatus.Status === Status.IN_GAME) {
      stop();
    } else {
      setSimStatusState({ ...simStatus, status: Status.LAUNCHED });
      run();
    }
  };

  // --- Rendering

  const disableControls =
    simStatus &&
    (simStatus.status === Status.IN_GAME ||
      simStatus.status === Status.LAUNCHED ||
      simStatus.status === Status.INIT_GAME);

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
          className={classes.textField}
          margin="normal"
          value={uriBot2}
          onChange={e => setUriBot2(e.target.value)}
        />
      </Box>
      <Button
        disabled={!!!simStatus}
        onClick={handleOnClickRun}
        variant="outlined"
        className={classes.button}
      >
        {disableControls ? "Stop" : "Run"}
      </Button>
    </Paper>
  );
}
