// --- External imports
import React, { useContext, useState } from "react";
import { useQuery, useSubscription } from "react-apollo";

import { Status, StatusId } from "@node-sc2/core/constants/enums";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

// --- Internal imports
import { OnObservation } from "./graphql";
import GameStatusContext from "./GameStatusContext";

// --- Constants

// --- Styles

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  listRoot: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  input: {
    display: "none"
  }
}));

const GameObservation = ({ id }) => {
  // --- Hooks
  const { gameStatus } = useContext(GameStatusContext);

  const [observation, setObservation] = useState();
  const { data, loading, error } = useSubscription(OnObservation, {
    variables: { id },
    onComplete: data => {
      console.log("onSubscription", data);
    }
  });

  const classes = useStyles();

  // --- Rendering

  // --- Rendering
  return (
    <Paper>
      <Typography gutterBottom variant="h5">
        Game Observation
      </Typography>
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="status"
            label="Status"
            className={classes.textField}
            margin="normal"
            value={StatusId[gameStatus.status]}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="gameLoop"
            label="Game Loop"
            className={classes.textField}
            margin="normal"
            value={gameStatus.gameLoop}
            InputProps={{
              readOnly: true
            }}
          />
        </div>
        {gameStatus.errors.length && (
          <div>
            <Typography variant="subtitle1">Errors</Typography>
            <List className={classes.listRoot}>
              {gameStatus.errors.map(error => {
                const jsError = JSON.parse(error);
                return (
                  <ListItem alignItems="flex-start">
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
      {/* {loading && "Loading..."}
      {error && `Error: ${JSON.stringify(error)}`} */}
      {observation && "Observation"}
    </Paper>
  );
};

export default GameObservation;
