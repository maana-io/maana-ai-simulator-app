// --- External imports
import React from "react";

// Material UI
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import GameControl from "./GameControl";
import GameObservation from "./GameObservation";

const Simulator = () => {
  // --- Hooks

  // --- Handlers

  // --- Rendering

  return (
    <Grid container spacing={3}>
      <Grid item xs={5}>
        <GameControl />
      </Grid>
      <Grid item xs={7}>
        <GameObservation />
      </Grid>
    </Grid>
  );
};

export default Simulator;
