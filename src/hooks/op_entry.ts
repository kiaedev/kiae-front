import { message, Modal, notification } from "ant-design-vue";
import { EntryEntry, KiaeOpStatus } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useEntryOperater = () => {
  const { entrySvc } = useKiaeApi();

  const handleEnable = (entry: any, callback: Function) => {
    return confirmDo(
      "Confirm",
      `Enable the endpoint ${entry.gateway} ?`,
      () => {
        entrySvc
          .entryServiceUpdate2(entry.appid, entry.id, {
            status: KiaeOpStatus.Enabled,
          })
          .then(() => {
            message.success("succeed!");
            callback();
          });
      }
    );
  };

  const handleDisable = (entry: any, callback: Function) => {
    return confirmDo(
      "Confirm",
      `Disable the endpoint ${entry.gateway} ?`,
      () => {
        entrySvc
          .entryServiceUpdate2(entry.appid, entry.id, {
            status: KiaeOpStatus.Disabled,
          })
          .then(() => {
            message.success("succeed!");
            callback();
          });
      }
    );
  };

  const handleDelete = async (entry: any, callback: Function) => {
    return confirmDo(
      "Confirm",
      `Delete the Endpoint ${entry.host} ?`,
      () => {
        entrySvc.entryServiceDelete(entry.appid, entry.id).then(() => {
          message.success("succeed!");
          callback();
        });
      }
    );
  };

  return {
    handleEnable,
    handleDisable,
    handleDelete,
  };
};
