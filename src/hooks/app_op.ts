import { message, Modal, notification } from "ant-design-vue";
import { kiaeCfg } from "@/libs/config/kiae";
import { AppApplication, AppServiceApi, AppStatus } from "@/libs/kiae";
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

  const handleAppRestart = (app: AppApplication, callback: Function) => {
    return appOp("应用重启", `确定要重启应用 ${app.name} 吗？`, () => {
      appSvc.appServiceUpdate2(app.id, { status: AppStatus.Running });
    });
  };

  const handleAppStop = (app: AppApplication, callback: Function) => {
    return appOp("应用停止", `确定要停止应用 ${app.name} 吗？`, () => {
      appSvc
        .appServiceUpdate2(app.id, { status: AppStatus.Stopped })
        .then(() => callback());
    });
  };

  const handleAppDelete = async (app: AppApplication, callback: Function) => {
    return appOp("应用删除", `确定要删除应用 ${app.name} 吗？`, () => {
      appSvc.appServiceDelete(app.id).then(() => callback());
    });
  };

  const handleAppInstanceSettings = (values: any) => {
    appSvc.appServiceUpdate2(values.id, values);
  };

  const appOp = (title: string, tips: string, opFn: Function) => {
    Modal.confirm({
      title: title,
      content: tips,
      okText: "确定",
      cancelText: "取消",
      onOk: () => opFn(),
    });
  };

  return {
    listApps,
    handleAppCreate,
    handleAppRestart,
    handleAppStop,
    handleAppDelete,
    handleAppInstanceSettings,
  };
};
