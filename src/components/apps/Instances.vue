<script lang="ts" setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from "vue";
import { useSubscription } from '@vue/apollo-composable'
import { useGraphPods } from "@/hooks/graphqls"
import { escape, unescape } from "lodash";

const activeKey = ref('0')
const props = defineProps({
    app: Object,
})

const { env, name } = props.app || {}
const { gql, variables } = useGraphPods(`kiae-app-${env}`, name)
const { result, onError } = useSubscription(gql, variables)
const pods = computed(() => result.value?.pods)
const statusColor = (status: string) => {
    const colors: any = {
        "Running": "green",

        "Waiting": "warning",
        "ImagePullBackOff": "warning",
        "FailedScheduling": "warning",

        "Terminated": "red",
        "CrashLoopBackOff": "red",
        "OOMKilled": "red",
        "Evicted": "red",
        "Error": "red",
    };
    return colors[status]
}

onError(error => {
    console.log(error);
})

const columns = [
    {
        title: '容器名称',
        dataIndex: 'name',
    },
    {
        title: '镜像',
        dataIndex: 'image',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '异常重启',
        dataIndex: 'restartCount',
    },
    {
        title: '启动时间',
        dataIndex: 'created',
    },
]
</script>

<template>
    <a-collapse v-if="pods?.length>0" v-model:activeKey="activeKey">
        <a-collapse-panel v-for="(pod, idx) in pods" :key="idx" :header="pod.name">
            <template #extra>
                <span style="padding: 0 50px">版本：v1.0.0</span>
                <span style="padding: 0 50px">{{pod.status}}</span>
                <span style="padding: 0 50px">{{pod.podIP}}</span>
                <span style="padding: 0 50px">Age: 10d</span>
            </template>

            <a-table size="small" :columns="columns" :dataSource="pod.containers" :pagination="false">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'status'">
                        <a-tooltip :title="record.errMsg" :color="statusColor(record.status)">
                            <a-tag :color="statusColor(record.status)">{{ record.status }}</a-tag>
                        </a-tooltip>
                    </template>
                    <template v-if="column.dataIndex === 'restartCount'">
                        <a-popover :title="record.restartReason">
                            <template #content>
                                <pre>{{escape(record.restartErrMsg)}}</pre>
                            </template>

                            <span>{{record.restartCount}}</span>
                        </a-popover>
                    </template>
                    <!-- <template v-if="column.dataIndex === 'createdAt'">
                        {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                    </template> -->
                    <template v-else-if="column.key === 'action'">
                        <span>
                            <!-- <EntryEditor :value="record" v-model:app="app" @done="run">编辑</EntryEditor> -->
                            <!-- <a size="small" type="primary" v-if="record.status=='OP_STATUS_DISABLED'"
                                @click="handleEnable(record, run)">启用</a>
                            <a size="small" v-else @click="handleDisable(record, run)">停用</a>
                            <a-divider type="vertical" />
                            <a @click="handleDelete(record, run)">删除</a> -->
                        </span>
                    </template>
                </template>
            </a-table>
        </a-collapse-panel>
    </a-collapse>

    <a-empty description="No Pods" v-else />
</template>