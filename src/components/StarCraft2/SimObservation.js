// --- External imports
import React, { useContext } from "react";
import { useQuery } from "react-apollo";

import { Status } from "@node-sc2/core/constants/enums";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

// --- Internal imports
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

export default function SimObservation({ simStatus }) {
  // --- Hooks
  const client = useContext(SimulatorClientContext);

  const { data } = useQuery(ObserveQuery, {
    fetchPolicy: "no-cache",
    pollInterval: 1000,
    // onCompleted: data => {
    //   console.log("onCompleted2", data);
    // }
    client
  });

  let observation = null;
  if (data) {
    observation = data.observe;
  }

  const classes = useStyles();

  console.log("simStatus", simStatus);

  // --- Rendering
  return (
    <Paper>
      <Typography gutterBottom variant="h5">
        Observation
      </Typography>
      <form className={classes.container} noValidate autoComplete="off">
        <div>
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
          <TextField
            id="gameLoop"
            label="Game Loop"
            className={classes.textField}
            margin="normal"
            value={observation ? observation.simStatus.gameLoop : 0}
            InputProps={{
              readOnly: true
            }}
          />
        </div>
        {simStatus.errors.length > 0 && (
          <div>
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
          </div>
        )}
      </form>
      {simStatus.status === Status.IN_GAME && observation && "Observation"}
    </Paper>
  );
}
