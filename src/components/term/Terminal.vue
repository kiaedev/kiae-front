<script lang="ts" setup>
import { ref, onUnmounted, watch, onBeforeUnmount } from 'vue';
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { LokiAddon } from '@/libs/xterm-addon-loki'
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'
import { useModal } from '@/hooks/modal';
import { ImageImage } from '@/libs/kiae';
import dayjs from 'dayjs';

const props = defineProps<{
    image: ImageImage
}>()

const { image } = props

const { visible, modalOpen, modalClose } = useModal()

const term = new Terminal({ allowProposedApi: true, cursorBlink: true });

const socket = ref<WebSocket>()

const termOpen = () => {
    socket.value = new WebSocket(`ws://localhost:5173/proxies/loki/api/v1/tail?query=%7Bapp%3D%22${image.name}-build-1%22%7D&start=${dayjs(image.createdAt).unix()}`);
    // const attachAddon = new AttachAddon(socket);
    term.loadAddon(new LokiAddon(socket.value));

    const termContainer = document.getElementById(`terminal`);
    if (!termContainer) {
        console.log("not found the terminal container");
        return
    }
    term.open(termContainer);
    term.write('Pendding...\r\n')
    term.focus()

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();
}

const termClose = () => {
    socket.value?.close()
    term.dispose()
}

watch(visible, (v) => {
    if (!v) return termClose();

    setTimeout(termOpen, 50);
})

</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-drawer :title="`构建日志: ${image.name}`" :visible="visible" size="large" placement="bottom" @close="modalClose"
        :destroyOnClose="true">
        <div id="terminal"></div>
    </a-drawer>
</template>

<style>
#terminal {
    width: 100%;
    height: 100%;
}
</style>