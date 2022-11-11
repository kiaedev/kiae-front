import { message, Modal, notification } from "ant-design-vue";
import { useKiaeApi, confirmDo } from "./kiae";

export const useGatewayOperater = () => {
  const { gatewaySvc } = useKiaeApi();

  const handleDelete = async (m: any, callback: Function) => {
    return confirmDo("网关删除", `确定要删除网关 ${m.name} 吗？`, () => {
      gatewaySvc.gatewayServiceDelete(m.id).then(() => {
        message.success("删除成功");
        callback();
      });
    });
  };

  return {
    handleDelete,
  };
};
