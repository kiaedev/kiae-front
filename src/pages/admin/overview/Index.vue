<script lang="ts" setup>
import { useKiaeApi } from '@/hooks/kiae';

const { systemSvc } = useKiaeApi()
systemSvc.systemServiceGetStatus().then(ret => {
    if (!ret.data.ready) {

    }
})
</script>

<template>
    <a-alert message="System Not Ready" description="Must setup one git provider and one image registry and one image builder"
        type="error" />

</template>