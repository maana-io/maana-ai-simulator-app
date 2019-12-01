// --- External imports
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import Ansi from "ansi-to-react";

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
import { Codes } from "../../util/enums";
import SimulatorClientContext from "../../util/SimulatorClientContext";
import GymContext from "./state/GymContext";
import { ObserveQuery } from "./graphql";

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
  listRoot: {},
  ansi: {
    display: "block"
  }
}));

export default function SimObservation() {
  // --- Hooks
  const simulatorClientContext = useContext(SimulatorClientContext);
  const { client, sessionId } = simulatorClientContext;

  const { loading, error, data } = useQuery(ObserveQuery, {
    fetchPolicy: "no-cache",
    pollInterval: 500,
    client,
    variables: { sessionId }
  });

  const classes = useStyles();

  const observation = data && !loading && !!!error ? data.observe : null;

  // --- Rendering
  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Observation
      </Typography>
      <TextField
        id="session-id"
        label="Session"
        margin="dense"
        className={classes.textField}
        value={sessionId}
        InputProps={{
          readOnly: true
        }}
      />
      {loading && "Loading simulator...."}
      {error && <ErrorCard error={error} />}
      {observation && (
        <Grid container spacing={1}>
          <Grid item xs={4} sm={4}>
            <TextField
              id="status"
              label="Status"
              margin="dense"
              className={classes.textField}
              value={observation.status.code.id}
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
              value={observation.episode}
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
              value={observation.step}
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
                observation.agentStats[0]
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
                observation.agentStats[0]
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
                observation.agentStats[0]
                  ? observation.agentStats[0].totalReward
                  : [0]
              )}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          {observation.data && (
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle2" display="block" gutterBottom>
                State
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {formatArray(observation.data)}
              </Typography>
            </Grid>
          )}
          {observation.render && (
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle2" display="block" gutterBottom>
                Render
              </Typography>
              {observation.render.split("\n").map((line, i) => (
                <Ansi className={classes.ansi} key={i}>
                  {line}
                </Ansi>
              ))}
            </Grid>
          )}
          {observation.status.errors.length > 0 && (
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1">Errors</Typography>
              <List className={classes.listRoot}>
                {observation.status.errors.map((error, i) => {
                  // const jsError = JSON.parse(error);
                  return (
                    <ListItem alignItems="flex-start" key={`error:${i}`}>
                      <ListItemText
                        primaryTypographyProps={{ color: "error" }}
                        primary={error}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          )}
        </Grid>
      )}
    </Paper>
  );
}
