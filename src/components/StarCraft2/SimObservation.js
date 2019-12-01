// --- External imports
import React, { useContext } from "react";
import { useQuery } from "react-apollo";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import ErrorCard from "../ErrorCard";
import formatArray from "../../util/formatArray";
import SimulatorClientContext from "../../util/SimulatorClientContext";
import { ObserveQuery } from "./graphql";
import { Codes } from "../../util/enums";

// --- Constants

// --- Styles

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "97%"
  },
  listRoot: {}
}));

export default function SimObservation({ status }) {
  // --- Hooks
  const client = useContext(SimulatorClientContext);

  const { loading, error, data } = useQuery(ObserveQuery, {
    fetchPolicy: "no-cache",
    pollInterval: 1000,
    // onCompleted: data => {
    //   console.log("onCompleted2", data);
    // }
    client
  });

  let observation = null;
  let statusState = status;
  if (data) {
    observation = data.observe;
    statusState = observation.status;
  }

  const classes = useStyles();

  const showObservation = observation && !loading && !error;

  // --- Rendering
  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Observation
      </Typography>
      {loading && "Loading simulator...."}
      {error && <ErrorCard error={error} />}
      {showObservation && (
        <Grid container spacing={1}>
          <Grid item xs={4} sm={4}>
            <TextField
              id="status"
              label="Status"
              margin="dense"
              disabled={!!!observation}
              className={classes.textField}
              value={observation ? observation.status.code.id : Codes.Unknown}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              id="episode"
              label="Episode"
              margin="dense"
              className={classes.textField}
              value={observation ? observation.episode : 0}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              id="step"
              label="Step"
              margin="dense"
              className={classes.textField}
              value={observation ? observation.step : 0}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              id="last-action"
              label="Last Action"
              margin="dense"
              className={classes.textField}
              value={formatArray(
                observation && observation.agentStats[0]
                  ? observation.agentStats[0].lastAction
                  : [0]
              )}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              id="last-reward"
              label="Last Reward"
              margin="dense"
              className={classes.textField}
              value={formatArray(
                observation && observation.agentStats[0]
                  ? observation.agentStats[0].lastReward
                  : [0]
              )}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              id="total-reward"
              label="Total Reward"
              margin="dense"
              className={classes.textField}
              value={formatArray(
                observation && observation.agentStats[0]
                  ? observation.agentStats[0].totalReward
                  : [0]
              )}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle2" display="block" gutterBottom>
              State
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {formatArray(observation.data)}
            </Typography>
          </Grid>
        </Grid>
      )}
      {statusState.errors.length > 0 && (
        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1">Errors</Typography>
          <List className={classes.listRoot}>
            {statusState.errors.map((error, i) => {
              // const jsError = JSON.parse(error);
              return (
                <ListItem alignItems="flex-start" key={`error:${i}`}>
                  <ErrorCard error={error} />
                  {/* <ListItemText
                    primaryTypographyProps={{ color: "error" }}
                    primary={error}
                  /> */}
                </ListItem>
              );
            })}
          </List>
        </Grid>
      )}
    </Paper>
  );
}
