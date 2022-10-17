
<script lang="ts" setup>
import { useProviderOperater } from "@/hooks/op_provider";
import { useKiaeApi } from "@/hooks/kiae";
import { useRequest } from "vue-request";
import Editor from "./Editor.vue";

const { providerSvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => providerSvc.providerServiceList());
const { handleDelete } = useProviderOperater()

const columns = [

    {
        title: '名称',
        width: 100,
        dataIndex: 'name',
    },
    {
        title: '授权地址',
        width: 300,
        ellipsis: true,
        dataIndex: 'authorizeUrl',
    },
    {
        title: '客户端ID',
        ellipsis: true,
        dataIndex: 'clientId',
    },
    {
        title: '创建时间',
        width: 190,
        dataIndex: 'createdAt',
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
            <a-input-search placeholder="请输入要查询的实例" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <Editor @done="run">添加仓库源</Editor>
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
                    <a>编辑</a>
                    <a-divider type="vertical" />
                    <a @click="handleDelete(record, run)">删除</a>
                </span>
            </template>
        </template>
    </a-table>
</template>
        
<style>

</style>
        