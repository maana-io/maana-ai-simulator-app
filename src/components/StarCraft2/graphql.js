import gql from "graphql-tag";

export const StatusFields = gql`
  fragment StatusFields on Status {
    id
    code {
      id
    }
    errors
  }
`;

export const StatusQuery = gql`
  query status($sessionId: ID!) {
    status(sessionId: $sessionId) {
      ...StatusFields
    }
  }
  ${StatusFields}
`;

export const ListEnvironmentsQuery = gql`
  query listEnvironments {
    listEnvironments {
      id
    }
  }
`;

export const RunMutation = gql`
  mutation run($config: ConfigInput!) {
    run(config: $config) {
      ...StatusFields
    }
  }
  ${StatusFields}
`;

export const StopMutation = gql`
  mutation stop($sessionId: ID!) {
    stop(sessionId: $sessionId) {
      ...StatusFields
    }
  }
  ${StatusFields}
`;

export const ObserveQuery = gql`
  query observe($sessionId: ID!) {
    observe(sessionId: $sessionId) {
      episode
      step
      data
      agentStats {
        score
        lastAction
        lastReward
        totalReward
      }
      render
      status {
        ...StatusFields
      }
    }
  }
  ${StatusFields}
`;
