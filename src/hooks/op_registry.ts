import { message, Modal, notification } from "ant-design-vue";
import { useKiaeApi, confirmDo } from "./kiae";

export const useRegistryOperater = () => {
  const { registrySvc } = useKiaeApi();

  const handleDelete = async (m: any, callback: Function) => {
    return confirmDo("Confirm", `Delete the Registry ${m.name} ?`, () => {
      registrySvc.registryServiceDelete(m.id).then(() => {
        message.success("succeed!");
        callback();
      });
    });
  };

  return {
    handleDelete,
  };
};
