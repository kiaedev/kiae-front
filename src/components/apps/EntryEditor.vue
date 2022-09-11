
<script lang="ts">
import { defineComponent, reactive, ref, defineEmits, onMounted } from 'vue';
import { useFormSubmiter, useModal } from '@/hooks/modal';
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue/es';

export default defineComponent({
    props: {
        app: Object,
        value: Object,
    },
    emits: ["done"],
    setup(props, ctx) {
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
        const { entrySvc } = useKiaeApi()
        const { formState, formSubmit, resetFields } = useFormSubmiter(formItem, (values: any) => {
            console.log("111", values);
            const done = () => {
                modalClose()
                resetFields({})
                ctx.emit("done")
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

        const supportDomains = ["kiae.localhost"]
        const domains = supportDomains.map(el => `${props.app?.name}.${props.app?.env}.${el}`)

        return {
            title, visible, modalOpen,
            formState, formSubmit,
            domains, gateways: ['httpbin-gateway'],
            routes, routeColumns, selectedRowKeys
        };
    },
});
</script>
            
<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" :footer="null">
        <a-form :model="formState" @finish="formSubmit" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }"
            autocomplete="off">
            <a-form-item label="网关" name="gateway" :rules="[{ required: true, message: '请选择您需要的网关' }]">
                <a-select v-model:value="formState.gateway" placeholder="请选择您需要的网关">
                    <a-select-option v-for="gateway in gateways" :key="gateway" :value="gateway">
                        {{ gateway }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="域名" name="host" :rules="[{ required: true, message: '请选择您需要的域名' }]">
                <a-select v-model:value="formState.host" placeholder="请选择您需要的域名">
                    <a-select-option v-for="domain in domains" :key="domain" :value="domain">
                        {{ domain }}
                    </a-select-option>
                </a-select>
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