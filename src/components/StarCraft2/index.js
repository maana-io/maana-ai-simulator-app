// --- External imports
import { Link } from "react-router-dom";
import React, { useState } from "react";
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
  const [clientBot1, setClientBot1] = useState();
  const [infoBot1, setInfoBot1] = useState();

  // --- Other hooks

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

  // --- Rendering

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        StarCraft II
      </Typography>
      <Typography component="p">
        This application hosts a variety of simulation environments that can be
        interfaced with any conforming GraphQL-based AI Agents
      </Typography>
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
      <Button>Start</Button>
    </Paper>
  );
};

export default StarCraft2;
