// --- External imports
import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

// --- Internal imports

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  },
  media: {
    height: 240
  }
}));

export default function OpenAIGym() {
  // --- Hooks
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <CardMedia
            className={classes.media}
            image="openai-gym.png"
            title="OpenAI Gym"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography gutterBottom variant="h5">
            OpenAI Gym
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Gym is a toolkit for developing and comparing reinforcement learning
            algorithms. It supports teaching agents everything from walking to
            playing games like Pong or Pinball.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
