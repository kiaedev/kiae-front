import { message, Modal, notification } from "ant-design-vue";
import { KiaeOpStatus, ProjectImage } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useImageOperater = () => {
  const { imageSvc } = useKiaeApi();

  const handleDelete = async (m: ProjectImage, callback: Function) => {
    return confirmDo("镜像删除", `确定要删除镜像实例 ${m.image} 吗？`, () => {
      imageSvc.imageServiceDelete(m.pid, m.id).then(() => {
        message.success("删除成功");
        callback();
      });
    });
  };

  return {
    handleDelete,
  };
};
