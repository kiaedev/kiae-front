<script lang="ts" setup>
import { useDependOperater } from "@/hooks/depend_op";
import { useKiaeApi } from "@/hooks/kiae"
import { useRequest } from "vue-request"

const props = defineProps({
    app: {
        type: Object,
        required: true,
    },
})

const { dependSvc } = useKiaeApi()
const { handleDelete } = useDependOperater()
const { data, loading, error, run } = useRequest(() => dependSvc.dependServiceList(props.app.id));

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
            <a-input-search placeholder="请输入要查询的依赖" style="width: 500px" />
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