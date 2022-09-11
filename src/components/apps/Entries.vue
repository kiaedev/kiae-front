<script lang="ts" setup>
import { ref } from "@vue/reactivity"
import { useRequest } from "vue-request"
import { useKiaeApi } from "@/hooks/kiae"
import { useEntryOperater } from "@/hooks/entry_op"

const props = defineProps({
    app: {
        type: Object,
        required: true,
    },
})
const search = ref({})
const { entrySvc } = useKiaeApi()
const { handleEnable, handleDisable, handleDelete } = useEntryOperater()
const { data, loading, error, run } = useRequest(() => entrySvc.entryServiceList(props.app.id));
const columns = [
    {
        title: '网关',
        dataIndex: 'gateway',
    },
    {
        title: '域名',
        dataIndex: 'host',
    },
    // {
    //     title: '限流值',
    //     dataIndex: 'limit',
    // },
    {
        title: '路由范围',
        dataIndex: 'scope',
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
            <a-input-search v-model:value="search.route" placeholder="请输入要查询的域名" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <EntryEditor v-model:app="app" @done="run">添加入口</EntryEditor>
            </a-button>
        </a-col>
    </a-row>

    <div>
        <a-table :columns="columns" :dataSource="data?.data.items" size="small">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'host'">
                    <a :href="`//${record.host}`" target="_blank">{{ record.host }}</a>
                </template>
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <!-- <EntryEditor :value="record" v-model:app="app" @done="run">编辑</EntryEditor> -->
                        <a size="small" type="primary" v-if="record.status=='OP_STATUS_DISABLED'"
                            @click="handleEnable(record, run)">启用</a>
                        <a size="small" v-else @click="handleDisable(record, run)">停用</a>
                        <a-divider type="vertical" />
                        <a @click="handleDelete(record, run)">删除</a>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>