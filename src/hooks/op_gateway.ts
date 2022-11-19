import { message, Modal, notification } from "ant-design-vue";
import { useKiaeApi, confirmDo } from "./kiae";

export const useGatewayOperater = () => {
  const { gatewaySvc } = useKiaeApi();

  const handleDelete = async (m: any, callback: Function) => {
    return confirmDo("Confirm", `Delete the Gateway ${m.name} ?`, () => {
      gatewaySvc.gatewayServiceDelete(m.id).then(() => {
        message.success("succeed!");
        callback();
      });
    });
  };

  return {
    handleDelete,
  };
};
