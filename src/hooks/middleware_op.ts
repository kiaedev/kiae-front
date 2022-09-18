import { message, Modal, notification } from "ant-design-vue";
import { DependDepend, KiaeOpStatus, MiddlewareInstance } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useMiddlewareOperater = () => {
  const { middlewareSvc } = useKiaeApi();

  const handleDelete = async (m: MiddlewareInstance, callback: Function) => {
    return confirmDo(
      "中间件删除",
      `确定要删除中间件 ${m.name} 吗？`,
      () => {
        middlewareSvc.middlewareServiceDelete(m.id).then(() => {
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
