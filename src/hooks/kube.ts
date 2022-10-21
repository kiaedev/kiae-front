import axios from "axios";

const listNamespaces = () => {
  return axios.get("/proxies/kube/api/v1/namespaces");
};

const useKubeApi = () => {
  return {
    listNamespaces,
  };
};

export default useKubeApi;
