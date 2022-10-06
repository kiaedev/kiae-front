<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { ITerminalAddon, Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { OverlayAddon } from './addons/xterm-addon-kube/overlay';
import { KubeAttachAddon } from './addons/xterm-addon-kube'
import { LokiAddon } from './addons/xterm-addon-loki'
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'

const props = defineProps<{
    wsUrl: string
    ready?: boolean
    tty?: boolean
}>()

const socket = ref<WebSocket>()
const addons = ref({
    overlayAddon: new OverlayAddon()
})
const term = new Terminal({ allowProposedApi: true, cursorBlink: true, });

const termInit = () => {
    const termContainer = document.getElementById(`terminal`);
    if (!termContainer) {
        console.log("not found the terminal container");
        return
    }
    term.open(termContainer);
}

const termOpen = () => {
    const { wsUrl } = props
    if (!wsUrl) return;

    socket.value?.close()
    const _socket = new WebSocket(wsUrl)
    _socket.onerror = (ev) => {
        console.error('[webshell] websocket connection error: ', ev);
    }
    _socket.onclose = (event) => {
        console.log(`[webshell] websocket connection closed with code: ${event.code}`);
        addons.value.overlayAddon.showOverlay('Connection Closed', null);

        // todo reconnect
    }

    socket.value = _socket
}

const termActive = () => {
    if (!socket.value || socket.value.readyState != WebSocket.CONNECTING) return

    let ioAddon: ITerminalAddon = new LokiAddon(socket.value)
    if (props.tty) {
        ioAddon = new KubeAttachAddon(socket.value)
    }

    term.clear()
    term.loadAddon(ioAddon);
    term.loadAddon(addons.value.overlayAddon);
    term.focus()

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();
}

const termClose = () => {
    socket.value?.close()
    term.dispose()
}

watch(() => props.wsUrl, termOpen)
watch(() => socket.value?.readyState, termActive)
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