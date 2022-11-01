import { message, Modal, notification } from "ant-design-vue";
import { useKiaeApi, confirmDo } from "./kiae";

export const useRegistryOperater = () => {
  const { registrySvc } = useKiaeApi();

  const handleDelete = async (m: any, callback: Function) => {
    return confirmDo("镜像源删除", `确定要删除镜像源 ${m.name} 吗？`, () => {
      registrySvc.registryServiceDelete(m.id).then(() => {
        message.success("删除成功");
        callback();
      });
    });
  };

  return {
    handleDelete,
  };
};
