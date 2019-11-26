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
  query status {
    status {
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
  mutation stop {
    stop {
      ...StatusFields
    }
  }
  ${StatusFields}
`;

export const ObserveQuery = gql`
  query observe {
    observe {
      episode
      step
      data
      agentStats {
        lastAction
        lastReward
        totalReward
      }
      status {
        ...StatusFields
      }
    }
  }
  ${StatusFields}
`;
