import { message, Modal, notification } from "ant-design-vue";
import { EgressEgress, KiaeOpStatus } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useEgressOperater = () => {
  const { egressSvc } = useKiaeApi();

  const handleDelete = async (egress: any, callback: Function) => {
    return confirmDo(
      "Delete Dependent",
      `Delete the Dependent ${egress.name} ?`,
      () => {
        egressSvc.egressServiceDelete(egress.appid, egress.id).then(() => {
          message.success("succeed!");
          callback();
        });
      }
    );
  };

  return {
    handleDelete,
  };
};
