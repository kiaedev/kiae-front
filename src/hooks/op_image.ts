import { message, Modal, notification } from "ant-design-vue";
import { useKiaeApi, confirmDo } from "./kiae";

export const useImageOperater = () => {
  const { imageSvc } = useKiaeApi();

  const handleDelete = async (m: any, callback: Function) => {
    return confirmDo("Confirm", `Delete the Image ${m.image} ?`, () => {
      imageSvc.imageServiceDelete(m.pid, m.id).then(() => {
        message.success("succeed!");
        callback();
      });
    });
  };

  return {
    handleDelete,
  };
};
