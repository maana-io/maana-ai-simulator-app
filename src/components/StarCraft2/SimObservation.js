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
import SimulatorClientContext from "../../util/SimulatorClientContext";
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

  console.log("status", status);

  let observation = null;
  let statusState = status;
  if (data) {
    observation = data.observe;
    statusState = observation.status;
  }

  const classes = useStyles();

  // --- Rendering
  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Observation
      </Typography>
      {loading && "Loading simulator...."}
      {error && <ErrorCard error={error} />}
      {observation && (
        <Grid container spacing={3}>
          <Grid item xs={3} sm={3}>
            <TextField
              id="status"
              label="Status"
              margin="dense"
              disabled={!!!observation}
              className={classes.textField}
              value={observation ? observation.status.code.id : status.code.id}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={3} sm={3}>
            <TextField
              id="steps"
              label="Steps"
              margin="dense"
              disabled={!!!observation}
              className={classes.textField}
              value={observation ? observation.steps : 0}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle2" display="block" gutterBottom>
              State
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            >{`[${observation.data.join(", ")}]`}</Typography>
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
    </Paper>
  );
}
