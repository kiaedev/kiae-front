import { message, Modal } from "ant-design-vue";
import { kiaeCfg } from "../libs/config/kiae";
import { AppApplication, AppServiceApi } from "../libs/kiae";
import { defineEmits } from "vue";

const appSvc = new AppServiceApi(kiaeCfg);

export const useAppOperation = () => {
  const handleAppCreate = async (app: AppApplication, callback) => {
    await appSvc.appServiceCreate(app);
    message.success("创建成功");
    callback();
  };

  const handleAppDelete = (app: AppApplication, callback) => {
    Modal.confirm({
      title: "删除应用",
      content: `确定要删除应用 ${app.name} 吗？`,
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        if (!app.id) {
          message.error("BUG: 应用ID不能为空");
          return;
        }

        await appSvc.appServiceDelete(app.id);
        message.success("删除成功");
        callback();
      },
    });
  };

  return {
    handleAppCreate,
    handleAppDelete,
  };
};
