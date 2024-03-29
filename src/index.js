// --- External imports
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

// Apollo
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
// import { split } from "apollo-link";
// import { WebSocketLink } from "apollo-link-ws";
// import { getMainDefinition } from "apollo-utilities";

// Material
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// --- Internal imports
import * as serviceWorker from "./serviceWorker";
import { App, AuthContextProvider } from "./components";
import { getUserAuthClient } from "./util/Auth";
import UserContext from "./util/UserContext";
import history from "./util/history";

const authClient = getUserAuthClient();

// Client setup
// - allow this service to be a client of a remote service
//
const uri = process.env.REACT_APP_MAANA_Q_ENDPOINT;
console.log("REACT_APP_MAANA_Q_ENDPOINT", uri);

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...UserContext.getAuthHeader()
    }
  };
});

const httpLink = createHttpLink({ uri, fetch });

// Now that subscriptions are managed through RabbitMQ, WebSocket transport is no longer needed
// as it is not production-ready and causes both lost and duplicate events.
const authHttpLink = authLink.concat(httpLink);

// // Create a WebSocket link:
// const wsLink = new WebSocketLink({
//   uri: wsUri,
//   options: {
//     reconnect: true
//   }
// });

// // using the ability to split links, you can send data to each link
// // depending on what kind of operation is being sent
// const splitLink = split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   authHttpLink
// );

const client = new ApolloClient({
  link: authHttpLink,
  // link: splitLink,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

const theme = createMuiTheme({
  palette: {
    type: "dark" // Switching the dark mode on is a single property value change.
  }
});

ReactDOM.render(
  <AuthContextProvider authClient={authClient}>
    <ApolloProvider client={client}>
      <Router history={history}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </ApolloProvider>
    ,
  </AuthContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
