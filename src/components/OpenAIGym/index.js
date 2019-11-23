// --- External imports
import React from "react";

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

export default function OpenAIGym() {
  // --- Hooks
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="openai-gym.png"
                title="OpenAI Gym"
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  OpenAI Gym
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Gym is a toolkit for developing and comparing reinforcement
                  learning algorithms. It supports teaching agents everything
                  from walking to playing games like Pong or Pinball.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={9}>
          <Simulator />
        </Grid>
      </Grid>
    </div>
  );
}
