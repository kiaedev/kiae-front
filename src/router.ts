import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "./pages/error/NotFound.vue";
import ProjectLayout from "./pages/project/Layout.vue";
import ProjectList from "./pages/project/Index.vue";
// import ProjectInfo from "./pages/project/settings/Settings.vue";
import ProjectApps from "./pages/project/apps/Index.vue";
import ProjectImages from "./pages/project/images/Images.vue";
import ProjectConfigs from "./pages/project/configs/Configs.vue";
import ProjectDepends from "./pages/project/middlewares/Depends.vue";
import ProjectSettings from "./pages/project/settings/Index.vue";

const routes = [
  { path: "/", redirect: "/projects" },
  { path: "/projects", component: ProjectList },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  {
    path: "/projects/:pid",
    component: ProjectLayout,
    children: [
    //   { path: "info", meta: {}, component: ProjectInfo },
      { path: "apps", meta: {}, component: ProjectApps },
      { path: "images", meta: {}, component: ProjectImages },
      { path: "configs", meta: {}, component: ProjectConfigs },
      { path: "middlewares", meta: {}, component: ProjectDepends },
      { path: "settings", meta: {}, component: ProjectSettings },
    ],
  },
  //   {
  //     path: "/system",
  //     component: HomeLayout,
  //     children: [{ path: "appstore", meta: {}, component: Appstore }],
  //   },
  // {
  //   path: '/istio', component: IstioLayout, children: [
  //     // { path: 'gateway', meta: { kind: 'Gateway' }, component: ResourceTable },
  //     // { path: 'gateway/create', meta: { kind: 'Gateway' }, component: ResourceEditor },
  //     // { path: 'gateway/edit', meta: { kind: 'Gateway' }, component: ResourceEditor },
  //     // { path: 'virtual-service', meta: { kind: 'VirtualService' }, component: ResourceTable },
  //     // { path: 'virtual-service/edit', meta: { kind: 'VirtualService' }, component: ResourceEditor },
  //     // { path: 'destination-rule', meta: { kind: 'DestinationRule' }, component: ResourceTable },
  //     // { path: 'destination-rule/edit', meta: { kind: 'DestinationRule' }, component: ResourceEditor },
  //   ]
  // }
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
