<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { LokiAddon } from '@/libs/xterm-addon-loki'
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'
import dayjs from 'dayjs';

const props = defineProps<{
    query: Object
    start: any
}>()

const term = new Terminal({ allowProposedApi: true, cursorBlink: true });
const socket = ref<WebSocket>()

const termInit = () => {
    const termContainer = document.getElementById(`terminal`);
    if (!termContainer) {
        console.log("not found the terminal container");
        return
    }
    term.open(termContainer);
}

const termOpen = () => {
    socket.value?.close()
    const { query, start } = props
    console.log(query, start);
    if (Object.values(query).includes('')) return; // ignore the invalid query

    const queryStr = Object.entries(query).map(([k, v]) => `${k}="${v}"`).join(', ')
    socket.value = new WebSocket(`ws://localhost:5173/proxies/loki/api/v1/tail?query=${encodeURIComponent(`{${queryStr}}`)}&start=${dayjs(start).unix()}`);
    // const attachAddon = new AttachAddon(socket);
    term.clear()
    term.loadAddon(new LokiAddon(socket.value));
    term.focus()

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();
}

const termClose = () => {
    socket.value?.close()
    term.dispose()
}

watch(() => props.query, termOpen)
onMounted(termInit)
onMounted(termOpen)
onUnmounted(termClose)
</script>

<template>
    <div id="terminal"></div>
</template>

<style>
#terminal {
    width: 100%;
    height: 100%;
}
</style>