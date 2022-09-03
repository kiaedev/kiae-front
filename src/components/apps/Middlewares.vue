<script lang="ts" setup>
import { ref } from "@vue/reactivity"

const dataSource = ref()
const columns = [
    {
        title: '类型',
        dataIndex: 'type',
    },
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '连接信息',
        dataIndex: 'conn_info',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '创建时间',
        dataIndex: 'created',
    },
]
</script>

<template>
    <div>
        <a-table :columns="columns" :dataSource="dataSource"></a-table>
    </div>
</template>