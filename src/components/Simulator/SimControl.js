// --- External imports
import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo";

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

// --- Constants
const CARLA_ENDPOINT = process.env.REACT_APP_SIMULATOR_CARLA_ENDPOINT;
const OPENAI_GYM_ENDPOINT = process.env.REACT_APP_SIMULATOR_OPENAI_GYM_ENDPOINT;
const STARCRAFT2_ENDPOINT = process.env.REACT_APP_SIMULATOR_STARCRAFT2_ENDPOINT;

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
  const [carlaUri, setCarlaUri] = useState(
    process.env.REACT_APP_SIMULATOR_CARLA_ENDPOINT
  );
  const [openAiUri, setOpenAiUri] = useState(
    process.env.REACT_APP_SIMULATOR_OPENAI_GYM_ENDPOINT
  );
  const [starcraft2Uri, setStarcraft2Uri] = useState(
    process.env.REACT_APP_SIMULATOR_STARCRAFT2_ENDPOINT
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
        <Grid item xs={12} sm={12}>
          <TextField
            id="carla"
            label="CARLA"
            className={classes.textField}
            value={carlaUri}
            onChange={e => setCarlaUri(e.target.value)}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="openai-gym"
            label="OpenAI Gym"
            className={classes.textField}
            value={openAiUri}
            onChange={e => setOpenAiUri(e.target.value)}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="starcraft2"
            label="Starcraft II"
            className={classes.textField}
            value={starcraft2Uri}
            onChange={e => setStarcraft2Uri(e.target.value)}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
