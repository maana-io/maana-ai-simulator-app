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
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function ErrorCard({ error }) {
  // console.log("ErrorCard", JSON.stringify(error, null, 2));
  // console.log("- keys", Object.keys(error));
  const graphQLErrors = error["graphQLErrors"];
  const networkError = error["networkError"];

  let message = error["message"];
  let title = "GraphQL Error";
  let subheader;
  if (networkError) {
    title = "Network Error";
    subheader = networkError["statusCode"];
    message = networkError["bodyText"];
  } else {
    subheader = graphQLErrors[0].path.join(" / ");
  }

  const extraInfo = error["extraInfo"];

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="network error" className={classes.avatar}>
            {graphQLErrors ? <SettingsEthernetIcon /> : <SettingsPhoneIcon />}
          </Avatar>
        }
        title={title}
        subheader={subheader}
      />
      {message && (
        <Typography variant="body2" color="textSecondary" component="p">
          {message}
        </Typography>
      )}
      {extraInfo && (
        <Typography variant="body2" color="textSecondary" component="p">
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
