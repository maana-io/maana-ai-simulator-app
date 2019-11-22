// --- External imports
import React, { useState } from "react";
import { Status } from "@node-sc2/core/constants/enums";
import { useQuery } from "react-apollo";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import Simulator from "./Simulator";
import GameStatusContext from "./GameStatusContext";
import { GameStatusQuery } from "./graphql";

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
  // --- Hooks
  const id = "0";
  const [gameStatus, setGameStatus] = useState({
    id,
    status: Status.UNKOWN,
    errors: [],
    gameLoop: 0
  });

  const { loading, error } = useQuery(GameStatusQuery, {
    variables: { id },
    pollInterval: 1000,
    onCompleted: data => {
      console.log("onCompleted: ", data);
      setGameStatus(data.gameStatus);
    }
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GameStatusContext.Provider
        value={{
          gameStatus,
          setGameStatus
        }}
      >
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    The StarCraft II Learning Environment (SC2LE) exposes
                    Blizzard Entertainment's StarCraft II Machine Learning API
                    to GraphQL agents. This is a collaboration between DeepMind
                    and Blizzard to develop StarCraft II into a rich environment
                    for RL research, providing an interface for RL agents to
                    interact with StarCraft 2, getting observations and sending
                    actions.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={9}>
            <Simulator />
          </Grid>
        </Grid>
      </GameStatusContext.Provider>
    </div>
  );
};

export default StarCraft2;
