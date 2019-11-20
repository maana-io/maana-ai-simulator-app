// --- External imports

// Apollo imports
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

// --- Internal imports
import { getUserAuthClient } from "./Auth";
import UserContext from "./UserContext";

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
