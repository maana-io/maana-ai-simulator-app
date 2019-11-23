// --- External imports
import React, { useState } from "react";
import { useQuery } from "react-apollo";

// Material UI
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import GameControl from "./SimControl";
import GameObservation from "./SimObservation";
import SimStatusContext from "./SimStatusContext";
import { SimStatusQuery } from "./graphql";

export default function Simulator() {
  // --- Hooks

  const [simStatus, setSimStatus] = useState(null);

  const { loading, error } = useQuery(SimStatusQuery, {
    pollInterval: 100000,
    onCompleted: data => {
      console.log("onCompleted: ", data);
      if (data) setSimStatus(data.simStatus);
    }
  });

  // --- Handlers

  // --- Rendering

  return (
    <SimStatusContext.Provider
      value={{
        simStatus,
        setSimStatus
      }}
    >
      {loading && "Loading simulator...."}
      {error && `Error loading simulator: ${error}`}
      {simStatus && (
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <GameControl />
          </Grid>
          <Grid item xs={7}>
            <GameObservation />
          </Grid>
        </Grid>
      )}
    </SimStatusContext.Provider>
  );
}
