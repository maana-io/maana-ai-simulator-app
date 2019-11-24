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

export default function Carla() {
  // --- Hooks

  const [carlaUri, setCarlaUri] = useLocalStorage(
    "carla-uri",
    process.env.REACT_APP_SIMULATOR_CARLA_ENDPOINT
  );

  const [carlaToken, setCarlaToken] = useLocalStorage("carla-token", "");

  const [client, setClient] = useState(() => {
    const client = createGraphQLClient({
      uri: carlaUri,
      token: carlaToken || UserContext.getAccessToken()
    });
    return client;
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <SimInfo
            image="carla.jpg"
            title="CARLA"
            description="CARLA has been developed from the ground up to support development, training, and validation of autonomous driving systems. In addition to open-source code and protocols, CARLA provides open digital assets (urban layouts, buildings, vehicles) that were created for this purpose and can be used freely. The simulation platform supports flexible specification of sensor suites, environmental conditions, full control of all static and dynamic actors, maps generation and much more."
          />
          <Grid item xs={12} sm={12}>
            <TextField
              id="carla-uri"
              label="CARLA URI"
              className={classes.textField}
              value={carlaUri}
              onChange={e => setCarlaUri(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="carla-token"
              label="CARLA Token"
              className={classes.textField}
              value={carlaToken}
              onChange={e => setCarlaToken(e.target.value)}
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
