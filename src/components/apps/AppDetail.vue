
<script lang="ts" setup>
import { appStatusMapper, useKiaeApi } from '@/hooks/kiae';
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue'
import { useRequest } from 'vue-request';

const props = defineProps({
    value: Object,
    onClose: Function,
})

const visible = ref(true)
const close = () => {
    visible.value = false
    props.onClose && props.onClose()
}

const { appSvc } = useKiaeApi()
const { data, loading, run } = useRequest(() => appSvc.appServiceRead(props.value?.id));
const info = computed(() => appStatusMapper(data?.value?.data || props.value))
</script>

<template>
    <a-drawer v-model:visible="visible" @close="close" :destroyOnClose="true" class="custom-class"
        :title="`App: ${info?.name}, Env: ${info?.env}`" placement="bottom" size="large">
        <template #extra>
            <AppOp v-model:value="info" @deleted="close" @done="run">Operation</AppOp>
        </template>
        <div>
            <a-descriptions bordered size="small" :column="2" style="width: 60%">
                <a-descriptions-item label="Status">
                    <a-tag :color="info.extra.statusColor">{{ info.extra.statusText }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="Version">v1.0.0</a-descriptions-item>
                <a-descriptions-item label="Instace">{{ info?.size }}</a-descriptions-item>
                <a-descriptions-item label="Replicas">{{ info?.replicas }}</a-descriptions-item>
                <a-descriptions-item label="Loadbalance">Round robin</a-descriptions-item>
                <a-descriptions-item label="AccessControl">
                    <a-tag>Not Enabled</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="Endpoint">
                    <a href="">http://{{ info?.name }}.{{ info?.env }}.svc.cluster.local</a>
                    <!-- <br>
                    <a href="">https://app1.dev.openae.dev</a> -->
                </a-descriptions-item>
            </a-descriptions>
            <div>

            </div>
        </div>
        <a-tabs default-active-key="1">
            <a-tab-pane key="instance" tab="Instances">
                <Instances v-model:app="info"></Instances>
            </a-tab-pane>
            <a-tab-pane key="events" tab="Events">
                <Events v-model:app="info"></Events>
            </a-tab-pane>
            <a-tab-pane key="logs" tab="Logs">
                <PodLogs v-model:app="info"></PodLogs>
            </a-tab-pane>
            <a-tab-pane key="depends" tab="Dependents">
                <Depends v-model:app="info"></Depends>
            </a-tab-pane>
            <a-tab-pane key="configs" tab="Configs">
                <Configs v-model:appid="info.id" v-model:configs="info.configs" @refresh="run"></Configs>
            </a-tab-pane>
            <a-tab-pane key="envs" tab="Environments">
                <Environments v-model:appid="info.id" v-model:envs="info.environments" @refresh="run">
                </Environments>
            </a-tab-pane>
            <a-tab-pane key="routes" tab="Routes">
                <Routes v-model:app="info"></Routes>
            </a-tab-pane>
            <a-tab-pane key="entries" tab="Endpoints">
                <Entries v-model:app="info"></Entries>
            </a-tab-pane>
            <a-tab-pane key="accesses" tab="AccessControls">
                <Accesses v-model:app="info"></Accesses>
            </a-tab-pane>
            <a-tab-pane key="settings" tab="More Settings">
                <Settings></Settings>
            </a-tab-pane>
        </a-tabs>
    </a-drawer>
</template>