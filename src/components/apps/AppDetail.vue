
<script lang="ts">
import { useApplication } from '@/hooks/app_op';
import { AppApplication } from '@/libs/kiae';
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    props: {
        value: Object,
        onClose: Function,
    },
    setup(props) {
        console.log(props);
        const visible = ref(true)
        const info = ref<any>(props.value)
        const close = () => {
            visible.value = false
            props.onClose && props.onClose()
        }

        const { readApp } = useApplication()
        const refreshInfo = async () => {
            readApp(props.value?.id).then(ret => {
                info.value = ret
            })
        }

        onMounted(refreshInfo)
        return {
            visible,
            close,
            info,
            refreshInfo,
        }
    },
})
</script>

<template>
    <a-drawer v-model:visible="visible" @close="close" :destroyOnClose="true" class="custom-class"
        :title="`应用：${info?.name}`" placement="bottom" size="large">
        <template #extra>
            <AppOp v-model:value="info" @deleted="close" @done="refreshInfo">操作</AppOp>
        </template>
        <div>
            <a-descriptions bordered size="small" :column="2" style="width: 60%">
                <a-descriptions-item label="状态">
                    <a-tag color="success">{{ info?.status }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="当前版本">v1.0.0</a-descriptions-item>
                <a-descriptions-item label="实例配置">{{ info?.size }}</a-descriptions-item>
                <a-descriptions-item label="实例数量">{{ info?.replicas }}</a-descriptions-item>
                <a-descriptions-item label="负载均衡">轮询</a-descriptions-item>
                <a-descriptions-item label="访问控制">
                    <a-tag>未启用</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="访问端点">
                    <a href="">http://{{info.name}}.{{info.env}}.svc.cluster.local</a>
                    <!-- <br>
                    <a href="">https://app1.dev.openae.dev</a> -->
                </a-descriptions-item>
            </a-descriptions>
            <div>

            </div>
        </div>
        <a-tabs default-active-key="1">
            <a-tab-pane key="instance" tab="实例">
                <Instances v-model:app="info"></Instances>
            </a-tab-pane>
            <a-tab-pane key="event" tab="事件">
                <Events></Events>
            </a-tab-pane>
            <a-tab-pane key="depends" tab="依赖">
                <Middlewares></Middlewares>
            </a-tab-pane>
            <a-tab-pane key="configs" tab="配置文件">
                <Configs v-model:configs="info.configs"></Configs>
            </a-tab-pane>
            <a-tab-pane key="envs" tab="环境变量">
                <Environments></Environments>
            </a-tab-pane>
            <a-tab-pane key="routes" tab="路由策略">
                <Routes v-model:app="info"></Routes>
            </a-tab-pane>
            <a-tab-pane key="entries" tab="访问入口">
                <Entries v-model:app="info"></Entries>
            </a-tab-pane>
            <a-tab-pane key="accesses" tab="访问控制">
                <Accesses v-model:app="info"></Accesses>
            </a-tab-pane>
            <a-tab-pane key="settings" tab="高级设置">
                <Settings></Settings>
            </a-tab-pane>
        </a-tabs>
    </a-drawer>
</template>