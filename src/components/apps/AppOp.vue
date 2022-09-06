<script lang="ts">
import { useApplication } from '@/hooks/app_op'
import { defineComponent } from 'vue'
import { AppApplication } from "@/libs/kiae"

export default defineComponent({
    props: {
        value: Object,
    },
    emits: ["done", "deleted"],
    setup() {
        const { handleAppRestart, handleAppStop, handleAppDelete } = useApplication()

        return {
            handleAppRestart, handleAppStop, handleAppDelete,
        }
    },
})
</script>

<template>
    <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
            <slot></slot>
            <DownOutlined />
        </a>
        <template #overlay>
            <a-menu>
                <a-menu-item>
                    <a href="javascript:;">版本发布</a>
                </a-menu-item>
                <a-menu-item>
                    <InstanceSettings v-model:value="value">实例调整</InstanceSettings>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;" @click="handleAppRestart(value, () => $emit('done'))">重新启动</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;" @click="handleAppStop(value, () => $emit('done'))">停止运行</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;" @click="handleAppDelete(value, () => $emit('deleted'))">删除</a>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>