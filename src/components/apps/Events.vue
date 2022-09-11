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
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的事件" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <!-- <a-button type="primary" size="small" style="float: right">添加路由</a-button> -->
        </a-col>
    </a-row>
    <div>
        <a-table :columns="columns" :dataSource="dataSource"></a-table>
    </div>
</template>