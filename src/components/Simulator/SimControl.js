// --- External imports
import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { useLocalStorage } from "react-recipes";

// Material UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import UserContext from "../../util/UserContext";

// --- Styles

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1)
  },
  formControl: {
    marginLeft: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "97%"
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

export default function SimControl({ simStatus }) {
  // --- Hooks
  const [carlaUri, setCarlaUri] = useLocalStorage(
    "carla-uri",
    process.env.REACT_APP_SIMULATOR_CARLA_ENDPOINT
  );
  const [carlaToken, setCarlaToken] = useLocalStorage("carla-token", "");
  const [openAiGymUri, setOpenAiGymUri] = useLocalStorage(
    "openai-gym-uri",
    process.env.REACT_APP_SIMULATOR_OPENAI_GYM_ENDPOINT
  );
  const [openAiGymToken, setOpenAiGymToken] = useLocalStorage(
    "openai-gym-token",
    ""
  );
  const [starcraft2Uri, setStarcraft2Uri] = useLocalStorage(
    "starcraft2-uri",
    process.env.REACT_APP_SIMULATOR_STARCRAFT2_ENDPOINT
  );
  const [starcraft2Token, setStarcraft2Token] = useLocalStorage(
    "starcraft2-token",
    ""
  );

  const classes = useStyles();

  // --- Handlers

  const handleOnClickRun = async () => {};

  // --- Rendering

  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="h5">
        Control
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <TextField
            id="carla-uri"
            label="CARLA URI"
            className={classes.textField}
            value={carlaUri}
            onChange={e => setCarlaUri(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="carla-token"
            label="CARLA Token"
            className={classes.textField}
            value={carlaToken}
            onChange={e => setCarlaToken(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="openai-gym-uri"
            label="OpenAI Gym URI"
            className={classes.textField}
            value={openAiGymUri}
            onChange={e => setOpenAiGymUri(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="openai-gym-token"
            label="OpenAI Gym Token"
            className={classes.textField}
            value={openAiGymToken}
            onChange={e => setOpenAiGymToken(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="starcraft2-uri"
            label="Starcraft II URI"
            className={classes.textField}
            value={starcraft2Uri}
            onChange={e => setStarcraft2Uri(e.target.value)}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="starcraft2-token"
            label="Starcraft II Token"
            className={classes.textField}
            value={starcraft2Token}
            onChange={e => setStarcraft2Token(e.target.value)}
            margin="normal"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
