<script lang="ts" setup>
import { useKiaeApi } from '@/hooks/kiae';
import { useFormSubmiter, useModal } from '@/hooks/modal';
import { message } from 'ant-design-vue';

const emit = defineEmits(["done"])
const { visible, modalOpen, modalClose } = useModal()
const { gatewaySvc } = useKiaeApi()
const { formState, formSubmit } = useFormSubmiter({ port: 80, portProtocol: 'HTTP' }, (values: any) => {
    gatewaySvc.gatewayServiceCreate(values).then(() => {
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

    <a-modal v-model:visible="visible" title="添加网关" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="描述" name="intro" :rules="[{ required: true, message: '请输入描述!' }]">
                <a-textarea v-model:value="formState.intro" />
            </a-form-item>
            <!-- TODO support select instance -->
            <!-- <a-form-item label="实例" name="instance" :rules="[{ required: true, message: '请选择网关实例!' }]">
                <a-select v-model:value="formState.instance" />
            </a-form-item> -->
            <a-form-item label="域名列表" name="hosts" :rules="[{ required: true, message: '请输入域名!' }]">
                <a-select v-model:value="formState.hosts" mode="tags" />
            </a-form-item>
            <a-form-item label="开启HTTPS" name="https_enabled">
                <a-switch v-model:checked="formState.https_enabled" disabled />
            </a-form-item>
            <a-form-item label="强制HTTPS" name="https_redirect">
                <a-switch v-model:checked="formState.https_redirect" disabled />
            </a-form-item>
            <a-form-item label="HTTP/2 访问" name="http2_enabled">
                <a-switch v-model:checked="formState.http2_enabled" disabled />
            </a-form-item>

            <!-- <a-form-item label="自定义端口" name="port" :rules="[{ required: true, message: '请输入端口!' }]">
                <a-input-number v-model:value="formState.port" style="width: 160px">
                    <template #addonAfter>
                        <a-select v-model:value="formState.portProtocol" style="width: 80px">
                            <a-select-option value="HTTP">http</a-select-option>
                            <a-select-option value="HTTP2">http2</a-select-option>
                            <a-select-option value="HTTPS">https</a-select-option>
                        </a-select>
                    </template>
                </a-input-number>
            </a-form-item> -->

            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>