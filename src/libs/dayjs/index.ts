import  * as dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { App } from "vue";

dayjs.locale("zh-cn");

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs;
  }
}

export default {
  install: (app: App<Element>): void => {
    app.config.globalProperties.$dayjs = dayjs;
  },
};
