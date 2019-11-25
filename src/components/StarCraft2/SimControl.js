// --- External imports
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { useLocalStorage } from "react-recipes";

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
import { ListMapsQuery, RunMutation, StopMutation } from "./graphql";
import { CodeGenerator } from "@babel/generator";

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

export default function SimControl({ simStatus }) {
  // --- Hooks
  const client = useContext(SimulatorClientContext);

  const [simStatusState, setSimStatusState] = useState(simStatus);

  const [map, setMap] = useLocalStorage("starcraft2-map", DefaultMap);

  const [maps, setMaps] = useState([]);

  const { loading, error } = useQuery(ListMapsQuery, {
    onCompleted: data => {
      setMaps(data.listMaps);
    },
    client
  });

  const [raceBot1, setRaceBot1] = useLocalStorage(
    "starcraft2-race-bot1",
    Race.Random
  );

  const [raceBot2, setRaceBot2] = useLocalStorage(
    "starcraft2-race-bot2",
    Race.Random
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

  const [mode, setMode] = React.useState(Modes.Training);

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
    if (simStatusState.code === Codes.Running) {
      stop();
    } else {
      setSimStatusState({ ...simStatus, code: Codes.Running });
      run();
    }
  };

  // --- Rendering

  const disableControls = false;
  // simStatus &&
  // (simStatus.status === Status.IN_GAME ||
  //   simStatus.status === Status.LAUNCHED ||
  //   simStatus.status === Status.INIT_GAME);

  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Control
      </Typography>
      <Grid container spacing={3}>
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
                id="raceBot1"
                select
                label="Race"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={raceBot1}
                onChange={e => setRaceBot1(e.target.value)}
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
                id="uriBot1"
                label="URI"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={uriBot1}
                onChange={e => setUriBot1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="tokenBot1"
                label="Token"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={tokenBot1}
                onChange={e => setTokenBot1(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography className={classes.heading}>Player Two</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="raceBot2"
                select
                label="Race"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={raceBot2}
                onChange={e => setRaceBot2(e.target.value)}
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
                id="uriBot2"
                label="URI"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={uriBot2}
                onChange={e => setUriBot2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="tokenBot2"
                label="Token"
                margin="dense"
                disabled={disableControls}
                className={classes.textField}
                value={tokenBot2}
                onChange={e => setTokenBot2(e.target.value)}
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
          disabled={!!!simStatusState}
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
