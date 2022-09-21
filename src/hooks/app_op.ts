import { message } from "ant-design-vue";
import {
  AppApplication,
  ActionPayloadAction,
  AppEnvironment,
  AppConfiguration,
} from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useApplication = () => {
  const { appSvc } = useKiaeApi();
  const listApps = async (params: any) => {
    const ret = await appSvc.appServiceList(params.pid);
    const { items, total } = ret.data;
    return { items, total };
  };

  const readApp = async (id: string) => {
    return (await appSvc.appServiceRead(id)).data;
  };

  const handleAppCreate = async (app: AppApplication, callback: Function) => {
    await appSvc.appServiceCreate(app);
    message.success("创建成功");
    callback();
  };

  const handleAppRestart = (app: AppApplication, callback: Function) => {
    return confirmDo("应用重启", `确定要重启应用 ${app.name} 吗？`, () => {
      appSvc.appServiceDoAction(app.id, {
        action: ActionPayloadAction.Restart,
      });
    });
  };

  const handleAppStart = (app: AppApplication, callback: Function) => {
    return confirmDo("应用启动", `确定要启动应用 ${app.name} 吗？`, () => {
      appSvc
        .appServiceDoAction(app.id, { action: ActionPayloadAction.Start })
        .then(() => callback());
    });
  };

  const handleAppStop = (app: AppApplication, callback: Function) => {
    return confirmDo("应用停止", `确定要停止应用 ${app.name} 吗？`, () => {
      appSvc
        .appServiceDoAction(app.id, { action: ActionPayloadAction.Stop })
        .then(() => callback());
    });
  };

  const handleAppDelete = async (app: AppApplication, callback: Function) => {
    return confirmDo("应用删除", `确定要删除应用 ${app.name} 吗？`, () => {
      appSvc.appServiceDelete(app.id).then(() => callback());
    });
  };

  const handleAppEnvDelete = async (
    appid: string,
    env: AppEnvironment,
    callback: Function
  ) => {
    return confirmDo(
      "环境变量删除",
      `确定要删除环境变量 ${env.name} 吗？`,
      () => {
        appSvc.appServiceEnvDelete(appid, env.name).then(() => callback());
      }
    );
  };

  const handleAppCfgDelete = async (
    appid: string,
    cfg: AppConfiguration,
    callback: Function
  ) => {
    return confirmDo(
      "配置文件删除",
      `确定要删除应用 ${cfg.filename} 吗？`,
      () => {
        appSvc.appServiceCfgDelete(appid, cfg.name).then(() => callback());
      }
    );
  };

  const handleAppInstanceSettings = (values: any, callback: Function) => {
    appSvc.appServiceUpdate2(values.id, values).then(() => callback());
  };

  return {
    listApps,
    readApp,
    handleAppCreate,
    handleAppStart,
    handleAppStop,
    handleAppRestart,
    handleAppDelete,
    handleAppInstanceSettings,
    handleAppEnvDelete,
    handleAppCfgDelete,
  };
};
