<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
    props: {
        value: Object,
    },
    emits:["value"],
    setup(props) {
        console.log(props);
        const formState = ref<any>({})
        watch(()=>props.value, (v)=>{
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
            <a-form-item label="路径" style="width:100%">
                <a-input v-model:value="formState.path" style="width:100%"></a-input>
            </a-form-item>
        </a-row>
        <a-row>
            <a-col :span="8">
                <a-form-item label="探测端口">
                    <a-input-number v-model:value="formState.port"></a-input-number>
                </a-form-item>
            </a-col>
            <a-col :span="10" :offset="4">
                <a-form-item label="探测间隔">
                    <a-input-number v-model:value="formState.periodSeconds"></a-input-number>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="8">
                <a-form-item label="成功阈值">
                    <a-input-number v-model:value="formState.successThreshold"></a-input-number>
                </a-form-item>
            </a-col>
            <a-col :span="10" :offset="4">
                <a-form-item label="失败阈值">
                    <a-input-number v-model:value="formState.failureThreshold"></a-input-number>
                </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="8">
                <a-form-item label="超时时间">
                    <a-input-number v-model:value="formState.timeoutSeconds"></a-input-number>
                </a-form-item>
            </a-col>
            <a-col :span="10" :offset="4">
                <a-form-item label="延迟探测">
                    <a-input-number v-model:value="formState.initialDelaySeconds"></a-input-number>
                </a-form-item>
            </a-col>
        </a-row>
        <a-form-item>
            <a-button type="primary">保存</a-button>
        </a-form-item>
    </a-form>
</template>