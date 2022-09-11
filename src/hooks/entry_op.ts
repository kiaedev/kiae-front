import { message, Modal, notification } from "ant-design-vue";
import { EntryEntry, KiaeOpStatus } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useEntryOperater = () => {
  const { entrySvc } = useKiaeApi();

  const handleEnable = (entry: EntryEntry, callback: Function) => {
    return confirmDo("入口启动", `确定要启用入口 ${entry.gateway} 吗？`, () => {
      entrySvc
        .entryServiceUpdate2(entry.appid, entry.id, {
          status: KiaeOpStatus.Enabled,
        })
        .then(() => {
          message.success("启用成功");
          callback();
        });
    });
  };

  const handleDisable = (entry: EntryEntry, callback: Function) => {
    return confirmDo("入口停止", `确定要禁用入口 ${entry.gateway} 吗？`, () => {
      entrySvc
        .entryServiceUpdate2(entry.appid, entry.id, {
          status: KiaeOpStatus.Disabled,
        })
        .then(() => {
          message.success("禁用成功");
          callback();
        });
    });
  };

  const handleDelete = async (entry: EntryEntry, callback: Function) => {
    return confirmDo(
      "访问入口删除",
      `确定要删除访问入口 ${entry.host} 吗？`,
      () => {
        entrySvc.entryServiceDelete(entry.appid, entry.id).then(() => {
          message.success("删除成功");
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
