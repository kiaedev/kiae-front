import { message, Modal, notification } from "ant-design-vue";
import { DependDepend, KiaeOpStatus } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useDependOperater = () => {
  const { dependSvc } = useKiaeApi();

  const handleDelete = async (depend: DependDepend, callback: Function) => {
    return confirmDo(
      "依赖删除",
      `确定要删除依赖 ${depend.name} 吗？`,
      () => {
        dependSvc.dependServiceDelete(depend.appid, depend.id).then(() => {
          message.success("删除成功");
          callback();
        });
      }
    );
  };

  return {
    handleDelete,
  };
};
