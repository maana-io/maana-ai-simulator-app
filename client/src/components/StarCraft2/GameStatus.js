// --- External imports
import React from "react";
import { useQuery } from "react-apollo";

// import { Difficulty, Race } from "@node-sc2/core/constants/enums";

// Material UI
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// --- Internal imports
import { GameStatusQuery } from "./queries";

// --- Constants

// --- Styles

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const GameStatus = ({ id }) => {
  // --- Hooks
  const { loading, error, data } = useQuery(GameStatusQuery, {
    variables: { id }
  });
  const classes = useStyles();

  // --- Rendering

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const { gameStatus } = data;

  return (
    <Paper>
      <Typography gutterBottom variant="h5">
        Game Status
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        status: {gameStatus.status}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        gameLoop: {gameStatus.gameLoop}
      </Typography>
    </Paper>
  );
};

export default GameStatus;
