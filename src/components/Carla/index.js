// --- External imports
import React from "react";
import { useQuery } from "react-apollo";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// --- Internal imports
import ErrorCard from "../ErrorCard";
import SimInfo from "../SimInfo";
import SimControl from "./SimControl";
import SimObservation from "./SimObservation";
import { SimStatusQuery } from "./graphql";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2)
  }
}));

export default function Carla() {
  const { loading, error, data } = useQuery(SimStatusQuery, {
    pollInterval: 1000
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}>
          <SimInfo
            image="carla.jpg"
            title="CARLA"
            description="CARLA has been developed from the ground up to support development, training, and validation of autonomous driving systems. In addition to open-source code and protocols, CARLA provides open digital assets (urban layouts, buildings, vehicles) that were created for this purpose and can be used freely. The simulation platform supports flexible specification of sensor suites, environmental conditions, full control of all static and dynamic actors, maps generation and much more."
          />
        </Grid>
        <Grid item xs={9} sm={9}>
          <Grid container spacing={3}>
            {loading && "Loading simulator...."}
            {error && <ErrorCard error={error} />}
            {data && (
              <React.Fragment>
                <Grid item xs={7} sm={7}>
                  <SimControl simStatus={data.simStatus} />
                </Grid>
                <Grid item xs={5} sm={5}>
                  <SimObservation simStatus={data.simStatus} />
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
