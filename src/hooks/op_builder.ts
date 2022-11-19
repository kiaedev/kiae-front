import { message, Modal, notification } from "ant-design-vue";
import { BuilderBuilder, ClusterCluster, KiaeOpStatus, MiddlewareInstance } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useBuilderOperater = () => {
  const { builderSvc } = useKiaeApi();

  const handleDelete = async (m: any, callback: Function) => {
    return confirmDo("Confirm", `Delete the Builder ${m.name} ?`, () => {
      builderSvc.builderServiceDelete(m.id).then(() => {
        message.success("succeed!");
        callback();
      });
    });
  };

  return {
    handleDelete,
  };
};
