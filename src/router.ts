import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "./pages/system/NotFound.vue";
import HomeLayout from "./pages/Layout.vue";
import ProjectLayout from "./pages/project/Layout.vue";
import ProjectList from "./pages/project/Index.vue";
// import ProjectInfo from "./pages/project/settings/Settings.vue";
import ProjectApps from "./pages/project/apps/Index.vue";
import ProjectImages from "./pages/project/images/Images.vue";
import ProjectDeployments from "./pages/project/deployments/Deployments.vue";
import ProjectConfigs from "./pages/project/configs/Configs.vue";
import ProjectDepends from "./pages/project/depends/Depends.vue";
import ProjectSettings from "./pages/project/settings/Index.vue";

import AdminLayout from "./pages/admin/Layout.vue";
import AdminMiddlewares from "./pages/admin/middleware/Index.vue";
import AdminClusters from "./pages/admin/gateway/Index.vue";
import AdminGateways from "./pages/admin/gateway/Index.vue";
import AdminSystemGitProviders from "./pages/admin/system/git-provider/Index.vue";
import ProjectCreation from "./components/projects/ProjectCreation.vue";

const routes = [
  {
    path: "/",
    component: HomeLayout,
    children: [
      { path: "/", redirect: "/projects" },
      { path: "/done", component: () => import("./pages/system/Success.vue") },
      { path: "/projects", component: ProjectList },
      { path: "/projects/new", component: ProjectCreation },
      { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
      {
        path: "/projects/:pid",
        component: ProjectLayout,
        children: [
          //   { path: "info", meta: {}, component: ProjectInfo },
          { path: "apps", meta: {}, component: ProjectApps },
          { path: "images", meta: {}, component: ProjectImages },
          { path: "deployments", meta: {}, component: ProjectDeployments },
          { path: "configs", meta: {}, component: ProjectConfigs },
          { path: "depends", meta: {}, component: ProjectDepends },
          { path: "settings", meta: {}, component: ProjectSettings },
        ],
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "/", redirect: "/clusters" },
      { path: "middlewares", meta: {}, component: AdminMiddlewares },
      { path: "clusters", meta: {}, component: AdminClusters },
      { path: "gateways", meta: {}, component: AdminGateways },
      {
        path: "system/git-providers",
        meta: {},
        component: AdminSystemGitProviders,
      },
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
