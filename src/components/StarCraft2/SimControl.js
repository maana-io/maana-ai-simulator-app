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
import SimStatusContext from "./SimStatusContext";

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

export default function SimControl() {
  // --- Hooks
  const { simStatus, setSimStatus } = useContext(SimStatusContext);

  const [raceBot1, setRaceBot1] = useState(Race.RANDOM);
  const [raceBot2, setRaceBot2] = useState(Race.RANDOM);
  const [uriBot1, setUriBot1] = useState("Computer");
  const [uriBot2, setUriBot2] = useState("Computer");

  const [run] = useMutation(RunMutation, {
    variables: { config: { id: simStatus.id } },
    onCompleted: data => setSimStatus(data.run)
  });

  const [stop] = useMutation(StopMutation, {
    variables: { id: simStatus.id },
    onCompleted: data => setSimStatus(data.stop)
  });

  const classes = useStyles();

  // --- Handlers

  const handleOnClickRun = async () => {
    if (simStatus.Status === Status.IN_GAME) {
      stop();
    } else {
      setSimStatus({ ...simStatus, status: Status.LAUNCHED });
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
