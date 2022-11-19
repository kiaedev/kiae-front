<script lang="ts" setup>
import { watch } from 'vue';
import { useModal } from '@/hooks/modal';
import { ImageImage } from '@/libs/kiae';
import useTerminal from '@/components/xterm';

defineEmits(["close"])
const props = defineProps<{
    image: ImageImage,
}>()

const { visible, modalOpen, modalClose } = useModal()
const { lokiTail } = useTerminal()
const { wsUrl } = lokiTail({ app: `kiae-image-${props.image.name}-build-1` }, props.image?.createdAt || '')
</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-drawer :visible="visible" :title="`BuildLogs: ${image.name}`" size="large" placement="bottom"
        @close="()=>{modalClose();$emit('close')}" :destroyOnClose="true">

        <Terminal :wsUrl="wsUrl"></Terminal>
    </a-drawer>
</template>