import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

export const buildApolloClient = () => {
  const cache = new InMemoryCache();

  // 创建一个 http 连接：
  const httpLink = new HttpLink({
    uri: "/api/graphql",
  });

  // 创建一个 WebSocket 连接：
  const wsLink = new WebSocketLink({
    uri: `ws://localhost:8081/api/graphql`,
    options: {
      // reconnect: true,
    },
  });

  // 使用拆分连接的功能，你可以根据要发送的操作类型将数据发送到每个连接
  const link = split(
    // 根据操作类型拆分
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({ cache, link });
};
