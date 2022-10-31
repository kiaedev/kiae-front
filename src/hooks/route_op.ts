import { message } from "ant-design-vue";
import { KiaeOpStatus, RouteRoute } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useRouteOperater = () => {
  const { routeSvc } = useKiaeApi();

  const handleEnable = (route: any, callback: Function) => {
    return confirmDo("路由启用", `确定要启用路由 ${route.path} 吗？`, () => {
      routeSvc
        .routeServiceUpdate2(route.appid, route.id, {
          status: KiaeOpStatus.Enabled,
        })
        .then(() => {
          message.success("启用成功");
          callback();
        });
    });
  };

  const handleDisable = (route: any, callback: Function) => {
    return confirmDo("路由禁用", `确定要禁用路由 ${route.path} 吗？`, () => {
      routeSvc
        .routeServiceUpdate2(route.appid, route.id, {
          status: KiaeOpStatus.Disabled,
        })
        .then(() => {
          message.success("禁用成功");
          callback();
        });
    });
  };

  const handleDelete = async (route: any, callback: Function) => {
    return confirmDo("路由删除", `确定要删除路由 ${route.path} 吗？`, () => {
      routeSvc.routeServiceDelete(route.appid, route.id).then(() => {
        message.success("删除成功");
        callback();
      });
    });
  };

  return {
    handleEnable,
    handleDisable,
    handleDelete,
  };
};
