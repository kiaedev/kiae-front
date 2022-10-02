<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const result = ref<any>({
    status: "success",
    title: "Done!"
})

const closeWindow = () => window.opener.postMessage('close', location.origin)

onMounted(() => {
    const errMsg = route.query["errmsg"]
    if (!errMsg) {
        setTimeout(closeWindow, 1000)
    }

    result.value.status = errMsg ? "error" : "success"
    result.value.title = errMsg ? errMsg : "Done!"
});
</script>

<template>
    <a-result :status="result.status" :title="result.title">
        <template #extra>
            <a-button key="close" type="primary" @click="closeWindow">Close</a-button>
        </template>
    </a-result>
</template>