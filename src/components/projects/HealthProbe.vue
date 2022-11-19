<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
    props: {
        value: Object,
    },
    emits: ["value"],
    setup(props) {
        console.log(props);
        const formState = ref<any>({})
        watch(() => props.value, (v) => {
            formState.value = v
        })
        return {
            formState,
        }
    },
})
</script>

<template>
    <a-form v-if="formState" v-model:value="formState">
        <a-row>
            <a-form-item label="Path" style="width:100%">
                <a-input v-model:value="formState.path" style="width:100%"></a-input>
            </a-form-item>
        </a-row>
        <a-row>
            <a-col :span="8">
                <a-form-item label="ProbePort">
                    <a-input-number v-model:value="formState.port"></a-input-number>
                </a-form-item>
            </a-col>
            <a-col :span="10" :offset="4">
                <a-form-item label="PeriodSeconds">
                    <a-input-number v-model:value="formState.periodSeconds"></a-input-number>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="8">
                <a-form-item label="SuccessThreshold">
                    <a-input-number v-model:value="formState.successThreshold"></a-input-number>
                </a-form-item>
            </a-col>
            <a-col :span="10" :offset="4">
                <a-form-item label="FailureThreshold">
                    <a-input-number v-model:value="formState.failureThreshold"></a-input-number>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="8">
                <a-form-item label="TimeoutSeconds">
                    <a-input-number v-model:value="formState.timeoutSeconds"></a-input-number>
                </a-form-item>
            </a-col>
            <a-col :span="10" :offset="4">
                <a-form-item label="InitialDelaySeconds">
                    <a-input-number v-model:value="formState.initialDelaySeconds"></a-input-number>
                </a-form-item>
            </a-col>
        </a-row>
        <a-form-item>
            <a-button type="primary">{{ $t('btn.save') }}</a-button>
        </a-form-item>
    </a-form>
</template>