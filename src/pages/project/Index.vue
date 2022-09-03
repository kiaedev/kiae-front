
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useModal } from '../../hooks/modal'
import { useProject } from "../../hooks/project";
import InfoEdit from "./InfoEdit.vue";

const router = useRouter()
const projects = ref<any>([])
const currentProj = ref();
const handleAppClick = (proj: any) => {
    currentProj.value = proj
    router.push(`/projects/${proj.id}/apps`)
}

onMounted(async () => {
    const { items } = await useProject()
    projects.value = items
})
const { showModal, visible, handleOk } = useModal()
</script>
<template>
    <div>
        <div>
            <a-input type="search"></a-input>
            <a-button type="primary" style="float: right" @click="showModal">创建项目</a-button>
        </div>
        <div v-for="proj in projects" :key="proj.id" @click="handleAppClick(proj)">
            <a-card hoverable style="width: 300px">
                {{ proj.name }}
            </a-card>
        </div>
    </div>

    <a-modal v-model:visible="visible" title="创建项目" @ok="handleOk" :footer="null">
        <InfoEdit></InfoEdit>
    </a-modal>
</template>
    
<style>
</style>
    