// --- External imports
const fetch = require("node-fetch");

// Apollo imports
const { ApolloClient } = require("apollo-client");
const { createHttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { setContext } = require("apollo-link-context");

// --- Internal imports

const createAuthLink = token => {
  return setContext(async (_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });
};

const createClient = ({ uri, token }) => {
  const authLink = createAuthLink();
  const httpLink = createHttpLink({ uri, fetch });
  const link = authLink.concat(httpLink);
  const client = new ApolloClient({
    cache: new InMemoryCache({ resultCaching: false }),
    link
  });
  return client;
};

module.exports = {
  createClient
};
