<script lang="ts" setup>
import { useRouteOperater } from "@/hooks/route_op";
import { useKiaeApi } from "@/hooks/kiae";
import { useModal, useSelect } from "@/hooks/modal"
import { ref } from "@vue/reactivity"
import { useRequest } from "vue-request";

const props = defineProps({
    app: {
        type: Object,
        required: true,
    },
})
const search = ref({})
const { routeSvc } = useKiaeApi()
const { handleEnable, handleDisable, handleDelete } = useRouteOperater()
const { data, loading, error, run } = useRequest(() => routeSvc.routeServiceList(props.app.id));
const columns = [
    {
        title: '目标服务',
        dataIndex: 'name',
    },
    {
        title: '路由数',
        dataIndex: 'path',
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
            <a-input-search v-model:value="search.route" placeholder="请输入要查询的路由" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <AccessEditor v-model:app="app" @done="run">添加访问授权</AccessEditor>
            </a-button>
        </a-col>
    </a-row>

    <div>
        <a-table :columns="columns" :dataSource="data?.data.items" size="small">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'path'">
                    <RouteEditor :value="record" v-model:app="app" @done="run">{{ record.path }}</RouteEditor>
                </template>
                <template v-if="column.dataIndex === 'methods'">
                    <span>{{ record.methods }}</span>
                </template>
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a-button size="small" type="primary" v-if="record.status=='OP_STATUS_DISABLED'"
                            @click="handleEnable(record, run)">启用</a-button>
                        <a-button size="small" v-else @click="handleDisable(record, run)">停用</a-button>
                        <a-divider type="vertical" />
                        <a-button size="small" @click="handleDelete(record, run)" danger>删除</a-button>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>