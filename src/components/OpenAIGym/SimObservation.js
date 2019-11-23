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
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import { Codes, Modes } from "./enums";
import { ObserveQuery } from "./graphql";
import SimStatusContext from "./SimStatusContext";

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
  input: {
    display: "none"
  }
}));

export default function SimObservation() {
  // --- Hooks
  const { simStatus } = useContext(SimStatusContext);

  const { data } = useQuery(ObserveQuery, {
    fetchPolicy: "no-cache",
    pollInterval: 1000
    // onCompleted: data => {
    //   console.log("onCompleted2", data);
    // }
  });

  let observation = null;
  if (data) {
    observation = data.observe;
  }

  const classes = useStyles();

  // --- Rendering
  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Observation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="status"
            label="Status"
            className={classes.textField}
            margin="normal"
            value={observation ? observation.simStatus.code : simStatus.code}
            InputProps={{
              readOnly: true
            }}
          />
        </Grid>
        {simStatus.errors.length > 0 && (
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1">Errors</Typography>
            <List className={classes.listRoot}>
              {simStatus.errors.map((error, i) => {
                const jsError = JSON.parse(error);
                return (
                  <ListItem alignItems="flex-start" key={`error:${i}`}>
                    <ListItemText
                      primary={jsError.error.code}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {jsError.message}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                );
              })}
              <Divider />
            </List>
          </Grid>
        )}
        {observation && (
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1">Errors</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
