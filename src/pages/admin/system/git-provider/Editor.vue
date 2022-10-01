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

let title = !props.value ? "添加仓库源" : "编辑仓库源"
const { visible, modalOpen, modalClose } = useModal()

const { providerSvc } = useKiaeApi()
const { data, loading, error, runAsync } = useRequest(() => providerSvc.providerServicePrepare(), {manual: true});
const { formState, formSubmit } = useFormSubmiter({ type: 'github' }, () => {
    console.log(formState)
    providerSvc.providerServiceCreate(formState).then(() => {
        modalClose()
        emit("done")
        message.success("保存成功")
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
            <a-form-item label="类型" name="type">
                <a-radio-group v-model:value="formState.type" @change="onProviderSwitch">
                    <a-radio value="github">Github</a-radio>
                    <a-radio value="gitlab">Gitlab</a-radio>
                    <a-radio value="bitbucket">Bitbucket</a-radio>
                    <a-radio value="">Other</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="formState.name" :disabled="formState.type!=''" />
            </a-form-item>
            <a-form-item label="授权地址" name="authorize_url" :rules="[{ required: true, message: '请输入授权地址!' }]">
                <a-input v-model:value="formState.authorize_url" />
            </a-form-item>
            <a-form-item label="令牌地址" name="token_url" :rules="[{ required: true, message: '请输入令牌地址!' }]">
                <a-input v-model:value="formState.token_url" />
            </a-form-item>
            <a-form-item label="授权范围" name="scopes">
                <a-select v-model:value="formState.scopes" mode="tags" />
            </a-form-item>
            <a-form-item label="客户端ID" name="client_id" :rules="[{ required: true, message: '请输入客户端ID!' }]">
                <a-input v-model:value="formState.client_id" />
            </a-form-item>
            <a-form-item label="客户端秘钥" name="client_secret" :rules="[{ required: true, message: '请输入客户端秘钥!' }]">
                <a-input-password v-model:value="formState.client_secret" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>