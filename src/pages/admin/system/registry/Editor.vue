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

let title = !props.value ? "添加镜像源" : "编辑镜像源"
const { visible, modalOpen, modalClose } = useModal()

const { registrySvc } = useKiaeApi()
const { formState, formSubmit } = useFormSubmiter({}, (values: any) => {
    registrySvc.registryServiceCreate(values).then(() => {
        message.success("保存成功")
        modalClose()
        emit("done")
    })
})
</script>
    
<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" :footer="null" width="800px">
        <a-form :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">

            <a-form-item label="服务地址" name="server" :rules="[{ required: true, message: '请输入客户端ID!' }]">
                <a-input v-model:value="formState.server" />
            </a-form-item>
            <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入构建镜像!' }]">
                <a-input v-model:value="formState.username" />
            </a-form-item>
            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入运行镜像!' }]">
                <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="描述" name="intro" :rules="[{ required: true, message: '请输入描述!' }]">
                <a-textarea v-model:value="formState.intro" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>