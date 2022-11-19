import { ref } from "vue";
import { useRoute } from "vue-router";
import { ProjectServiceApi, ProjectProject } from "@/libs/kiae";

import { kiaeCfg } from "@/libs/config/kiae";
export const useProject = () => {
  const route = useRoute();
  const cli = new ProjectServiceApi(kiaeCfg);
  return {
    currentPid: () => {
      return route.params.pid.toString();
    },
    projectList: async () => {
      const cli = new ProjectServiceApi(kiaeCfg);
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
        intro: "Dev",
        created: "2022-02-11 10:30:11",
        updated: "2022-02-11 10:30:11",
      },
      {
        id: 102,
        name: "test",
        intro: "Testing",
        created: "2022-02-11 10:30:11",
        updated: "2022-02-11 10:30:11",
      },
      {
        id: 105,
        name: "stage",
        intro: "Staging",
        created: "2022-02-11 10:30:11",
        updated: "2022-02-11 10:30:11",
      },
      {
        id: 106,
        name: "prod",
        intro: "Production",
        created: "2022-02-11 10:30:11",
        updated: "2022-02-11 10:30:11",
      },
    ]),
  };
};
