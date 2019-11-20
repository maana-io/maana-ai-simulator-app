// --- External imports

// Apollo imports
const ApolloClient = require("apollo-client");
const { createHttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { setContext } = require("apollo-link-context");

// --- Internal imports
const { getUserAuthClient } = require("../client/src/util/Auth");
const UserContext = require("../client/src/util/UserContext");

const createAuthLink = () => {
  return setContext(async (_, { headers }) => {
    // Check to make sure authentication token is up to date
    await getUserAuthClient().checkTokenValidity();

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        ...UserContext.getAuthHeader()
      }
    };
  });
};

export const createClient = ({ uri }) => {
  const authLink = createAuthLink();
  const httpLink = createHttpLink({ uri });
  const link = authLink.concat(httpLink);
  const client = new ApolloClient({
    cache: new InMemoryCache({ resultCaching: false }),
    link
  });
  return client;
};
