import { ref } from "vue";
import { Configuration, AppServiceApi, ProjectServiceApi } from "../libs/kiae";

const cfg = new Configuration({ basePath: "//localhost:5173" });

export const useProject = async () => {
  const cli = new ProjectServiceApi(cfg);
  const ret = await cli.projectServiceList();
  const { items, total } = ret.data;
  return { items, total };
};

export const useImages = () => {
  return {
    images: ref([
      {
        id: 10001,
        name: "zpan",
        image: "saltbo/zpan",
        latest_tag: "v0.1.0",
        created: "2022-02-11 10:30:11",
        updated: "2022-02-11 10:30:11",
      },

      {
        id: 10002,
        name: "rslocal",
        image: "registry.kiae.dev/saltbo/rslocal",
        latest_tag: "v0.1.0",
        created: "2022-02-11 10:30:11",
        updated: "2022-02-11 10:30:11",
      },
    ]),
  };
};

export const useEnvs = () => {
  return {
    envs: ref([
      {
        id: 101,
        name: "dev",
        intro: "开发环境",
        created: "2022-02-11 10:30:11",
        updated: "2022-02-11 10:30:11",
      },
      {
        id: 102,
        name: "test",
        intro: "测试环境",
        created: "2022-02-11 10:30:11",
        updated: "2022-02-11 10:30:11",
      },
      {
        id: 105,
        name: "stage",
        intro: "仿真环境",
        created: "2022-02-11 10:30:11",
        updated: "2022-02-11 10:30:11",
      },
      {
        id: 106,
        name: "prod",
        intro: "生产环境",
        created: "2022-02-11 10:30:11",
        updated: "2022-02-11 10:30:11",
      },
    ]),
  };
};

export const useApps = async (params: any) => {
  const appService = new AppServiceApi(cfg);
  const ret = await appService.appServiceList(params.pid);
  const { items, total } = ret.data;
  return { items, total };
};
