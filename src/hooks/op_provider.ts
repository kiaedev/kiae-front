import { message, Modal, notification } from "ant-design-vue";
import { ProviderProvider } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useProviderOperater = () => {
  const { providerSvc } = useKiaeApi();

  const handleDelete = async (m: ProviderProvider, callback: Function) => {
    return confirmDo(
      "GitProvider删除",
      `确定要删除GitProvider ${m.name} 吗？`,
      () => {
        providerSvc.providerServiceDelete(m.id).then(() => {
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
