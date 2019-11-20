import gql from "graphql-tag";

export const GET_INFO = gql`
  query getInfo {
    info {
      id
      name
      description
    }
  }
`;
