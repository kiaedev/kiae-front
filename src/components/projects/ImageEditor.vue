<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue';
const emit = defineEmits(['done'])
const props = defineProps<{
    pid: string
}>()

const { visible, modalOpen, modalClose } = useModal()

const { imageSvc } = useKiaeApi()
const { formState, formSubmit } = useFormSubmiter({}, (values: any) => {
    imageSvc.imageServiceCreate(props.pid, values).then(() => {
        message.success("succeed")
        modalClose()
        emit('done')
    })
})

</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" title="Add Image" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="Image" name="image" :rules="[{ required: true, message: 'Please input the image!' }]">
                <a-input v-model:value="formState.image" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>