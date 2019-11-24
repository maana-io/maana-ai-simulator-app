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

export default function OpenAIGym() {
  // --- Hooks

  const [openAiGymUri, setOpenAiGymUri] = useLocalStorage(
    "openai-gym-uri",
    process.env.REACT_APP_SIMULATOR_OPENAI_GYM_ENDPOINT
  );

  const [openAiGymToken, setOpenAiGymToken] = useLocalStorage(
    "openai-gym-token",
    ""
  );

  const [client, setClient] = useState(() => {
    const client = createGraphQLClient({
      uri: openAiGymUri,
      token: openAiGymToken || UserContext.getAccessToken()
    });
    return client;
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <SimInfo
            image="openai-gym.png"
            title="OpenAI Gym"
            description="Gym is a toolkit for developing and comparing reinforcement learning algorithms. It supports teaching agents everything from walking to playing games like Pong or Pinball."
          />
          <Grid item xs={12} sm={12}>
            <TextField
              id="openai-gym-uri"
              label="OpenAI Gym URI"
              className={classes.textField}
              value={openAiGymUri}
              onChange={e => setOpenAiGymUri(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="openai-gym-token"
              label="OpenAI Gym Token"
              className={classes.textField}
              value={openAiGymToken}
              onChange={e => setOpenAiGymToken(e.target.value)}
              margin="normal"
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
