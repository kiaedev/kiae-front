<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue/es';
const props = defineProps<{
    appid: string
    env?: Object
}>()
const emit = defineEmits(["done"])

const { visible, modalOpen, modalClose } = useModal()
let title = !props.env ? "New Environment" : "Edit Environment"

const { appSvc } = useKiaeApi()
const { formState, formSubmit } = useFormSubmiter(props.env || {}, (values: any) => {
    appSvc.appServiceEnvCreate(props.appid, values).then(() => {
        message.success("succeed")
        modalClose()
        emit("done")
    })
})

</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="Name" name="name" :rules="[{ required: true, message: 'Please input the name!' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="Value" name="value" :rules="[{ required: true, message: 'Please input the value!' }]">
                <a-input v-model:value="formState.value" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>