<script lang="ts" setup>
import { ref } from "@vue/reactivity";
const props = defineProps({
    config: Object,
})
const envs = ref([
    "KIAE_RUN_ENV",
    "KIAE_MW_MYSQL_DSN",
    "KIAE_MW_MONGO_DSN",
    "KIAE_MW_REDIS_DSN",
])
</script>

<template>
    <div>
        <a-row :gutter="16">
            <a-col :span="16">
                {{ config.content }}
            </a-col>
            <a-col :span="8">
                <a-descriptions title="系统变量" :column="1" size="small" layout="vertical" bordered>
                    <a-descriptions-item v-for="env in envs" :key="env">${{ env }}</a-descriptions-item>
                </a-descriptions>
            </a-col>
        </a-row>
    </div>
</template>