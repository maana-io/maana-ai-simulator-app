import gql from "graphql-tag";

export const GameStatusFields = gql`
  fragment GameStatusFields on GameStatus {
    id
    status
    errors
    gameLoop
  }
`;

export const GameStatusQuery = gql`
  query gameStatus($id: ID!) {
    gameStatus(id: $id) {
      ...GameStatusFields
    }
  }
  ${GameStatusFields}
`;

export const RunMutation = gql`
  mutation run($config: ConfigInput!) {
    run(config: $config) {
      ...GameStatusFields
    }
  }
  ${GameStatusFields}
`;

export const StopMutation = gql`
  mutation stop($id: ID!) {
    stop(id: $id) {
      ...GameStatusFields
    }
  }
  ${GameStatusFields}
`;

export const OnObservation = gql`
  subscription onObservation($id: ID!) {
    onObservation(id: $id) {
      gameStatus {
        ...GameStatusFields
      }
    }
  }
`;
