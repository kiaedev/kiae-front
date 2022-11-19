<script lang="ts" setup>
import { ref, computed, defineEmits, watch } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { useKiaeApi } from '@/hooks/kiae';
import useKubeApi from '@/hooks/kube';
import { message } from 'ant-design-vue/es';
import { useRequest } from 'vue-request';
const props = defineProps<{
    value?: Object,
}>()

const emit = defineEmits(["done"])

let title = !props.value ? "Add ImageRegistry" : "Edit ImageRegistry"
const { visible, modalOpen, modalClose } = useModal()

const { listNamespaces } = useKubeApi()
const { data } = useRequest(() => listNamespaces())
const namespaces = computed(() => {
    return data.value?.data.items.filter((el: any) => el.metadata.name.startsWith("kiae-")).map((el: any) => ({ label: el.metadata.name, value: el.metadata.name }))
})

const { registrySvc } = useKiaeApi()
const { formState, formSubmit } = useFormSubmiter(props.value || { type: 'dockerhub', server: 'https://index.docker.io/v1/' }, (values: any) => {
    const submit = !props.value ? () => registrySvc.registryServiceCreate(values) : () => registrySvc.registryServiceUpdate(values.id, values);

    submit().then(() => {
        message.success("Succeed")
        modalClose()
        emit("done")
    })
})

const onRegistrySwitch = () => {
    const registries: any = {
        dockerhub: 'https://index.docker.io/v1/',
        ghcr: 'ghcr.io',
        gcr: 'gcr.io',
    }
    formState.server = registries[formState.type]
}

</script>
    
<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" :footer="null" width="800px">
        <a-form :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="Registry" name="type">
                <a-radio-group v-model:value="formState.type" @change="onRegistrySwitch">
                    <a-radio value="dockerhub">Dockerhub</a-radio>
                    <a-radio value="ghcr">GithubRegistry</a-radio>
                    <a-radio value="gcr">GCR</a-radio>
                    <a-radio value="">Other</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item label="ServerURL" name="server" :rules="[{ required: true, message: 'Please input the server url!' }]">
                <a-input v-model:value="formState.server" />
            </a-form-item>
            <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input the username!' }]">
                <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input the password!' }]">
                <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <a-form-item label="Name" name="name" :rules="[{ required: true, message: 'Please input the name!' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="Intro" name="intro" :rules="[{ required: true, message: 'Please input the intro!' }]">
                <a-textarea v-model:value="formState.intro" />
            </a-form-item>

            <a-form-item label="Namespaces" name="namespaces" :rules="[{ required: true, message: 'Please select the namespaces!' }]">
                <a-select v-model:value="formState.namespaces" :options="namespaces" mode="multiple" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>