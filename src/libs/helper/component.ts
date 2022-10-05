// renderComponent.js
import { createApp, h, provide } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import dayjs from "@/libs/dayjs";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { buildApolloClient } from "./graph";

export const renderComponent = (
  component: any,
  props: any,
  callback: Function
) => {
  let el = document.createElement("div");
  el.setAttribute("id", "tmpcomponent");
  document.body.appendChild(el);

  let app: any = null;
  const apolloClient = buildApolloClient();
  props.onClose = () => {
    callback();
    setTimeout(() => {
      app.unmount();
      apolloClient.stop();
      document.body.removeChild(el);
      console.log(11123);
      
    }, 500);
  };

  app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloClient);
    },

    render: () => h(component, props),
  });

  app.use(Antd);
  app.use(dayjs);
  app.mount("#tmpcomponent");
};
