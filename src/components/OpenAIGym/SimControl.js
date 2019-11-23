// --- External imports
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
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
import { ListEnvironmentsQuery, RunMutation, StopMutation } from "./graphql";
import SimStatusContext from "./SimStatusContext";
import UserContext from "../../util/UserContext";

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
  const [environment, setEnvironment] = useState();
  const [environments, setEnvironments] = useState([]);
  const [agentUri, setAgentUri] = useState(
    "https://lastknowngood.knowledge.maana.io:8443/service/b00a2def-69a1-4238-80f7-c7920aa0afd4/graphql"
  );

  const { loading, error } = useQuery(ListEnvironmentsQuery, {
    onCompleted: data => {
      console.log("listEnvironments", data);
      setEnvironment(data.listEnvironments[0].id);
      setEnvironments(data.listEnvironments);
    }
  });

  const [run] = useMutation(RunMutation, {
    variables: {
      config: {
        environment,
        agentUri
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

  if (loading) return "Loading";
  if (error) return "Error" + error;

  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Configuration
      </Typography>
      <Box>
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
        <TextField
          id="agentUri"
          label="Agent URI"
          disabled={disableControls}
          className={classes.textField}
          margin="normal"
          value={agentUri}
          onChange={e => setAgentUri(e.target.value)}
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
