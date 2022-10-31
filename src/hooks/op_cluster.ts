import { message, Modal, notification } from "ant-design-vue";
import { ClusterCluster, KiaeOpStatus, MiddlewareInstance } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useClusterOperater = () => {
  const { clusterSvc } = useKiaeApi();

  const handleDelete = async (m: any, callback: Function) => {
    return confirmDo("集群删除", `确定要删除集群 ${m.name} 吗？`, () => {
      clusterSvc.clusterServiceDelete(m.id).then(() => {
        message.success("删除成功");
        callback();
      });
    });
  };

  return {
    handleDelete,
  };
};
