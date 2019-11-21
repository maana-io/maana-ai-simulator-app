// --- External imports
import React, { useCallback, useState, useEffect } from "react";
import { Difficulty, Race } from "@node-sc2/core/constants/enums";
import { useQuery, useSubscription } from "react-apollo";

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
import { GameStatusQuery, OnObservation } from "./graphql";
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

const Simulator = () => {
  // --- Hooks

  const [gameId, setGameId] = useState("0");
  const { loading, error, data } = useQuery(GameStatusQuery, {
    variables: { id: gameId }
  });
  const classes = useStyles();

  // --- Handlers

  // --- Rendering

  if (loading) return "Loading...";
  if (error) return `Simulator error: ${error.message}`;

  const { gameStatus } = data;

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <GameControl id={gameId} />
      </Grid>
      <Grid item xs={6}>
        <GameStatus gameStatus={gameStatus} />
      </Grid>
    </Grid>
  );
};

export default Simulator;
