<script lang="ts" setup>
import { useKiaeApi } from '@/hooks/kiae';
import { useFormSubmiter, useModal } from '@/hooks/modal';
import { useProject } from '@/hooks/project';
import { ImageImageStatus } from '@/libs/kiae';
import { message } from 'ant-design-vue';
import { computed } from 'vue';
import { useRequest } from 'vue-request';

const emit = defineEmits(["done"])
const { visible, modalOpen, modalClose } = useModal()
const { appSvc, imageSvc, deploySvc } = useKiaeApi()
const { currentPid } = useProject()
const appResp = useRequest(() => appSvc.appServiceList(currentPid()))
const apps = computed(() => {
    const { data } = appResp;
    return data.value?.data.items?.map((el) => ({ label: el.name, value: el.id }))
})
const imgResp = useRequest(() => imageSvc.imageServiceList(currentPid(), ImageImageStatus.Published))
const images = computed(() => {
    const { data } = imgResp
    return data.value?.data.items?.map((el) => ({ label: el.name, value: el.id }))
})

const { formState, formSubmit } = useFormSubmiter({ mode: 'rolling' }, (values: any) => {
    deploySvc.deploymentServiceCreate(currentPid(), values).then(() => {
        message.success("Deploying...")
        modalClose()
        emit("done")
    })
})
</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" title="New Deployment" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="App" name="appid" :rules="[{ required: true, message: 'Please input the app!' }]">
                <a-select v-model:value="formState.appid" :options="apps" />
            </a-form-item>
            <a-form-item label="Image" name="imageId"
                :rules="[{ required: true, message: 'Please select the image!' }]">
                <a-select v-model:value="formState.imageId" :options="images" />
            </a-form-item>
            <a-form-item label="Mode" name="mode">
                <a-radio-group v-model:value="formState.mode">
                    <a-radio value="rolling">Rolling</a-radio>
                    <a-radio value="blueGreen" disabled>BlueGreen</a-radio>
                    <a-radio value="canary" disabled>Canary</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit">Deploy</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>