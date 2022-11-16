<script lang="ts" setup>
import { useKiaeApi } from '@/hooks/kiae';
import { useFormSubmiter, useModal } from '@/hooks/modal';
import { message } from 'ant-design-vue';

const emit = defineEmits(["done"])
const { visible, modalOpen, modalClose } = useModal()
const { clusterSvc } = useKiaeApi()
const { formState, formSubmit } = useFormSubmiter({ name: '', intro: '' }, (values: any) => {
    clusterSvc.clusterServiceCreate(values).then(() => {
        message.success("保存成功")
        modalClose()
        emit('done')
    })
})

</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" title="添加集群" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item :label="$t('name')" name="name" :rules="[{ required: true, message: '请输入集群名称!' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item :label="$t('intro')" name="intro" :rules="[{ required: true, message: '请输入集群描述!' }]">
                <a-textarea v-model:value="formState.intro" />
            </a-form-item>
            <a-form-item label="IDC" name="idc" :rules="[{ required: true, message: '请输入集群所属IDC!' }]">
                <a-input v-model:value="formState.idc" />
            </a-form-item>
            <a-form-item :label="$t('tags')" name="tags" :rules="[{ required: true, message: '请设置集群标签!' }]">
                <a-select v-model:value="formState.tags" mode="tags" />
            </a-form-item>
            <a-form-item label="KubeConfig" name="kubeconfig" :rules="[{ required: true, message: '请输入KubeConfig!' }]">
                <a-textarea v-model:value="formState.kubeconfig" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>