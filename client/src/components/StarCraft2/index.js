// --- External imports
import React, { useCallback, useState, useEffect } from "react";
import { Difficulty, Race } from "@node-sc2/core/constants/enums";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import GameControl from "./GameControl";
import GameStatus from "./GameStatus";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 240
  }
}));

const StarCraft2 = () => {
  // --- State

  const [gameId, setGameId] = useState(0);

  // --- Other hooks

  // const runSimulation = useCallback(async () => {
  //   const response = await fetch("/starcraft2/run", { method: "POST" });
  //   const status = await response.text();
  //   setSimulationStatus(status);
  // }, []);

  // const stopSimulation = useCallback(async () => {
  //   const response = await fetch("/starcraft2/stop", { method: "POST" });
  //   const status = await response.text();
  //   setSimulationStatus(status);
  // }, []);

  // const getStatus = useCallback(async () => {
  //   const response = await fetch("/starcraft2/status");
  //   const status = await response.text();
  //   setSimulationStatus(status);
  // }, []);

  // const getUpdate = useCallback(async () => {
  //   const response = await fetch("/starcraft2/update");
  //   const data = await response.json();
  //   setSimulationStatus(data.status);
  //   setGameLoop(data.gameLoop);
  // }, []);

  // useEffect(() => {
  //   getStatus();
  // }, [getStatus, simulationStatus]);

  // useInterval(() => {
  //   if (simulationStatus === Status.Starting) {
  //     getStatus();
  //   } else if (simulationStatus === Status.Running) {
  //     getUpdate();
  //   }
  // }, 1000);

  // --- Handlers

  // --- Rendering

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="starcraft2.jpg"
                title="StarCraft II"
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  StarCraft II
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  The StarCraft II Learning Environment (SC2LE) exposes Blizzard
                  Entertainment's StarCraft II Machine Learning API to GraphQL
                  agents. This is a collaboration between DeepMind and Blizzard
                  to develop StarCraft II into a rich environment for RL
                  research, providing an interface for RL agents to interact
                  with StarCraft 2, getting observations and sending actions.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <GameControl id={gameId} />
        </Grid>
        <Grid item xs={6}>
          <GameStatus id={gameId} />
        </Grid>
      </Grid>
    </div>
  );
};

export default StarCraft2;
