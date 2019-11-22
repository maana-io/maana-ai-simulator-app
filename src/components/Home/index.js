// --- External imports
import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// --- Internal imports
import Tabs from "./Tabs";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="inherit" position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Maana Q: AI Simulator
          </Typography>
          <Button href="/logout" color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Tabs />
    </div>
  );
}
