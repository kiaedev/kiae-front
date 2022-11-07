import { createRouter, createWebHistory } from "vue-router";
import NotFound from "./pages/system/NotFound.vue";
import HomeLayout from "./pages/Layout.vue";
import ProjectLayout from "./pages/project/Layout.vue";
import ProjectList from "./pages/project/Index.vue";
import ProjectApps from "./pages/project/apps/Index.vue";
import ProjectImages from "./pages/project/images/Images.vue";
import ProjectDeployments from "./pages/project/deployments/Deployments.vue";
import ProjectConfigs from "./pages/project/configs/Configs.vue";
import ProjectDepends from "./pages/project/depends/Depends.vue";
import ProjectSettings from "./pages/project/settings/Index.vue";

import AdminLayout from "./pages/admin/Layout.vue";
import AdminOverview from "./pages/admin/overview/Index.vue";
import AdminMiddlewares from "./pages/admin/middleware/Index.vue";
import AdminClusters from "./pages/admin/cluster/Index.vue";
import AdminGatewayInstances from "./pages/admin/gateway/Index.vue";
import AdminGatewayEntries from "./pages/admin/gateway/Gateway.vue";
import AdminSystemGitProviders from "./pages/admin/system/git-provider/Index.vue";
import AdminSystemBuilders from "./pages/admin/system/builder/Index.vue";
import AdminSystemRegistries from "./pages/admin/system/registry/Index.vue";
import ProjectCreation from "./components/projects/ProjectCreation.vue";
import PodShell from "./components/apps/PodShell.vue";

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
      { path: "", redirect: "/admin/overview" },
      { path: "overview", meta: {}, component: AdminOverview },
      { path: "middlewares", meta: {}, component: AdminMiddlewares },
      { path: "clusters", meta: {}, component: AdminClusters },
      { path: "gateway/instances", meta: {}, component: AdminGatewayInstances },
      { path: "gateway/entries", meta: {}, component: AdminGatewayEntries },
      {
        path: "system/git-providers",
        meta: {},
        component: AdminSystemGitProviders,
      },
      {
        path: "system/registries",
        meta: {},
        component: AdminSystemRegistries,
      },
      {
        path: "system/builders",
        meta: {},
        component: AdminSystemBuilders,
      },
    ],
  },
  {
    name: "PodShell",
    path: "/webshell/namespaces/:ns/pods/:pod",
    component: PodShell,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
