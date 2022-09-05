import { message, Modal, notification } from "ant-design-vue";
import { kiaeCfg } from "../libs/config/kiae";
import { AppApplication, AppServiceApi } from "../libs/kiae";
import globalAxios from "axios";

globalAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    console.log(error);
    const title = error.name;
    let message = error.message;
    if (error.response.data.message) {
      message = error.response.data.message;
    }

    notification.error({
      message: title,
      description: message,
    });
    return Promise.reject(error);
  }
);

const appSvc = new AppServiceApi(kiaeCfg);

export const useApplication = () => {
  const listApps = async (params: any) => {
    const ret = await appSvc.appServiceList(params.pid);
    const { items, total } = ret.data;
    return { items, total };
  };

  const handleAppCreate = async (app: AppApplication, callback: Function) => {
    await appSvc.appServiceCreate(app);
    message.success("创建成功");
    callback();
  };

  const handleAppDelete = (app: AppApplication, callback: Function) => {
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
    listApps,
    handleAppCreate,
    handleAppDelete,
  };
};
