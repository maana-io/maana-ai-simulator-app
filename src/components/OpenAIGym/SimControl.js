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
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import SimulatorClientContext from "../../util/SimulatorClientContext";
import UserContext from "../../util/UserContext";
import { Codes, Modes } from "../../util/enums";
import { ListEnvironmentsQuery, RunMutation, StopMutation } from "./graphql";
import GymContext from "./state/GymContext";

// --- Constants

const RandomAgentUri =
  "https://lastknowngood.knowledge.maana.io:8443/service/01ffc8ee-bbc4-442b-a994-8565774c8167/graphql";

const DefaultEnvironment = "Taxi-v3";

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

export default () => {
  // --- Hooks
  const simulatorClientContext = useContext(SimulatorClientContext);
  const { client, sessionId } = simulatorClientContext;
  const gymContext = useContext(GymContext);

  const [environment, setEnvironment] = useLocalStorage(
    "openai-gym-env",
    DefaultEnvironment
  );

  const [environments, setEnvironments] = useState([]);

  const [agentUri, setAgentUri] = useLocalStorage(
    "openai-gym-agent-uri",
    RandomAgentUri
  );

  const [mode, setMode] = React.useState(Modes.Training);

  const { loading, error } = useQuery(ListEnvironmentsQuery, {
    onCompleted: data => {
      setEnvironments(data.listEnvironments);
    },
    client
  });

  const [run] = useMutation(RunMutation, {
    onCompleted: data => gymContext.setStatus(data.run),
    client,
    variables: {
      config: {
        sessionId,
        environmentId: environment,
        modeId: mode,
        agents: [{ uri: agentUri, token: UserContext.getAccessToken() }]
      }
    }
  });

  const [stop] = useMutation(StopMutation, {
    onCompleted: data => gymContext.setStatus(data.stop),
    client,
    variables: { sessionId }
  });

  const classes = useStyles();

  // --- Handlers

  const handleOnClickRun = async () => {
    if (gymContext.status.code.id === Codes.Running) {
      stop();
    } else {
      gymContext.setStatus({
        ...gymContext.status,
        code: { id: Codes.Starting }
      });
      run();
    }
  };

  // --- Rendering

  const disableControls =
    gymContext.status &&
    (gymContext.status.code.id === Codes.Running ||
      gymContext.status.code.id === Codes.Starting);

  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Control
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          {environments && environments.length > 0 && (
            <TextField
              id="environment"
              select
              label="Environment"
              margin="dense"
              disabled={disableControls}
              className={classes.textField}
              value={environment}
              onChange={e => setEnvironment(e.target.value)}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
            >
              {environments.map(env => (
                <MenuItem key={env.id} value={env.id}>
                  {env.id}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="agentUri"
            label="Agent URI"
            margin="dense"
            disabled={disableControls}
            className={classes.textField}
            value={agentUri}
            onChange={e => setAgentUri(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel>Mode</FormLabel>
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
      <div className={classes.buttons}>
        <Button
          disabled={!!!gymContext.status}
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
};
