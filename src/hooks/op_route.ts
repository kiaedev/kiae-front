import { message } from "ant-design-vue";
import { KiaeOpStatus, RouteRoute } from "@/libs/kiae";
import { useKiaeApi, confirmDo } from "./kiae";

export const useRouteOperater = () => {
  const { routeSvc } = useKiaeApi();

  const handleEnable = (route: any, callback: Function) => {
    return confirmDo("Confirm", `Enable the Route ${route.path} ?`, () => {
      routeSvc
        .routeServiceUpdate2(route.appid, route.id, {
          status: KiaeOpStatus.Enabled,
        })
        .then(() => {
          message.success("succeed!");
          callback();
        });
    });
  };

  const handleDisable = (route: any, callback: Function) => {
    return confirmDo("Confirm", `Disable the Route ${route.path} ?`, () => {
      routeSvc
        .routeServiceUpdate2(route.appid, route.id, {
          status: KiaeOpStatus.Disabled,
        })
        .then(() => {
          message.success("succeed!");
          callback();
        });
    });
  };

  const handleDelete = async (route: any, callback: Function) => {
    return confirmDo("Confirm", `Delete the Route ${route.path} ?`, () => {
      routeSvc.routeServiceDelete(route.appid, route.id).then(() => {
        message.success("succeed!");
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
