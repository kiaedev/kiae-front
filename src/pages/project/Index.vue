
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useModal } from '@/hooks/modal'
import { useProject } from "@/hooks/project";

const router = useRouter()
const projects = ref<any>([])
const currentProj = ref();
const handleAppClick = (proj: any) => {
    currentProj.value = proj
    router.push(`/projects/${proj.id}/apps`)
}
const timeAgo = (time: string) => {
    return (new Date().getTime() - new Date(time).getTime()) / 1000 / 3600
}
const { projectList } = useProject()
const listRefresh = async () => {
    const { items } = await projectList()
    projects.value = items
}
onMounted(listRefresh)
</script>
<template>
    <div>
        <div style="height: 50px">
            <a-row type="flex">
                <a-col flex="100">
                    <a-input-search placeholder="Search..." />
                </a-col>
                <a-col flex="auto">
                    <a-button type="primary" style="float: right">
                        <ProjectCreation @done="listRefresh">创建项目</ProjectCreation>
                    </a-button>
                </a-col>
            </a-row>
        </div>

        <a-row :gutter="[16, 16]" style="padding: 0">
            <a-col v-for="proj in projects" :key="proj.id" @click="handleAppClick(proj)">
                <a-card hoverable style="width: 320px; height: 180px;">
                    <h3>{{ proj.name }}</h3>
                    <div style="color: #868e96">{{ proj.intro }}</div>
                    <a-space>
                        <!-- <span>应用数：3{{ proj.appNumber }}</span> -->
                        <!-- <span>中间件：{{ proj.middlewares.length }}</span> -->
                    </a-space>
                    <div style="position: absolute; bottom: 25px;">
                        <span>{{$dayjs(proj.createdAt).fromNow()}}</span>
                        <span style="margin: 0 10px">via</span>
                        <gitlab-filled style="color: #ed572a" v-if="proj.gitRepo.includes('gitlab')" />
                        <github-filled v-else-if="proj.gitRepo.includes('github')" />
                        <TagOutlined v-else />
                    </div>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>
    
<style>

</style>
    