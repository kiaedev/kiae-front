
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {  useProjectOperator } from '../../../hooks/project';
const dataSource = ref<any>([]);
const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '完整地址',
        dataIndex: 'image',
    },
    {
        title: '最近版本',
        dataIndex: 'latest',
    },
    {
        title: '最近更新',
        dataIndex: 'updatedAt',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
    },
]

const {currentPid,projectGet} = useProjectOperator()

onMounted(async () => {
    const proj = await projectGet(currentPid())
    console.log(proj);

    dataSource.value = proj?.images
})

</script>
    
<template>
    <div>
    </div>
    <a-table :dataSource="dataSource" :columns="columns" />
</template>

<style>
</style>
    