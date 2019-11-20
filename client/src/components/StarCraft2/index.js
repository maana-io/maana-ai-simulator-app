// --- External imports
import { Link } from "react-router-dom";
import React, { useCallback, useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

// --- Internal imports
import { createClient } from "../../util/GraphQLClient";
import { GET_INFO } from "../../graphql/QService";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const StarCraft2 = () => {
  // --- State

  const [uriBot1, setUriBot1] = useState();
  const [simulationStatus, setSimulationStatus] = useState("UNKNOWN");
  const [infoBot1, setInfoBot1] = useState();

  // --- Other hooks

  const runSimulation = useCallback(async () => {
    console.log("useCallback: runSimulation");
    const response = await fetch("/starcraft2/run", { method: "POST" }); //"https://api.randomuser.me");
    const data = await response.json();
    console.log("runSimulation: data", data);
    setSimulationStatus(data.result);
  }, [simulationStatus]);

  const getStatus = useCallback(async () => {
    console.log("useCallback: getStatus");
    const response = await fetch("/starcraft2/status"); //"https://api.randomuser.me");
    const data = await response.json();
    console.log("getStatus: data", data);
    setSimulationStatus(data.result);
  });

  useEffect(() => {
    getStatus();
  }, [simulationStatus]);

  const [
    getInfo,
    { loading: loadingBot1, error: errorBot1, data: dataBot1 }
  ] = useLazyQuery(GET_INFO);

  // --- Lazy state update

  if (!infoBot1 && dataBot1) {
    setInfoBot1(dataBot1);
  }

  // --- Handlers

  const handleChangeBot1 = newValue => {
    // const client = createClient({ uri: bot1 });
    // setBot1Client(client);
    // getBot1Info();
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
      {infoBot1 && <h3>{infoBot1.info.name}</h3>}
      <Button onClick={handleOnClickRun}>Run</Button>
    </Paper>
  );
};

export default StarCraft2;
