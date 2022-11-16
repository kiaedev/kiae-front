<script lang="ts" setup>
import { ref, computed, toRaw, watch } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue/es';
import { useRequest } from 'vue-request';
import { SelectValue } from 'ant-design-vue/es/select';
const props = defineProps<{
    app: any,
    value?: any,
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

const egressForm = useFormSubmiter({ appid: props.app?.id, type: 'INTERNAL', ports: [{ number: 80, protocol: 'http' }] }, (values: any) => {
    egressSvc.egressServiceCreate(props.app?.id, values).then(() => {
        modalClose()
        emit("done")
        message.success("保存成功")
    })
})

const removePort = (item: any) => {
    let index = egressForm.formState.ports.indexOf(item);
    if (index !== -1) {
        egressForm.formState.ports.splice(index, 1);
    }
};
const addPort = () => {
    egressForm.formState.ports.push({
        number: 8000,
        protocol: 'http',
    });
};

const internalApp = computed(() => {
    return egressForm.formState.type == 'INTERNAL'
})

const { data, loading, error, run } = useRequest(() => middlewareSvc.middlewareServiceList(mwForm.formState.type));
const mwInstances = computed(() => data.value?.data?.items?.map((item: any) => ({ value: item.name, label: item.name })))

const appRequest = useRequest(() => appSvc.appServiceList());
const appOptions = computed(() => appRequest.data.value?.data?.items?.map((item: any) => ({ value: item.name, label: item.name, env: item.env, ports: item.ports })))
const internalApplication = ref('')
const internalApplicationChange = (v: SelectValue, opt: any) => {
    console.log(v, opt);
    egressForm.formState.host = `${v}.kiae-app-${opt.env}.svc.cluster.local`
    egressForm.formState.ports = opt.ports.map((el: any) => { return { number: el.port, protocol: el.appProtocol } })
    egressForm.formState.protocol = 'http'
}
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
                    <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
                </a-form-item>
            </template>
        </a-form>

        <a-form :model="egressForm.formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }"
            autocomplete="off" @finish="egressForm.formSubmit" v-if="depend_type=='APP'">
            <a-form-item label="目标类型" name="type">
                <a-radio-group v-model:value="egressForm.formState.type">
                    <a-radio value="INTERNAL">内部应用</a-radio>
                    <a-radio value="INTERNET">外部地址</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="目标应用" name="target" :rules="[{ required: true, message: '请选择目标应用!' }]"
                v-if="internalApp">
                <a-select v-model:value="egressForm.formState.target" :options="appOptions"
                    @change="internalApplicationChange" />
            </a-form-item>
            <a-form-item label="目标地址" name="host" :rules="[{ required: true, message: '请输入目标地址' }]">
                <a-input v-model:value="egressForm.formState.host" :disabled="internalApp" />
            </a-form-item>
            <a-form-item :label="`端口${index + 1}`" name="ports" v-for="(port, index) in egressForm.formState.ports"
                :key="index" :rules="[{ required: true, message: '请输入目标端口' }]">
                <a-input-number v-model:value="port.number" style="width: 230px" :disabled="internalApp">
                    <template #addonAfter>
                        <a-select v-model:value="port.protocol" style="width: 80px" :disabled="internalApp">
                            <a-select-option value="http">http</a-select-option>
                            <a-select-option value="http2">http2</a-select-option>
                            <a-select-option value="tcp">tcp</a-select-option>
                        </a-select>
                    </template>
                </a-input-number>
                <MinusCircleOutlined v-if="index != 0 && !internalApp" style="line-height: 35px; margin-left: 8px;"
                    @click="removePort(port)" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }" v-if="!internalApp">
                <a-button type="dashed" size="small" @click="addPort">
                    <PlusOutlined />
                    添加端口
                </a-button>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>