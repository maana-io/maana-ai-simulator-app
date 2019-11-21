import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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

export default function Carla() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="carla.jpg"
                title="CARLA"
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  CARLA - Coming Soon!
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  CARLA has been developed from the ground up to support
                  development, training, and validation of autonomous driving
                  systems. In addition to open-source code and protocols, CARLA
                  provides open digital assets (urban layouts, buildings,
                  vehicles) that were created for this purpose and can be used
                  freely. The simulation platform supports flexible
                  specification of sensor suites, environmental conditions, full
                  control of all static and dynamic actors, maps generation and
                  much more.
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
