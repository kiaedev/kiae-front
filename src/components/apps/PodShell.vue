<script lang="ts" setup>
import { kubeShell } from '@/components/xterm';
import { useRoute } from 'vue-router';
const route = useRoute()
const { ns, pod } = route.params
const { wsUrl } = kubeShell(ns.toString(), pod.toString(), route.query)
</script>


<template>
    <Terminal :wsUrl="wsUrl" :tty="true"> </Terminal>
</template>

<style>

#app {
    width: 100%;
    height: 100%;
}
</style>