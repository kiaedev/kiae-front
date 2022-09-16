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
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的中间件" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <DependEditor>添加依赖</DependEditor>
            </a-button>
        </a-col>
    </a-row>
    <div>
        <a-table :columns="columns" :dataSource="dataSource"></a-table>
    </div>
</template>