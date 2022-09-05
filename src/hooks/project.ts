import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  Configuration,
  AppServiceApi,
  ProjectServiceApi,
  ProjectProject,
} from "@/libs/kiae";

const cfg = new Configuration({ basePath: "//localhost:5173" });

export const useProject = () => {
  const route = useRoute();
  const cli = new ProjectServiceApi(cfg);
  return {
    currentPid: () => {
      return route.params.pid.toString();
    },
    projectList: async () => {
      const cli = new ProjectServiceApi(cfg);
      const ret = await cli.projectServiceList();
      const { items, total } = ret.data;
      return { items, total };
    },
    projectGet: async (id: string) => {
      return (await cli.projectServiceRead(id)).data;
    },
    projectCreate: async (proj: ProjectProject) => {
      return await cli.projectServiceCreate(proj);
    },
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
