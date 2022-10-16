import {
  AppServiceApi,
  AppStatus,
  ClusterServiceApi,
  DeploymentServiceApi,
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
import { invert } from "lodash";

export const useKiaeApi = () => {
  return {
    projSvc: new ProjectServiceApi(kiaeCfg),
    imageSvc: new ImageServiceApi(kiaeCfg),
    deploySvc: new DeploymentServiceApi(kiaeCfg),

    appSvc: new AppServiceApi(kiaeCfg),
    egressSvc: new EgressServiceApi(kiaeCfg),
    entrySvc: new EntryServiceApi(kiaeCfg),
    routeSvc: new RouteServiceApi(kiaeCfg),

    clusterSvc: new ClusterServiceApi(kiaeCfg),
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

export const appStatusMapper = (el: any) => {
  console.log(el);

  if (!el) return;

  const colors: any = {
    [AppStatus.Running]: "green",
    [AppStatus.Created]: "default",
    [AppStatus.Deploying]: "processing",
    [AppStatus.Unhealthy]: "warning",
    [AppStatus.Stopped]: "default",
  };
  el.extra = {
    statusColor: colors[el.status],
    statusText: invert(AppStatus)[el.status],
  };
  return el;
};
