import gql from "graphql-tag";

export const SimStatusFields = gql`
  fragment SimStatusFields on SimStatus {
    id
    code
    errors
  }
`;

export const SimStatusQuery = gql`
  query simStatus {
    simStatus {
      ...SimStatusFields
    }
  }
  ${SimStatusFields}
`;

export const ListMapsQuery = gql`
  query listMaps {
    listMaps {
      id
    }
  }
`;

export const RunMutation = gql`
  mutation run($config: ConfigInput!) {
    run(config: $config) {
      ...SimStatusFields
    }
  }
  ${SimStatusFields}
`;

export const StopMutation = gql`
  mutation stop {
    stop {
      ...SimStatusFields
    }
  }
  ${SimStatusFields}
`;

export const ObserveQuery = gql`
  query observe {
    observe {
      episode
      step
      data
      reward
      simStatus {
        ...SimStatusFields
      }
    }
  }
  ${SimStatusFields}
`;
