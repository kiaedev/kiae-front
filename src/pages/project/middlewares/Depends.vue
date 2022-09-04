
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useProjectOperator } from '../../../hooks/project';
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


const {currentPid,projectGet} = useProjectOperator()
onMounted(async () => {
    const proj = await projectGet(currentPid())
    console.log(proj);

    dataSource.value = proj?.middlewares
})
    
</script>
    
<template>
    <div>
        <a-button type="primary">添加中间件</a-button>
    </div>
    <a-table :dataSource="dataSource" :columns="columns" />
</template>
    
<style>
</style>
    