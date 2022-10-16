import { message, Modal, notification } from "ant-design-vue";
import { BuilderBuilder, ClusterCluster, KiaeOpStatus, MiddlewareInstance } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useBuilderOperater = () => {
  const { builderSvc } = useKiaeApi();

  const handleDelete = async (m: BuilderBuilder, callback: Function) => {
    return confirmDo("构建器删除", `确定要删除构建器 ${m.name} 吗？`, () => {
      builderSvc.builderServiceDelete(m.id).then(() => {
        message.success("删除成功");
        callback();
      });
    });
  };

  return {
    handleDelete,
  };
};
