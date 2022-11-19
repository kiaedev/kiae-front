import { message, Modal, notification } from "ant-design-vue";
import { ClusterCluster, KiaeOpStatus, MiddlewareInstance } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useClusterOperater = () => {
  const { clusterSvc } = useKiaeApi();

  const handleDelete = async (m: any, callback: Function) => {
    return confirmDo("Confirm", `Delete the Cluster ${m.name} ?`, () => {
      clusterSvc.clusterServiceDelete(m.id).then(() => {
        message.success("succeed!");
        callback();
      });
    });
  };

  return {
    handleDelete,
  };
};
