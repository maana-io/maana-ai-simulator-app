// --- External imports
import React from "react";
import { useQuery } from "react-apollo";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import ErrorCard from "../ErrorCard";
import { ObserveQuery } from "./graphql";
import { Codes } from "./enums";

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

export default function SimObservation() {
  const { loading, error, data } = useQuery(ObserveQuery, {
    fetchPolicy: "no-cache",
    pollInterval: 1000
    // onCompleted: data => {
    //   console.log("onCompleted2", data);
    // }
  });

  let observation;
  let simStatus;
  if (data) {
    observation = data.observe;
    console.log("observe", observation);
    simStatus = observation.simStatus;
  }

  // console.log("observation", observation);
  // console.log("simStatus", simStatus);

  const classes = useStyles();

  // --- Rendering
  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Observation
      </Typography>
      {loading && "Loading simulator...."}
      {error && <ErrorCard error={error} />}
      {data && (
        <Grid container spacing={3}>
          <Grid item xs={4} sm={4}>
            <TextField
              id="status"
              label="Status"
              disabled={!!!observation}
              className={classes.textField}
              margin="normal"
              value={observation ? observation.simStatus.code : Codes.Unknown}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              id="episode"
              label="Episode"
              className={classes.textField}
              margin="normal"
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
              className={classes.textField}
              margin="normal"
              value={observation ? observation.step : 0}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          {simStatus.errors.length > 0 ? (
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1">Errors</Typography>
              <List className={classes.listRoot}>
                {simStatus.errors.map((error, i) => {
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
          ) : (
            observation && (
              <React.Fragment>
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
                <Grid item xs={12} sm={12}>
                  <Typography variant="subtitle2" display="block" gutterBottom>
                    Reward
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {observation.reward}
                  </Typography>
                </Grid>
              </React.Fragment>
            )
          )}
        </Grid>
      )}
    </Paper>
  );
}
