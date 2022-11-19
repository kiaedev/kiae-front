<script lang="ts" setup>
import { ref } from "@vue/reactivity"

const formState = ref<any>({});

</script>

<template>
    <div>
        <div>
            <!-- <a-input></a-input> -->
        </div>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                <a-card title="LivenessProbe">
                    <HealthProbe v-model:value="formState.livenessProbe"></HealthProbe>
                </a-card>
            </a-col>
            <a-col :span="12">
                <a-card title="ReadinessProbe">
                    <HealthProbe v-model:value="formState.readinessProbe"></HealthProbe>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>