import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function Carla() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image="carla.jpg" title="CARLA" />
        <CardContent>
          <Typography gutterBottom variant="h5">
            CARLA - Coming Soon!
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            CARLA has been developed from the ground up to support development,
            training, and validation of autonomous driving systems. In addition
            to open-source code and protocols, CARLA provides open digital
            assets (urban layouts, buildings, vehicles) that were created for
            this purpose and can be used freely. The simulation platform
            supports flexible specification of sensor suites, environmental
            conditions, full control of all static and dynamic actors, maps
            generation and much more.
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
  );
}
