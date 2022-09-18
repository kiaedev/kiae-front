<script lang="ts" setup>
import { ref, computed, toRaw, watch } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue/es';
import { useRequest } from 'vue-request';
const props = defineProps<{
    app: Object,
    value?: Object,
}>()

const emit = defineEmits(["done"])

let title = !props.value ? "添加依赖" : "编辑依赖"
const { visible, modalOpen, modalClose } = useModal()
const components = ref([{ value: "mysql", label: "mysql" }, { value: "redis", label: "redis" }])

const { dependSvc, middlewareSvc } = useKiaeApi()
const { formState, formSubmit } = useFormSubmiter({ appid: props.app?.id, type: 'MIDDLEWARE', m_policy: 'REUSE' }, () => {
    console.log(formState)
    dependSvc.dependServiceCreate(props.app?.id, formState).then(() => {
        modalClose()
        emit("done")
        message.success("保存成功")
    })
})

const { data, loading, error, run } = useRequest(() => middlewareSvc.middlewareServiceList(formState.m_type));
const mwInstances = computed(() => data.value?.data?.items?.map((item: any) => ({ value: item.name, label: item.name })))

</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="依赖类型" name="type">
                <a-radio-group v-model:value="formState.type">
                    <a-radio-button value="MIDDLEWARE">中间件</a-radio-button>
                    <a-radio-button value="INTERNAL_APP">内部应用</a-radio-button>
                    <a-radio-button value="INTERNET_APP">外部地址</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <template v-if="formState.type=='MIDDLEWARE'">
                <a-form-item label="组件类型" name="m_type" :rules="[{ required: true, message: '请选择您的依赖!' }]">
                    <a-select v-model:value="formState.m_type" :options="components" @change="run" />
                </a-form-item>
                <a-form-item label="组件策略" name="m_policy">
                    <a-radio-group v-model:value="formState.m_policy">
                        <a-radio value="REUSE">复用实例</a-radio>
                        <a-radio value="CREATE" disabled>新建实例</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="老实例" name="m_instance" :rules="[{ required: true, message: '请选择目标实例!' }]"
                    v-if="formState.m_policy=='REUSE'">
                    <a-select v-model:value="formState.m_instance" placeholder="请选择目标实例" :options="mwInstances">
                    </a-select>
                </a-form-item>
                <a-form-item label="实例规格" name="m_size" :rules="[{ required: true, message: '请选择实例规格!' }]"
                    v-if="formState.m_policy=='CREATE'">
                    <a-select v-model:value="formState.m_size" placeholder="请选择实例规格"></a-select>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                    <a-button type="primary" html-type="submit">保存</a-button>
                </a-form-item>
            </template>

            <template v-if="formState.type=='INTERNAL_APP'">
                <a-form-item label="目标应用" name="name" :rules="[{ required: true, message: '请选择目标应用!' }]">
                    <a-select v-model:value="formState.m_type" :options="components" />
                </a-form-item>
            </template>

            <template v-if="formState.type=='INTERNET_APP'">
                <a-form-item label="目标地址" name="address" :rules="[{ required: true, message: '请输入目标地址' }]">
                    <a-input v-model:value="formState.address" />
                </a-form-item>
            </template>
        </a-form>
    </a-modal>
</template>