// --- External imports
import React, { useState } from "react";
import { useLocalStorage } from "react-recipes";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// --- Internal imports
import UserContext from "../../util/UserContext";
import createGraphQLClient from "../../util/createGraphQLClient";
import SimulatorClientContext from "../../util/SimulatorClientContext";
import SimInfo from "../SimInfo";
import SimBody from "./SimBody";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "97%"
  }
}));

export default function StarCraft2() {
  // --- Hooks

  const [starcraft2Uri, setStarcraft2Uri] = useLocalStorage(
    "starcraft2-uri",
    process.env.REACT_APP_SIMULATOR_STARCRAFT2_ENDPOINT
  );

  const [starcraft2Token, setStarcraft2Token] = useLocalStorage(
    "starcraft2-token",
    ""
  );

  const [client] = useState(() => {
    const client = createGraphQLClient({
      uri: starcraft2Uri,
      token: starcraft2Token || UserContext.getAccessToken()
    });
    return client;
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <SimInfo
            image="starcraft2.jpg"
            title="StarCraft II"
            description="The StarCraft II Learning Environment (SC2LE) exposes Blizzard Entertainment's StarCraft II Machine Learning API to GraphQL agents. This is a collaboration between DeepMind and Blizzard to develop StarCraft II into a rich environment for RL research, providing an interface for RL agents to interact with StarCraft 2, getting observations and sending actions."
          />
          <Grid item xs={12} sm={12}>
            <TextField
              id="starcraft2-uri"
              label="Starcraft II URI"
              margin="dense"
              className={classes.textField}
              value={starcraft2Uri}
              onChange={e => setStarcraft2Uri(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="starcraft2-token"
              label="Starcraft II Token"
              margin="dense"
              className={classes.textField}
              value={starcraft2Token}
              onChange={e => setStarcraft2Token(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={9} sm={9}>
          {!!!client && "Please set a valid client"}
          {!!client && (
            <SimulatorClientContext.Provider value={client}>
              <SimBody />
            </SimulatorClientContext.Provider>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
