<script lang="ts" setup>
import { useEgressOperater } from "@/hooks/egress_op";
import { useKiaeApi } from "@/hooks/kiae"
import { useMiddlewareOperater } from "@/hooks/middleware_op";
import { computed, ref, watch } from "vue-demi";
import { useRequest } from "vue-request"

const props = defineProps({
    app: {
        type: Object,
        required: true,
    },
})

const { middlewareSvc, egressSvc } = useKiaeApi()
const egressOp = useEgressOperater()
const { handleClaimDelete } = useMiddlewareOperater()

const handleDelete = (row: any, run: Function) => {
    type.value == 'middleware' ? handleClaimDelete(row, run) : egressOp.handleDelete(row, run)
}

const type = ref('middleware')
let service: any = () => {
    return type.value == 'middleware' ? middlewareSvc.middlewareServiceClaims(props.app.id) : egressSvc.egressServiceList(props.app.id)
}
const { data, loading, error, run } = useRequest(service)
const columns = computed(() => {
    return type.value == 'middleware' ? mwColumns : appColumns;
})
watch(type, run)

const mwColumns = [
    {
        title: '类型',
        dataIndex: 'type',
    },
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '所属实例',
        dataIndex: 'instance',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
    },
    {
        key: 'action',
    },
]
const appColumns = [
    {
        title: '类型',
        dataIndex: 'type',
    },
    {
        title: '名称',
        dataIndex: 'name',
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
        key: 'action',
    },
]
</script>

<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-radio-group v-model:value="type">
                <a-radio-button value="middleware">中间件</a-radio-button>
                <a-radio-button value="default">其他应用</a-radio-button>
            </a-radio-group>
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <DependEditor v-model:app="app" @done="run">添加依赖</DependEditor>
            </a-button>
        </a-col>
    </a-row>
    <div>
        <a-table :columns="columns" :dataSource="data?.data.items" size="small">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <!-- <EntryEditor :value="record" v-model:app="app" @done="run">编辑</EntryEditor> -->
                        <a @click="handleDelete(record, run)">删除</a>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>