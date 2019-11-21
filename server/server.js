// --- External imports
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const glue = require("schemaglue");
const bodyParser = require("body-parser");
const fs = require("fs");

// --- Internal imports
const { version } = require("../package");

// --- Constants
const port = 3001;

// --- GraphQL

const createGraphQLServer = ({ app, endpoint, gluePath, context }) => {
  // Glue all the schemas and resolvers together
  const options = {
    js: "**/*.js" // default
    // ignore: '**/somefileyoudonotwant.js'
  };
  const { schema: typeDefs, resolver: resolvers } = glue(gluePath, options);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

  server.applyMiddleware({ endpoint, app });

  return server;
};

// --- Express server

const app = express();
app.use(bodyParser.json({ limit: "500mb" }));

// Call context: every resolver receives this
const context = {
  app
};

// --- GraphQL servers

const graphQLServers = fs.readdirSync(`${__dirname}/api/`).map(file => {
  console.log("Generating GraphQL endpoint for", file);

  const endpoint = "starcraft2/graphql";
  return createGraphQLServer({
    app,
    endpoint,
    gluePath: `api/${endpoint}`,
    context
  });
});

// --- Serve loop

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`\n🚀 Maana Q AI Simulator v${version} serving:`);

  graphQLServers.forEach(s =>
    console.log(`  http://localhost:${port}${s.graphqlPath}`)
  );
});
