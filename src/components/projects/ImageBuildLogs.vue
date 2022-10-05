<script lang="ts" setup>
import { watch } from 'vue';
import { useModal } from '@/hooks/modal';
import { ImageImage } from '@/libs/kiae';

defineProps<{
    image: ImageImage,
}>()

const { visible, modalOpen, modalClose } = useModal()
</script>


<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-drawer :visible="visible" :title="`构建日志: ${image.name}`" size="large" placement="bottom" @close="modalClose"
        :destroyOnClose="true">

        <Terminal :query="{app: `${image.name}-build-1`}" :start="image.createdAt">
        </Terminal>
    </a-drawer>
</template>