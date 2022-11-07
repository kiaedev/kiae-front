
<script lang="ts" setup>
import { defineComponent, reactive, ref, defineEmits, onMounted, computed } from 'vue';
import { useFormSubmiter, useModal } from '@/hooks/modal';
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue/es';
import { useRequest } from 'vue-request';

const emit = defineEmits(["done"])
const props = defineProps<{
    app: any,
    value: Object,
}>()

const initFormItem = {
    appid: props.app?.id,
    scope: 'ALL',
    gateway: '',
    host: '',
}
let title = "添加访问入口"
let formItem: any = initFormItem
if (props.value) {
    formItem = props.value
    title = "编辑访问入口"
}

const { visible, modalOpen, modalClose } = useModal()
const { entrySvc, gatewaySvc } = useKiaeApi()
const gatwayRequest = useRequest(() => gatewaySvc.gatewayServiceList());
const gateways = computed(() => {
    return gatwayRequest.data.value?.data?.items?.map((item: any) => ({ value: item.name, label: item.name }))
})

const gatewayHosts = computed(() => {
    return gatwayRequest.data.value?.data?.items?.find(el => el.name == formState.gateway)?.hosts?.map((host: any) => ({ value: `${props.app?.name}.${props.app?.env}.${host}` }))
})

const { formState, formSubmit, resetFields } = useFormSubmiter(formItem, (values: any) => {
    console.log("111", values);
    const done = () => {
        modalClose()
        resetFields({})
        emit("done")
        message.success("保存成功")
    }

    if (values.id) {
        entrySvc.entryServiceUpdate(values.appid, values?.id, values).then(done)
    } else {
        entrySvc.entryServiceCreate(props.app?.id, values).then(done)
    }
})

const selectedRowKeys = ref([])
const routes = ref()
const routeColumns = [
    {
        title: '路由',
        dataIndex: 'path',
    },
]
</script>
            
<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" :footer="null">
        <a-form :model="formState" @finish="formSubmit" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }"
            autocomplete="off">
            <a-form-item label="网关" name="gateway" :rules="[{ required: true, message: '请选择您需要的网关' }]">
                <a-select v-model:value="formState.gateway" placeholder="请选择您需要的网关" :options="gateways" />
            </a-form-item>
            <a-form-item label="域名" name="host" :rules="[{ required: true, message: '请选择您需要的域名' }]">
                <a-select v-model:value="formState.host" placeholder="请选择您需要的域名" :options="gatewayHosts" />
            </a-form-item>
            <a-form-item label="路由范围">
                <a-radio-group v-model:value="formState.scope">
                    <a-radio value="ALL">全部路由</a-radio>
                    <a-radio value="PARTIAL" disabled>部分路由</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5, span: 16 }" v-if="formState.scoped == 'part'">
                <a-table :columns="routeColumns" :dataSource="routes"
                    :row-selection="{ selectedRowKeys: selectedRowKeys }"></a-table>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
              
<style scoped>

</style>