// --- External imports
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { useLocalStorage } from "react-recipes";
// import validUrl from "valid-url";

// Material UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import { Modes, Codes } from "../../util/enums";
import { Race } from "./enums";
import SimulatorClientContext from "../../util/SimulatorClientContext";
import { ListEnvironmentsQuery, RunMutation, StopMutation } from "./graphql";
import UserContext from "../../util/UserContext";

// --- Constants

const DefaultMap = "DefeatRoaches";

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

export default function SimControl({ status }) {
  // --- Hooks
  const simulatorClientContext = useContext(SimulatorClientContext);
  const { client, sessionId } = simulatorClientContext;

  const [statusState, setStatusState] = useState(status);

  const [map, setMap] = useLocalStorage("starcraft2-map", DefaultMap);

  const [maps, setMaps] = useState([]);

  const { loading, error } = useQuery(ListEnvironmentsQuery, {
    onCompleted: data => {
      setMaps(data.listEnvironments);
    },
    client
  });

  const [raceAgent1, setRaceAgent1] = useLocalStorage(
    "starcraft2-race-bot1",
    Race.Random
  );

  const [raceAgent2, setRaceAgent2] = useLocalStorage(
    "starcraft2-race-bot2",
    Race.Random
  );

  const [uriAgent1, setUriAgent1] = useLocalStorage(
    "starcraft2-uri-bot1",
    "Computer"
  );

  const [uriAgent2, setUriAgent2] = useLocalStorage(
    "starcraft2-uri-bot2",
    "Computer"
  );

  const [tokenAgent1, setTokenAgent1] = useLocalStorage(
    "starcraft2-token-bot1"
  );

  const [tokenAgent2, setTokenAgent2] = useLocalStorage(
    "starcraft2-token-bot2"
  );

  const [mode, setMode] = React.useState(Modes.Training);

  const [run] = useMutation(RunMutation, {
    variables: {
      config: {
        sessionId,
        environmentId: map,
        modeId: mode,
        agents: [
          {
            race: raceAgent1,
            uri: uriAgent1,
            token: tokenAgent1 || UserContext.getAccessToken()
          },
          {
            race: raceAgent2,
            uri: uriAgent2,
            token: tokenAgent2 || UserContext.getAccessToken()
          }
        ]
      }
    },
    onCompleted: data => setStatusState(data.run),
    client
  });

  const [stop] = useMutation(StopMutation, {
    onCompleted: data => setStatusState(data.run),
    client
  });

  const classes = useStyles();

  // --- Handlers

  const handleOnClickRun = async () => {
    if (statusState.code.id === Codes.Running) {
      stop();
    } else {
      setStatusState({ ...status, code: { id: Codes.Starting } });
      run();
    }
  };

  // --- Rendering

  const disableControls =
    statusState &&
    (statusState.code.id === Codes.Starting ||
      statusState.code.id === Codes.Running);

  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Control
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          {maps && maps.length !== 0 && (
            <TextField
              id="map"
              select
              label="Map"
              margin="dense"
              disabled={disableControls}
              className={classes.textField}
              value={map}
              onChange={e => setMap(e.target.value)}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
            >
              {maps.map(m => (
                <MenuItem key={m.id} value={m.id}>
                  {m.id}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography className={classes.heading}>Player One</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="raceAgent1"
                select
                label="Race"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={raceAgent1}
                onChange={e => setRaceAgent1(e.target.value)}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {Object.keys(Race).map(race => (
                  <MenuItem key={`race:${race}`} value={Race[race]}>
                    {race}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="uriAgent1"
                label="URI"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={uriAgent1}
                onChange={e => setUriAgent1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="tokenAgent1"
                label="Token"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={tokenAgent1}
                onChange={e => setTokenAgent1(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography className={classes.heading}>Player Two</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="raceAgent2"
                select
                label="Race"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={raceAgent2}
                onChange={e => setRaceAgent2(e.target.value)}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {Object.keys(Race).map(race => (
                  <MenuItem key={`race:${race}`} value={Race[race]}>
                    {race}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="uriAgent2"
                label="URI"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={uriAgent2}
                onChange={e => setUriAgent2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="tokenAgent2"
                label="Token"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={tokenAgent2}
                onChange={e => setTokenAgent2(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography className={classes.heading}>Mode</Typography>
          <Grid container spacing={1}>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="mode"
                name="mode"
                value={mode}
                onChange={e => setMode(e.target.value)}
                row
              >
                <FormControlLabel
                  disabled={disableControls}
                  value={Modes.Training}
                  control={<Radio />}
                  label="Training"
                />
                <FormControlLabel
                  disabled={disableControls}
                  value={Modes.Performing}
                  control={<Radio />}
                  label="Performing"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          onClick={handleOnClickRun}
          variant="contained"
          color={disableControls ? "secondary" : "primary"}
          className={classes.button}
        >
          {disableControls ? "Stop" : "Run"}
        </Button>
      </div>
    </Paper>
  );
}
