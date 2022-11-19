<script lang="ts">
import { useApplication } from '@/hooks/op_app'
import { defineComponent } from 'vue'
import { AppApplication } from "@/libs/kiae"

export default defineComponent({
    props: {
        value: Object,
    },
    emits: ["done", "deleted"],
    setup() {
        const { handleAppStart, handleAppStop, handleAppRestart, handleAppDelete } = useApplication()

        return {
            handleAppStart, handleAppRestart, handleAppStop, handleAppDelete,
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
                    <a href="javascript:;">Deploy</a>
                </a-menu-item>
                <a-menu-item>
                    <InstanceSettings v-model:value="value" @done="$emit('done')">
                        Instances
                    </InstanceSettings>
                </a-menu-item>
                <a-menu-item>
                    <a v-if="value?.status == 'STATUS_STOPPED'" href="javascript:;"
                        @click="handleAppStart(value, () => $emit('done'))">Start</a>
                    <a v-else href="javascript:;" @click="handleAppStop(value, () => $emit('done'))">Stop</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;" @click="handleAppRestart(value, () => $emit('done'))">Restart</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;" @click="handleAppDelete(value, () => $emit('deleted'))">{{ $t('btn.delete') }}</a>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>