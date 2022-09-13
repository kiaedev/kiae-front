
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useProject } from '@/hooks/project';
const dataSource = ref<any>([]);
const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '类型',
        dataIndex: 'type',
    },
    {
        title: '参数',
        dataIndex: 'properties',
    },
]


const { currentPid, projectGet } = useProject()
onMounted(async () => {
    const proj = await projectGet(currentPid())
    console.log(proj);

    dataSource.value = proj?.middlewares
})

</script>
    
<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的配置" style="width: 300px" />
        </a-col>
        <a-col flex="100px">
            <a-button type="primary" style="float: right">
                <ConfigEditor>添加中间件</ConfigEditor>
            </a-button>
        </a-col>
    </a-row>

    <a-table :dataSource="dataSource" :columns="columns" />
</template>
    
<style>
</style>
    