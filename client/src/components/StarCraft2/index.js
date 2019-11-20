// --- External imports
import React, { useCallback, useState, useEffect } from "react";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// --- Internal imports

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const StarCraft2 = () => {
  // --- State

  const [uriBot1, setUriBot1] = useState();
  const [simulationStatus, setSimulationStatus] = useState("<UNKNOWN>");

  // --- Other hooks

  const runSimulation = useCallback(async () => {
    console.log("useCallback: runSimulation");
    const response = await fetch("/starcraft2/run", { method: "POST" }); //"https://api.randomuser.me");
    const data = await response.json();
    console.log("runSimulation: data", data);
    setSimulationStatus(data.result);
  }, []);

  const getStatus = useCallback(async () => {
    console.log("useCallback: getStatus");
    const response = await fetch("/starcraft2/status"); //"https://api.randomuser.me");
    const data = await response.json();
    console.log("getStatus: data", data);
    setSimulationStatus(data.result);
  }, []);

  useEffect(() => {
    getStatus();
  }, [getStatus, simulationStatus]);

  // --- Handlers

  const handleChangeBot1 = newValue => {
    setUriBot1(newValue);
  };

  const handleOnClickRun = async () => {
    console.log("handleOnClickRun");
    runSimulation();
  };

  // --- Rendering

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">StarCraft II</Typography>
      <Typography component="p">
        This application hosts a variety of simulation environments that can be
        interfaced with any conforming GraphQL-based AI Agents
      </Typography>
      <Typography variant="h5">Simulator status: {simulationStatus}</Typography>
      <form>
        <input
          value={uriBot1}
          onChange={e => handleChangeBot1(e.target.value)}
          placeholder="URI for bot 1"
          type="text"
          name="uriBot1"
          required
        />
      </form>
      <Button onClick={handleOnClickRun}>Run</Button>
    </Paper>
  );
};

export default StarCraft2;
