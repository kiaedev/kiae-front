import { message, Modal, notification } from "ant-design-vue";
import { KiaeOpStatus, MiddlewareInstance } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useMiddlewareOperater = () => {
  const { middlewareSvc } = useKiaeApi();

  const handleDelete = async (m: any, callback: Function) => {
    return confirmDo("Confirm", `Delete the middleware ${m.name} ?`, () => {
      middlewareSvc.middlewareServiceDelete(m.id).then(() => {
        message.success("succeed!");
        callback();
      });
    });
  };

  const handleClaimDelete = async (m: any, callback: Function) => {
    return confirmDo("Confirm", `Delete the middleware claim ${m.name} ?`, () => {
      middlewareSvc.middlewareServiceClaimDelete(m.id).then(() => {
        message.success("succeed!");
        callback();
      });
    });
  };

  return {
    handleDelete,
    handleClaimDelete
  };
};
