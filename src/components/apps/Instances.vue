<script lang="ts" setup>
import { ref } from "@vue/reactivity";

const activeKey = ref('0')
const pods = ref([
    { name: "aaa-aaa-nnn", spec: { containers: [{ name: "aaa", image: "aaa" }] } },
    { name: "aaa-aaa-nnn", spec: { containers: [{ name: "aaa", image: "aaa" }] } },
    { name: "aaa-aaa-nnn", spec: { containers: [{ name: "aaa", image: "aaa" }] } },
])
const columns = [
    {
        title: '容器名称',
        dataIndex: 'name',
    },
    {
        title: '版本',
        dataIndex: 'version',
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
    <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel v-for="(pod, idx) in pods" :key="idx" :header="pod.name">
            <template #extra>
                <span style="padding: 0 100px">版本：v1.0.0</span>
                <span style="padding: 0 100px">Running</span>
                <span style="padding: 0 100px">172.16.42.11</span>
                <span style="padding: 0 100px">Age: 10d</span>
            </template>

            <a-table size="small" :columns="columns" :dataSource="pod.spec.containers" :pagination="false"></a-table>
        </a-collapse-panel>
    </a-collapse>
</template>