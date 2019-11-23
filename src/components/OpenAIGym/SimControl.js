// --- External imports
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-apollo";

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
import { Codes, Modes } from "./enums";
import { ListEnvironmentsQuery, RunMutation, StopMutation } from "./graphql";
import SimStatusContext from "./SimStatusContext";
import UserContext from "../../util/UserContext";

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

export default function SimControl() {
  // --- Hooks
  const { simStatus, setSimStatus } = useContext(SimStatusContext);
  const [environment, setEnvironment] = useState();
  const [environments, setEnvironments] = useState([]);
  const [agentUri, setAgentUri] = useState(
    "https://lastknowngood.knowledge.maana.io:8443/service/b00a2def-69a1-4238-80f7-c7920aa0afd4/graphql"
  );
  const [mode, setMode] = React.useState(Modes.Training);

  const { loading, error } = useQuery(ListEnvironmentsQuery, {
    onCompleted: data => {
      setEnvironment(data.listEnvironments[0].id);
      setEnvironments(data.listEnvironments);
    }
  });

  const [run] = useMutation(RunMutation, {
    variables: {
      config: {
        environment,
        mode,
        agentUri,
        token: UserContext.getAccessToken()
      }
    },
    onCompleted: data => setSimStatus(data.run)
  });

  const [stop] = useMutation(StopMutation, {
    onCompleted: data => setSimStatus(data.stop)
  });

  const classes = useStyles();

  // --- Handlers

  const handleOnClickRun = async () => {
    if (simStatus.code === Codes.Running) {
      stop();
    } else {
      setSimStatus({ ...simStatus, code: Codes.Starting });
      run();
    }
  };

  // --- Rendering

  const disableControls =
    simStatus &&
    (simStatus.code === Codes.Running || simStatus.code === Codes.Starting);

  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Control
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="environment"
            select
            label="Environment"
            disabled={disableControls}
            className={classes.textField}
            value={environment || ""}
            onChange={e => setEnvironment(e.target.value)}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
          >
            {environments.map(env => (
              <MenuItem key={env.id} value={env.id}>
                {env.id}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="agentUri"
            label="Agent URI"
            disabled={disableControls}
            className={classes.textField}
            margin="normal"
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
          disabled={!!!simStatus}
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
