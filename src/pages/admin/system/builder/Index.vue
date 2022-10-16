
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { useKiaeApi } from "@/hooks/kiae";
import { useRequest } from "vue-request";
import Editor from "./Editor.vue";
import { useBuilderOperater } from "@/hooks/op_builder";

const { builderSvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => builderSvc.builderServiceList());
const { handleDelete } = useBuilderOperater()

const columns = [

    {
        title: '名称',
        width: 100,
        dataIndex: 'name',
    },
    {
        title: '描述',
        width: 300,
        ellipsis: true,
        dataIndex: 'intro',
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
            <a-input-search placeholder="请输入要查询的构建器" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <Editor @done="run">创建构建器</Editor>
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
        