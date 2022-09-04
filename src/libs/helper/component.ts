// renderComponent.js
import { createApp, h, provide } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { buildApolloClient } from "./graph";

export const renderComponent = function (component: any, props: any) {
  let el = document.createElement("div");
  el.setAttribute("id", "tmpcomponent");
  document.body.appendChild(el);

  let app: any = null;
  props.onClose = () => {
    setTimeout(() => {
      app.unmount();
      document.body.removeChild(el);
    }, 500);
  };

  app = createApp({
    setup() {
      provide(DefaultApolloClient, buildApolloClient());
    },

    render: () => h(component, props),
  });

  app.use(Antd);
  app.mount("#tmpcomponent");
};
