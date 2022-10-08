<script lang="ts" setup>
import { ref } from "@vue/reactivity"
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useGraphEvents } from "@/hooks/graphqls";

const props = defineProps({
    app: Object,
})

const { gql, variables } = useGraphEvents(props.app?.name)
const { result, onError } = useQuery(gql, variables)
const events = computed(() => result.value?.events)

const columns = [
    {
        title: '时间',
        dataIndex: 'startedAt',
        width: 150
    },
    {
        title: '级别',
        dataIndex: 'type',
        width: 100
    },
    {
        title: '原因',
        dataIndex: 'reason',
        width: 150,
        ellipsis: true,
    },
    {
        title: '详情',
        dataIndex: 'message',
        ellipsis: true,
    },
    {
        title: '触发者',
        key: 'involvedObject',
        dataIndex: ['involvedObject', 'kind'],
        ellipsis: true,
        width: 150
    },
    {
        title: '触发次数',
        dataIndex: 'count',
        width: 100
    },
]
</script>

<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的事件" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
        </a-col>
    </a-row>
    <div>
        <a-table :columns="columns" :dataSource="events">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'involvedObject'">
                    <a-tooltip :title="record.involvedObject.name">
                        {{record.involvedObject.kind}}
                    </a-tooltip>
                </template>
                <template v-if="column.dataIndex === 'startedAt'">
                    {{ $dayjs(record.startedAt).format("MM-DD HH:mm:ss") }}
                </template>
            </template>
        </a-table>
    </div>
</template>