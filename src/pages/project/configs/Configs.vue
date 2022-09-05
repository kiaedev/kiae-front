
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useProject } from '@/hooks/project';
const dataSource = ref<any>([]);
const columns = [
    {
        title: '名称',
        dataIndex: 'filename',
    },
    {
        title: '挂载路径',
        dataIndex: 'mountPath',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
    },
]

const { currentPid, projectGet } = useProject()
onMounted(async () => {
    const proj = await projectGet(currentPid())
    console.log(proj);

    dataSource.value = proj?.configs
})


</script>

<template>
    <div>
        <a-button>新增配置</a-button>
    </div>
    <a-table :dataSource="dataSource" :columns="columns" />
</template>

<style>
</style>
