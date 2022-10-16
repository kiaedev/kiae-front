import dayjs from "dayjs";

let host = location.host;
if (import.meta.env.DEV) {
  host = import.meta.env.VITE_BACKEND_ADDR;
}

const wsOrigin = `ws://${host}/proxies`;

export const lokiTail = (query: Object, start: string) => {
  const queryStr = Object.entries(query)
    .map(([k, v]) => (v.includes("*") ? `${k}=~"${v}"` : `${k}="${v}"`))
    .join(", ");

  const wsUrl = `${wsOrigin}/loki/api/v1/tail?query=${encodeURIComponent(
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

  let wsUrl = `${wsOrigin}/kube/api/v1/namespaces/${ns}/pods/${pod}/exec?${query.toString()}`;
  return { wsUrl };
};

const useTerminal = () => {
  return {
    lokiTail,
    kubeShell,
  };
};

export default useTerminal;
