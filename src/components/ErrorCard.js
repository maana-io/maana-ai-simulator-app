import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import SettingsPhoneIcon from "@material-ui/icons/SettingsPhone";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2)
  },
  cardHeader: {
    padding: 0,
    paddingBottom: theme.spacing(2)
  },
  avatar: {
    backgroundColor: red[500]
  },
  message: {
    paddingRight: theme.spacing(1)
  },
  extraInfo: {}
}));

export default function ErrorCard({ error: rawError }) {
  let error = rawError;
  let otherError;
  if (typeof rawError === "string") {
    try {
      error = JSON.parse(rawError);
      console.log("ErrorCard: error:", JSON.stringify(error, null, 2));
    } catch {
      otherError = rawError;
      console.log("ErrorCard: otherError:", otherError);
    }
  }
  const graphQLErrors = error["graphQLErrors"];
  const networkError = error["networkError"];

  let message = error["message"];
  let title;
  let subheader;

  if (networkError) {
    title = message || "Network Error";
    subheader = networkError["statusCode"];
    message = networkError["bodyText"];
  } else if (graphQLErrors) {
    title = "GraphQL Error";
    subheader = graphQLErrors[0].path ? graphQLErrors[0].path.join(" / ") : "";
    message = error["message"];
  } else if (otherError) {
    console.log("otherError", otherError);
    title = otherError["message"];
    subheader = JSON.stringify(otherError["error"]);
    message = JSON.stringify(otherError["target"]);
  } else {
    title = "Error";
    subheader = message || "message";
    message = rawError;
  }

  const extraInfo = error["extraInfo"];

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar aria-label="network error" className={classes.avatar}>
            {graphQLErrors ? <SettingsEthernetIcon /> : <SettingsPhoneIcon />}
          </Avatar>
        }
        title={title}
        subheader={subheader}
      />
      {message && (
        <Typography
          className={classes.message}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {message}
        </Typography>
      )}
      {extraInfo && (
        <Typography
          className={classes.extraInfo}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {extraInfo}
        </Typography>
      )}
      {/* {neResult &&
        neResult.errors.map(err => (
          <Typography variant="body2" color="textSecondary" component="p">
            {err["message"]}
          </Typography>
        ))} */}
    </Card>
  );
}
