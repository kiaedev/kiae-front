<script lang="ts" setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from "vue";
import { useSubscription } from '@vue/apollo-composable'
import { useGraphPods } from "@/hooks/graphqls"
import { escape, unescape } from "lodash";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const activeKey = ref('0')
const props = defineProps({
    app: Object,
})

const { env, name } = props.app || {}
const { gql, variables } = useGraphPods(`kiae-app${env}`, name, true)
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

const openPodShell = (pod: any, container: string) => {
    window.open(`/webshell/namespaces/${pod.namespace}/pods/${pod.name}?container=${container}`, '_blank');
}

const columns = [
    {
        title: 'Container',
        dataIndex: 'name',
    },
    {
        title: 'Image',
        dataIndex: 'image',
    },
    {
        title: t('status'),
        dataIndex: 'status',
    },
    {
        title: 'Restart',
        dataIndex: 'restartCount',
    },
    {
        title: 'StartedAt',
        dataIndex: 'startedAt',
    },
    {
        key: 'action',
        title: 'Operation',
        width: '150px'
    }
]
</script>

<template>
    <a-collapse v-if="pods?.length > 0" v-model:activeKey="activeKey">
        <a-collapse-panel v-for="(pod, idx) in pods" :key="idx" :header="pod.name">
            <template #extra>
                <span style="padding: 0 50px">Version: v1.0.0</span>
                <span style="padding: 0 50px">{{ pod.status }}</span>
                <span style="padding: 0 50px">{{ pod.podIP }}</span>
                <span style="padding: 0 50px">Age: {{ $dayjs(pod.createdAt).fromNow(true) }}</span>
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
                                <pre>{{ escape(record.restartErrMsg) }}</pre>
                            </template>

                            <span>{{ record.restartCount }}</span>
                        </a-popover>
                    </template>
                    <template v-if="column.dataIndex === 'startedAt'">
                        {{ $dayjs(record.startedAt).format("YYYY-MM-DD HH:mm:ss") }}
                    </template>
                    <template v-else-if="column.key === 'action'">
                        <a-space>
                            <!-- <EntryEditor :value="record" v-model:app="app" @done="run">{{ $t('btn.edit') }}</EntryEditor> -->
                            <!-- <a size="small" type="primary" v-if="record.status=='OP_STATUS_DISABLED'"
                                @click="handleEnable(record, run)">{{ $t('btn.enable') }}</a>
                            <a size="small" v-else @click="handleDisable(record, run)">{{ $t('btn.disable') }}</a>
                            <a-divider type="vertical" />
                            <a @click="handleDelete(record, run)">{{ $t('btn.delete') }}</a> -->
                            <a @click="openPodShell(pod, record.name)">Shell</a>
                            <!-- <a>Logs</a> -->
                        </a-space>
                    </template>
                </template>
            </a-table>
        </a-collapse-panel>
    </a-collapse>

    <a-empty description="No Pods" v-else />
</template>