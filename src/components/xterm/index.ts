import dayjs from "dayjs";

export const lokiTail = (query: Object, start: string) => {
  const queryStr = Object.entries(query)
    .map(([k, v]) => `${k}="${v}"`)
    .join(", ");

  const wsUrl = `ws://localhost:5173/proxies/loki/api/v1/tail?query=${encodeURIComponent(
    `{${queryStr}}`
  )}&start=${dayjs(start).unix()}`;

  return { wsUrl };
};

export const kubeShell = (ns: string, pod: string, optQuery?: any) => {
  let query = new URLSearchParams(
    "stdin=true&stdout=true&stderr=true&tty=true"
  );
  Object.entries(optQuery).map(([k, v]) => {
    if (!query.has(k)) query.append(k, v as string);
  });

  if (!query.has("command")) {
    query.set("command", "bash");
  }

  let wsUrl = `ws://127.0.0.1:8081/proxies/k8s/api/v1/namespaces/${ns}/pods/${pod}/exec?${query.toString()}`;
  return { wsUrl };
};

const useTerminal = () => {
  return {
    lokiTail,
    kubeShell,
  };
};

export default useTerminal;
