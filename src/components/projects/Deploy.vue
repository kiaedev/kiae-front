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
        message.success("开始部署...")
        modalClose()
        emit("done")
    })
})
</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" title="版本发布" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="目标应用" name="appid" :rules="[{ required: true, message: '请选择目标镜像!' }]">
                <a-select v-model:value="formState.appid" :options="apps" />
            </a-form-item>
            <a-form-item label="镜像" name="imageId" :rules="[{ required: true, message: '请选择目标镜像!' }]">
                <a-select v-model:value="formState.imageId" :options="images" />
            </a-form-item>
            <a-form-item label="部署方式" name="mode">
                <a-radio-group v-model:value="formState.mode">
                    <a-radio value="rolling">滚动</a-radio>
                    <a-radio value="blueGreen" disabled>蓝绿</a-radio>
                    <a-radio value="canary" disabled>金丝雀</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit">部署</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>