import gql from "graphql-tag";

export const useGraphPods = (ns: string, app: string) => {
  return {
    gql: gql`
      subscription ($ns: String!, $app: String!) {
        pods(ns: $ns, app: $app) {
          name
          namespace
          status
          podIP
          nodeIP
          createdAt
          containers {
            name
            image
            status
            errMsg
            restartCount
            restartReason
            restartErrMsg
          }
        }
      }
    `,
    variables: { ns, app },
  };
};
