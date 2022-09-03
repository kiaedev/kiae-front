<script lang="ts" setup>
import { ref } from "@vue/reactivity"

const dataSource = ref()
const columns = [
    {
        title: '时间',
        dataIndex: 'created',
    },
    {
        title: '级别',
        dataIndex: 'level',
    },
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '详情',
        dataIndex: 'version',
    },
    {
        title: '触发者',
        dataIndex: 'reporter',
    },
]
</script>

<template>
    <div>
        <a-table :columns="columns" :dataSource="dataSource"></a-table>
    </div>
</template>