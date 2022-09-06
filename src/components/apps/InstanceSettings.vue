
<script lang="ts">
import { defineComponent, reactive, ref, defineEmits, onMounted } from 'vue';
import { useApplication } from "@/hooks/app_op"
import { useFormSubmiter, useModal } from '@/hooks/modal';
import { AppSize } from '@/libs/kiae';

interface FormState {
    id: string;
    size: AppSize;
    replicas: number;
}
export default defineComponent({
    props: {
        value: Object,
    },
    setup(props) {
        const { visible, modalOpen, modalClose } = useModal()
        const { handleAppInstanceSettings } = useApplication()
        const { formState, formSubmit } = useFormSubmiter({
            id: props.value?.id,
            size: props.value?.size,
            replicas: props.value?.replicas,
        }, (values: any) => {
            console.log("111", values);
            handleAppInstanceSettings(values)
            modalClose()
        })

        return {
            visible, modalOpen,
            formState, formSubmit,
            AppSize,
        };
    },
});
</script>
    
<template>
    <div @click="modalOpen">
        <slot></slot>
    </div>

    <a-modal v-model:visible="visible" title="实例调整" @ok="formSubmit">
        <a-form :model="formState" name="size" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off">
            <a-form-item label="实例规格" name="size" :rules="[{ required: true, message: '请选择实例配置' }]">
                <a-select v-model:value="formState.size" placeholder="请选择您的应用镜像">
                    <a-select-option v-for="(key, value) in AppSize" :key="key" :value="value">
                        {{ key }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="实例数" name="replicas" :rules="[{ required: true, message: '请设置实例数' }]">
                <a-input-number v-model:value="formState.replicas"></a-input-number>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
      
      