import { Configuration } from "@/libs/kiae";
import { notification } from "ant-design-vue";
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

export const kiaeCfg = new Configuration({ basePath: "//localhost:5173" });
