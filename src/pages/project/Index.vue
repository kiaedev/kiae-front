
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
const { projectList } = useProject()
const listRefresh = async () => {
    const { items } = await projectList()
    projects.value = items
}
onMounted(listRefresh)
const { visible, modalOpen } = useModal()
</script>
<template>
    <div>
        <div style="height: 50px">
            <a-input type="search"></a-input>
            <a-button type="primary" style="float: right" @click="modalOpen">创建项目</a-button>
        </div>

        <a-row :gutter="[16, 16]" style="padding: 0 20px">
            <a-col v-for="proj in projects" :key="proj.id" @click="handleAppClick(proj)">
                <a-card hoverable style="width: 300px">
                    <h4>{{ proj.name }}</h4>
                    <a-space>
                        <span>应用数：3{{ proj.appNumber }}</span>
                        <!-- <span>中间件：{{ proj.middlewares.length }}</span> -->
                    </a-space>
                </a-card>
            </a-col>
        </a-row>
    </div>

    <a-modal v-model:visible="visible" title="创建项目" :footer="null">
        <ProjectCreation @done="() => { visible = false; listRefresh(); }"></ProjectCreation>
    </a-modal>
</template>
    
<style>
</style>
    