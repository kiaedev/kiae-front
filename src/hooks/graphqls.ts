import { StringStream } from "@codemirror/language";
import gql from "graphql-tag";

export const useGraphPods = (ns: string, app: StringStream, sub: boolean) => {
  const action = sub ? "subscription" : "query";
  return {
    gql: gql`
      ${action} ($ns: String!, $app: String!) {
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
            startedAt
          }
        }
      }
    `,
    variables: { ns, app },
  };
};
