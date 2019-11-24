// --- External imports
import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// --- Internal imports
import { Codes, Modes } from "../../util/enums";
import { ListEnvironmentsQuery, RunMutation, StopMutation } from "./graphql";
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

export default function SimControl({ simStatus }) {
  // --- Hooks
  const [simStatusState, setSimStatusState] = useState(simStatus);
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
    onCompleted: data => setSimStatusState(data.run)
  });

  const [stop] = useMutation(StopMutation, {
    onCompleted: data => setSimStatusState(data.stop)
  });

  const classes = useStyles();

  // --- Handlers

  const handleOnClickRun = async () => {
    if (simStatusState.code === Codes.Running) {
      stop();
    } else {
      setSimStatusState({ ...simStatusState, code: Codes.Starting });
      run();
    }
  };

  // --- Rendering

  const disableControls =
    simStatusState &&
    (simStatusState.code === Codes.Running ||
      simStatusState.code === Codes.Starting);

  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Control
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography gutterBottom variant="caption">
            Coming Soon!
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
