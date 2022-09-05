<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { useSubscription } from '@vue/apollo-composable'
import { useGraphPods } from "@/hooks/graphqls"

const activeKey = ref('0')
const props = defineProps({
    app: Object,
})

const { env,name} = props.app||{}
const { gql, variables } = useGraphPods(`kiae-app-${env}`, name)
const { result, onError } = useSubscription(gql, variables)
const pods = computed(() => result.value?.pods)

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
        title: '重启次数',
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

            <a-table size="small" :columns="columns" :dataSource="pod.containers" :pagination="false"></a-table>
        </a-collapse-panel>
    </a-collapse>

    <a-empty description="No Pods" v-else />
</template>