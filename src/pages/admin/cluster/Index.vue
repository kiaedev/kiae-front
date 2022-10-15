
<script lang="ts" setup>
import Editor from "./Editor.vue";
import { ref } from "@vue/reactivity";
import { useKiaeApi } from "@/hooks/kiae";
import { useRequest } from "vue-request";
import { useClusterOperater } from "@/hooks/op_cluster";

const { clusterSvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => clusterSvc.clusterServiceList());
const { handleDelete } = useClusterOperater()

const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '描述',
        dataIndex: 'intro',
    },
    {
        title: '标签',
        dataIndex: 'tags',
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
    <div>
        <div style="height: 50px">
            <a-row type="flex">
                <a-col flex="100">
                    <a-input-search placeholder="Search..." />
                </a-col>
                <a-col flex="auto">
                    <a-button type="primary" style="float: right">
                        <Editor @done="run">添加集群</Editor>
                    </a-button>
                </a-col>
            </a-row>
        </div>

        <a-table :dataSource="data?.data.items" :columns="columns">
            <template #bodyCell="{ column, record }">
                <!-- <template v-else-if="column.key === 'status'">
                        <span>
                            <a-tag :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                                {{ tag.toUpperCase() }}
                            </a-tag>
                        </span>
                    </template> -->
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
    </div>
</template>
    
<style>

</style>
    