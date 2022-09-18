
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted, onUnmounted, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useModal } from '@/hooks/modal'
import AppCreation from "@/components/apps/AppCreation.vue";
import AppDetail from '@/components/apps/AppDetail.vue'
import { useMiddlewareOperater } from "@/hooks/middleware_op";
import { renderComponent } from "@/libs/helper/component";
import { useKiaeApi } from "@/hooks/kiae";
import { useRequest } from "vue-request";
import Editor from "./Editor.vue";

const { middlewareSvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => middlewareSvc.middlewareServiceList());
const { handleDelete } = useMiddlewareOperater()

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
        title: '连接地址',
        dataIndex: ['properties', 'endpoint'],
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
    },
    {
        title: '操作',
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
                <Editor @done="run">注册实例</Editor>
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
    