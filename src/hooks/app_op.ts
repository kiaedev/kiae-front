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

  const handleAppRestart = (app: any, callback: Function) => {
    return confirmDo("应用重启", `确定要重启应用 ${app.name} 吗？`, () => {
      appSvc.appServiceDoAction(app.id, {
        action: ActionPayloadAction.Restart,
      });
    });
  };

  const handleAppStart = (app: any, callback: Function) => {
    return confirmDo("应用启动", `确定要启动应用 ${app.name} 吗？`, () => {
      appSvc
        .appServiceDoAction(app.id, { action: ActionPayloadAction.Start })
        .then(() => callback());
    });
  };

  const handleAppStop = (app: any, callback: Function) => {
    return confirmDo("应用停止", `确定要停止应用 ${app.name} 吗？`, () => {
      appSvc
        .appServiceDoAction(app.id, { action: ActionPayloadAction.Stop })
        .then(() => callback());
    });
  };

  const handleAppDelete = async (app: any, callback: Function) => {
    return confirmDo("应用删除", `确定要删除应用 ${app.name} 吗？`, () => {
      appSvc.appServiceDelete(app.id).then(() => callback());
    });
  };

  const handleAppEnvDelete = async (
    appid: string,
    env: any,
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
    cfg: any,
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
    handleAppStart,
    handleAppStop,
    handleAppRestart,
    handleAppDelete,
    handleAppInstanceSettings,
    handleAppEnvDelete,
    handleAppCfgDelete,
  };
};
