<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue/es';
import { useRequest } from 'vue-request';
const props = defineProps<{
    // app: Object,
    value?: Object,
}>()

const emit = defineEmits(["done"])

let title = !props.value ? "Add GitRegistry" : "Edit GitRegistry"
const { visible, modalOpen, modalClose } = useModal()

const { providerSvc } = useKiaeApi()
const { data, loading, error, runAsync } = useRequest(() => providerSvc.providerServicePrepare(), { manual: true });
const { formState, formSubmit } = useFormSubmiter({ type: 'github' }, () => {
    console.log(formState)
    providerSvc.providerServiceCreate(formState).then(() => {
        message.success("Succeed")
        modalClose()
        emit("done")
    })
})
const onProviderSwitch = () => {
    const p = data.value?.data.items?.find(el => el.name == formState.type)
    formState.name = p?.name
    formState.authorize_url = p?.authorizeUrl
    formState.token_url = p?.tokenUrl
    formState.scopes = p?.scopes
}

runAsync().then(onProviderSwitch)
</script>
    
<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" :footer="null" width="800px">
        <a-form :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="Type" name="type">
                <a-radio-group v-model:value="formState.type" @change="onProviderSwitch">
                    <a-radio value="github">Github</a-radio>
                    <a-radio value="gitlab">Gitlab</a-radio>
                    <a-radio value="bitbucket">Bitbucket</a-radio>
                    <a-radio value="">Other</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item label="Name" name="name" :rules="[{ required: true, message: 'Please input the name!' }]">
                <a-input v-model:value="formState.name" :disabled="formState.type != ''" />
            </a-form-item>
            <a-form-item label="AuthorizeURL" name="authorize_url"
                :rules="[{ required: true, message: 'Please input the authorize url!' }]">
                <a-input v-model:value="formState.authorize_url" />
            </a-form-item>
            <a-form-item label="TokenURL" name="token_url"
                :rules="[{ required: true, message: 'Please input the token url!' }]">
                <a-input v-model:value="formState.token_url" />
            </a-form-item>
            <a-form-item label="Scopes" name="scopes">
                <a-select v-model:value="formState.scopes" mode="tags" />
            </a-form-item>
            <a-form-item label="ClientID" name="client_id"
                :rules="[{ required: true, message: 'Please input the client id!' }]">
                <a-input v-model:value="formState.client_id" />
            </a-form-item>
            <a-form-item label="ClientSecret" name="client_secret"
                :rules="[{ required: true, message: 'Please input the client secret!' }]">
                <a-input-password v-model:value="formState.client_secret" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>