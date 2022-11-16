<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue/es';
const props = defineProps<{
    // app: Object,
    value?: Object,
}>()

const emit = defineEmits(["done"])

let title = !props.value ? "注册实例" : "编辑实例"
const { visible, modalOpen, modalClose } = useModal()
const components = ref([{ value: "mysql", label: "mysql" }, { value: "redis", label: "redis" }])

const { middlewareSvc } = useKiaeApi()
const { formState, formSubmit } = useFormSubmiter({ type: 'mysql', properties: {} }, () => {
    console.log(formState)
    middlewareSvc.middlewareServiceCreate(formState).then(() => {
        modalClose()
        emit("done")
        message.success("保存成功")
    })
})

</script>
    
<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="类型" name="type">
                <a-radio-group v-model:value="formState.type">
                    <a-radio value="mysql">MySQL</a-radio>
                    <a-radio value="mssql">MsSQL</a-radio>
                    <a-radio value="pgsql">PgSQL</a-radio>
                    <a-radio value="redis" disabled>Redis</a-radio>
                    <a-radio value="kafka" disabled>Kafka</a-radio>
                </a-radio-group>
            </a-form-item>

            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入您的实例名称!' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="连接地址" :name="['properties', 'endpoint']"
                :rules="[{ required: true, message: '请输入连接地址!' }]">
                <a-input-group compact>
                    <a-input v-model:value="formState.properties.endpoint" placeholder="endpoint" style="width: 70%" />
                    <a-input v-model:value="formState.properties.port" placeholder="port" style="width: 30%" />
                </a-input-group>
            </a-form-item>
            <a-form-item label="用户名" :name="['properties','username']"
                :rules="[{ required: true, message: '请输入用户名!' }]">
                <a-input v-model:value="formState.properties.username" />
            </a-form-item>
            <a-form-item label="密码" :name="['properties','password']" :rules="[{ required: true, message: '请输入密码!' }]">
                <a-input-password v-model:value="formState.properties.password" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>