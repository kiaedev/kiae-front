import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import { useI18n } from "vue-i18n";

import "ant-design-vue/dist/antd.css";
import dayjs from "@/libs/dayjs";

const app = createApp(App);
app.use(Antd);
app.use(router);
app.use(dayjs);
app.use(i18n);
app.mount("#app");
