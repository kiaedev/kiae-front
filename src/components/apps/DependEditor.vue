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

const depend_type = ref('MIDDLEWARE')
const { egressSvc, middlewareSvc, appSvc } = useKiaeApi()
const mwForm = useFormSubmiter({ appid: props.app?.id, policy: 'REUSE' }, (values: any) => {
    middlewareSvc.middlewareServiceClaimCreate(values).then(() => {
        modalClose()
        emit("done")
        message.success("保存成功")
    })
})

const egressForm = useFormSubmiter({ appid: props.app?.id, type: 'INTERNAL', port: 80, protocol: 'http' }, (values: any) => {
    egressSvc.egressServiceCreate(props.app?.id, values).then(() => {
        modalClose()
        emit("done")
        message.success("保存成功")
    })
})

const { data, loading, error, run } = useRequest(() => middlewareSvc.middlewareServiceList(mwForm.formState.type));
const mwInstances = computed(() => data.value?.data?.items?.map((item: any) => ({ value: item.name, label: item.name })))

const appRequest = useRequest(() => appSvc.appServiceList());
const appOptions = computed(() => appRequest.data.value?.data?.items?.map((item: any) => ({ value: item.id, label: item.name })))

</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" :footer="null">
        <a-form :model="mwForm.formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }"
            autocomplete="off" @finish="mwForm.formSubmit">
            <a-form-item label="依赖类型" name="type">
                <a-radio-group v-model:value="depend_type">
                    <a-radio-button value="MIDDLEWARE">中间件</a-radio-button>
                    <a-radio-button value="APP">其他应用</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <template v-if="depend_type=='MIDDLEWARE'">
                <a-form-item label="组件类型" name="type" :rules="[{ required: true, message: '请选择您的依赖!' }]">
                    <a-select v-model:value="mwForm.formState.type" :options="components" @change="run" />
                </a-form-item>
                <a-form-item label="组件策略" name="policy">
                    <a-radio-group v-model:value="mwForm.formState.policy">
                        <a-radio value="REUSE">复用实例</a-radio>
                        <a-radio value="CREATE" disabled>新建实例</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="老实例" name="instance" :rules="[{ required: true, message: '请选择目标实例!' }]"
                    v-if="mwForm.formState.policy=='REUSE'">
                    <a-select v-model:value="mwForm.formState.instance" placeholder="请选择目标实例" :options="mwInstances">
                    </a-select>
                </a-form-item>
                <a-form-item label="实例规格" name="size" :rules="[{ required: true, message: '请选择实例规格!' }]"
                    v-if="mwForm.formState.policy=='CREATE'">
                    <a-select v-model:value="mwForm.formState.size" placeholder="请选择实例规格"></a-select>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                    <a-button type="primary" html-type="submit">保存</a-button>
                </a-form-item>
            </template>
        </a-form>

        <a-form :model="egressForm.formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }"
            autocomplete="off" @finish="egressForm.formSubmit" v-if="depend_type=='APP'">
            <a-form-item label="目标类型" name="policy">
                <a-radio-group v-model:value="egressForm.formState.type">
                    <a-radio value="INTERNAL">内部应用</a-radio>
                    <a-radio value="INTERNET">外部地址</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="目标应用" name="target" :rules="[{ required: true, message: '请选择目标应用!' }]"
                v-if="egressForm.formState.type=='INTERNAL'">
                <a-select v-model:value="egressForm.formState.target" :options="appOptions" />
            </a-form-item>
            <a-form-item label="目标地址" name="host" :rules="[{ required: true, message: '请输入目标地址' }]">
                <a-input v-model:value="egressForm.formState.host" :disabled="egressForm.formState.type=='INTERNAL'" />
            </a-form-item>
            <a-form-item label="目标端口" name="port" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-number v-model:value="egressForm.formState.port" style="width: 230px"
                    :disabled="egressForm.formState.type=='INTERNAL'">
                    <template #addonAfter>
                        <a-select v-model:value="egressForm.formState.protocol" style="width: 80px"
                            :disabled="egressForm.formState.type=='INTERNAL'">
                            <a-select-option value="http">http</a-select-option>
                            <a-select-option value="http2">http2</a-select-option>
                            <a-select-option value="tcp">tcp</a-select-option>
                        </a-select>
                    </template>
                </a-input-number>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>