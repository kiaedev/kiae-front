<script lang="ts" setup>
import { ref } from "@vue/reactivity"

const dataSource = ref()
const columns = [
    {
        title: '类型',
        dataIndex: 'created',
    },
    {
        title: 'KEY',
        dataIndex: 'level',
    },
    {
        title: 'VALUE',
        dataIndex: 'name',
    },
    {
        title: '状态',
        dataIndex: 'version',
    },
    {
        title: '创建时间',
        dataIndex: 'reporter',
    },
]
</script>

<template>
    <div>
        <a-table :columns="columns" :dataSource="dataSource"></a-table>
    </div>
</template>