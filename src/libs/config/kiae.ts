import { Configuration } from "@/libs/kiae";
import { notification } from "ant-design-vue";
import globalAxios from "axios";

globalAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status == 401) {
      location.href = error.response.headers.location;
      return;
    }

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

export const kiaeCfg = new Configuration({ basePath: location.origin });
