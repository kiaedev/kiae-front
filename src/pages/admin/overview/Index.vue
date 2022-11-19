<script lang="ts" setup>
import { useKiaeApi } from '@/hooks/kiae';
import { ref } from 'vue';

const ready = ref(true)
const { systemSvc } = useKiaeApi()
systemSvc.systemServiceGetStatus().then(ret => {
    ready.value = ret.data.ready || false
    console.log(ready.value);
})
</script>

<template>
    <a-alert v-if="!ready" :message="$t('admin.page.overview.notReady')"
        :description="$t('admin.page.overview.notReadyMsg')" type="error" />

    <a-alert v-else :message="$t('admin.page.overview.ready')" :description="$t('admin.page.overview.readyMsg')"
        type="success" show-icon />

    <br>
    <a-alert :message="$t('admin.page.overview.contribution')" :description="$t('admin.page.overview.contributionMsg')"
        type="info" show-icon />

    <br>
    <a-space>
        <a href="https://kiae.dev/">{{ $t('admin.officialDocs') }}</a>
        <a href="https://github.com/kiaedev/kiae">{{ $t('admin.projectSource') }}</a>
        <a href="https://github.com/kiaedev/kiae/issues">{{ $t('admin.issueFeedback') }}</a>
    </a-space>

</template>