<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
const props = defineProps<{
    config?: string
    filename?: string
}>()

const { visible, modalOpen, modalClose } = useModal()
let title = !props.config ? "添加访问授权" : "编辑访问授权"

const { formState, formSubmit } = useFormSubmiter({ scope: 'ALL' }, () => {
    console.log(formState)
})

const components = ref([{ value: "mysql", label: "mysql" }, { value: "redis", label: "redis" }])

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
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="应用名称" name="component" :rules="[{ required: true, message: '请选择您的依赖!' }]">
                <a-select v-model:value="formState.component" :options="components" />
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
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>