<script lang="ts" setup>
import { useGraphPods } from "@/hooks/graphqls";
import useTerminal from "@/components/xterm";
import { useQuery } from "@vue/apollo-composable";
import { ref } from "@vue/reactivity"
import { computed } from "vue";


const props = defineProps({
    app: Object,
})

const formState = ref({ pod: '', container: '', wsUrl: '' })
const { env, name } = props.app || {}
const { gql, variables } = useGraphPods(`kiae-app${env}`, name, false)
const { result, onResult } = useQuery(gql, variables)
const pods = computed(() => result.value?.pods.map((pod: any) => ({
    label: pod.name, value: pod.name,
    containers: pod.containers?.map((container: any) => ({ label: container.name, value: container.name, startedAt: container.startedAt }))
})))
const podContainers = computed(() => pods.value?.find((pod: any) => pod.value === formState.value.pod)?.containers)
const podContainerStartedAt = computed(() => podContainers.value?.find((container: any) => container.value === formState.value.container)?.startedAt)

onResult(() => {
    formState.value.pod = pods.value?.at(0).value
    formState.value.container = podContainers.value?.at(0).value

    const { lokiTail } = useTerminal()
    const { wsUrl } = lokiTail({ pod: formState.value.pod, container: formState.value.container }, podContainerStartedAt.value)
    formState.value.wsUrl = wsUrl
})

</script>
    
<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-form layout="inline" :model="formState">
                <a-form-item label="Pod">
                    <a-select v-model:value="formState.pod" :options="pods" />
                </a-form-item>
                <a-form-item label="Container">
                    <a-select v-model:value="formState.container" :options="podContainers" />
                </a-form-item>

                <!-- todo 加个选项可以查看重启之前的日志 -->
            </a-form>
        </a-col>
        <a-col flex="300px">
            <!-- <a-button type="primary" size="small" style="float: right">xxx</a-button> -->
        </a-col>
    </a-row>

    <div style="margin-top:20px">
        <Terminal :wsUrl="formState.wsUrl"> </Terminal>
    </div>
</template>