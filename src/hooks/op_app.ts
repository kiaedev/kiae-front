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
    return confirmDo("Confirm", `Restart the APP ${app.name} ?`, () => {
      appSvc.appServiceDoAction(app.id, {
        action: ActionPayloadAction.Restart,
      });
    });
  };

  const handleAppStart = (app: any, callback: Function) => {
    return confirmDo("Confirm", `Start the APP ${app.name} ?`, () => {
      appSvc
        .appServiceDoAction(app.id, { action: ActionPayloadAction.Start })
        .then(() => callback());
    });
  };

  const handleAppStop = (app: any, callback: Function) => {
    return confirmDo("Confirm", `Stop the APP ${app.name} ?`, () => {
      appSvc
        .appServiceDoAction(app.id, { action: ActionPayloadAction.Stop })
        .then(() => callback());
    });
  };

  const handleAppDelete = async (app: any, callback: Function) => {
    return confirmDo("Confirm", `Delete the APP ${app.name} ?`, () => {
      appSvc.appServiceDelete(app.id).then(() => callback());
    });
  };

  const handleAppEnvDelete = async (
    appid: string,
    env: any,
    callback: Function
  ) => {
    return confirmDo("Confirm", `Delete the Environment ${env.name} ?`, () => {
      appSvc.appServiceEnvDelete(appid, env.name).then(() => callback());
    });
  };

  const handleAppCfgDelete = async (
    appid: string,
    cfg: any,
    callback: Function
  ) => {
    return confirmDo("Confirm", `Delete the Config ${cfg.filename} ?`, () => {
      appSvc.appServiceCfgDelete(appid, cfg.name).then(() => callback());
    });
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
