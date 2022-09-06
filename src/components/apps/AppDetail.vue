
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: {
        value: Object,
        onClose: Function,
    },
    setup(props) {
        console.log(props);
        const visible = ref(true)
        const close = () => {
            visible.value = false
            props.onClose && props.onClose()
        }
        return {
            visible,
            close,
        }
    },
})
</script>

<template>
    <a-drawer v-model:visible="visible" @close="close" :destroyOnClose="true" class="custom-class"
        :title="`应用：${value?.name}`" placement="bottom" size="large">
        <template #extra>
            <AppOp v-model:value="value" @deleted="close">操作</AppOp>
        </template>
        <div>
            <a-descriptions bordered size="small" :column="2" style="width: 60%">
                <a-descriptions-item label="状态">
                    <a-tag color="success">{{ value?.status }}</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="当前版本">v1.0.0</a-descriptions-item>
                <a-descriptions-item label="实例配置">{{ value?.size }}</a-descriptions-item>
                <a-descriptions-item label="实例数量">{{ value?.replicas }}</a-descriptions-item>
                <a-descriptions-item label="负载均衡">轮询</a-descriptions-item>
                <a-descriptions-item label="访问控制">
                    <a-tag>未启用</a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="访问端点">
                    <a href="">http://app1.dev.cluster.local</a>
                    <br>
                    <a href="">https://app1.dev.openae.dev</a>
                </a-descriptions-item>
            </a-descriptions>
            <div>

            </div>
        </div>
        <a-tabs default-active-key="1">
            <a-tab-pane key="instance" tab="实例">
                <Instances v-model:app="value"></Instances>
            </a-tab-pane>
            <a-tab-pane key="event" tab="事件">
                <Events></Events>
            </a-tab-pane>
            <a-tab-pane key="depends" tab="中间件">
                <Middlewares></Middlewares>
            </a-tab-pane>
            <a-tab-pane key="configs" tab="配置文件">
                <Configs v-model:configs="value.configs"></Configs>
            </a-tab-pane>
            <a-tab-pane key="envs" tab="环境变量">
                <Environments></Environments>
            </a-tab-pane>
            <a-tab-pane key="settings" tab="高级设置">
                <Settings></Settings>
            </a-tab-pane>
        </a-tabs>
    </a-drawer>
</template>