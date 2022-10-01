import {
  AppServiceApi,
  EgressServiceApi,
  EntryServiceApi,
  ImageServiceApi,
  MiddlewareServiceApi,
  ProjectServiceApi,
  ProviderServiceApi,
  RouteServiceApi,
} from "@/libs/kiae";
import { kiaeCfg } from "@/libs/config/kiae";
import { Modal } from "ant-design-vue";

export const useKiaeApi = () => {
  return {
    projSvc: new ProjectServiceApi(kiaeCfg),
    imageSvc: new ImageServiceApi(kiaeCfg),

    appSvc: new AppServiceApi(kiaeCfg),
    egressSvc: new EgressServiceApi(kiaeCfg),
    entrySvc: new EntryServiceApi(kiaeCfg),
    routeSvc: new RouteServiceApi(kiaeCfg),

    providerSvc: new ProviderServiceApi(kiaeCfg),
    middlewareSvc: new MiddlewareServiceApi(kiaeCfg),
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
