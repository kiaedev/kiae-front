import { message, Modal, notification } from "ant-design-vue";
import { ProviderProvider } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useProviderOperater = () => {
  const { providerSvc } = useKiaeApi();

  const handleDelete = async (m: any, callback: Function) => {
    return confirmDo("Confirm", `Delete the GitProvider ${m.name} ?`, () => {
      providerSvc.providerServiceDelete(m.id).then(() => {
        message.success("succeed!");
        callback();
      });
    });
  };

  return {
    handleDelete,
  };
};
