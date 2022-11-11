
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import GatewayEditor from "./GatewayEditor.vue";
import { useGatewayOperater } from "@/hooks/op_gateway";
import { useKiaeApi } from "@/hooks/kiae";
import { useRequest } from "vue-request";

const { gatewaySvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => gatewaySvc.gatewayServiceList());
const { handleDelete } = useGatewayOperater()

const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '介绍',
        dataIndex: 'intro',
    },
    {
        title: '域名',
        dataIndex: 'hosts',
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
                        <GatewayEditor @done="run">添加网关</GatewayEditor>
                    </a-button>
                </a-col>
            </a-row>
        </div>

        <a-table :dataSource="data?.data.items" :columns="columns">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'hosts'">
                    {{ record.hosts }}
                </template>
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
    