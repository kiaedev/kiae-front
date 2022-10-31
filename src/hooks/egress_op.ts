import { message, Modal, notification } from "ant-design-vue";
import { EgressEgress, KiaeOpStatus } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useEgressOperater = () => {
  const { egressSvc } = useKiaeApi();

  const handleDelete = async (egress: any, callback: Function) => {
    return confirmDo(
      "服务依赖删除",
      `确定要删除依赖服务 ${egress.name} 吗？`,
      () => {
        egressSvc.egressServiceDelete(egress.appid, egress.id).then(() => {
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
