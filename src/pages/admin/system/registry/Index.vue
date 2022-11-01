
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { useKiaeApi } from "@/hooks/kiae";
import { useRequest } from "vue-request";
import Editor from "./Editor.vue";
import { useRegistryOperater } from "@/hooks/op_registry";

const { registrySvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => registrySvc.registryServiceList());
const { handleDelete } = useRegistryOperater()

const columns = [

    {
        title: '名称',
        width: 200,
        dataIndex: 'name',
    },
    {
        title: '描述',
        width: 300,
        ellipsis: true,
        dataIndex: 'intro',
    },
    {
        title: '地址',
        dataIndex: 'server',
    },
    {
        title: '用户名',
        width: 190,
        dataIndex: 'username',
    },
    {
        title: '操作',
        width: 120,
        key: 'action',
    },
]
</script>
<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的镜像源" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <Editor @done="run">添加镜像源</Editor>
            </a-button>
        </a-col>
    </a-row>

    <a-table :dataSource="data?.data?.items" :columns="columns">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'createdAt'">
                {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <a><Editor :value="record" @done="run">编辑</Editor></a>
                    <a-divider type="vertical" />
                    <a @click="handleDelete(record, run)">删除</a>
                </span>
            </template>
        </template>
    </a-table>
</template>
        
<style>

</style>
        