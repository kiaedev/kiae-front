import {
  AppServiceApi,
  DependServiceApi,
  EntryServiceApi,
  MiddlewareServiceApi,
  ProjectServiceApi,
  RouteServiceApi,
} from "@/libs/kiae";
import { kiaeCfg } from "@/libs/config/kiae";
import { Modal } from "ant-design-vue";

export const useKiaeApi = () => {
  return {
    projSvc: new ProjectServiceApi(kiaeCfg),
    appSvc: new AppServiceApi(kiaeCfg),
    dependSvc: new DependServiceApi(kiaeCfg),
    entrySvc: new EntryServiceApi(kiaeCfg),
    routeSvc: new RouteServiceApi(kiaeCfg),

    middlewareSvc: new MiddlewareServiceApi(kiaeCfg)
  };
};

export const confirmDo = (title: string, tips: string, opFn: Function) => {
  Modal.confirm({
    title: title,
    content: tips,
    okText: "确定",
    cancelText: "取消",
    onOk: () => opFn(),
  });
};
