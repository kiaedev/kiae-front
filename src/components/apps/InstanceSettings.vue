
<script lang="ts">
import { defineComponent, reactive, ref, defineEmits, onMounted } from 'vue';
import { useApplication } from "@/hooks/op_app"
import { useFormSubmiter, useModal } from '@/hooks/modal';
import { AppSize } from '@/libs/kiae';
import { message } from 'ant-design-vue';

interface FormState {
    id: string;
    size: AppSize;
    replicas: number;
}
export default defineComponent({
    props: {
        value: Object,
    },
    emits: ["done"],
    setup(props, ctx) {
        const { visible, modalOpen, modalClose } = useModal()
        const { handleAppInstanceSettings } = useApplication()
        const { formState, formSubmit } = useFormSubmiter({
            id: props.value?.id,
            size: props.value?.size,
            replicas: props.value?.replicas,
        }, (values: any) => {
            handleAppInstanceSettings(values, () => {
                message.success("succeed!");
                ctx.emit("done")
                modalClose()
            })
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

    <a-modal v-model:visible="visible" title="Instance Settings" @ok="formSubmit">
        <a-form :model="formState" name="size" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off">
            <a-form-item label="Size" name="size"
                :rules="[{ required: true, message: 'Please select the instance size' }]">
                <a-select v-model:value="formState.size" placeholder="Select the instance size">
                    <a-select-option v-for="(key, value) in AppSize" :key="value" :value="key">
                        {{ value }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Replicas" name="replicas"
                :rules="[{ required: true, message: 'Please input the replicas' }]">
                <a-input-number v-model:value="formState.replicas"></a-input-number>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
      
      