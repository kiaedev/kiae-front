<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
const props = defineProps<{
    config?: string
    filename?: string
}>()

const { visible, modalOpen, modalClose } = useModal()
let title = !props.config ? "添加依赖" : "编辑依赖"

const { formState, formSubmit } = useFormSubmiter({ type: 'middleware' }, () => {
    console.log(formState)
})

const components = ref([{ value: "mysql", label: "mysql" }, { value: "redis", label: "redis" }])

</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="组件类型" name="type">
                <a-radio-group v-model:value="formState.type">
                    <a-radio-button value="middleware">中间件</a-radio-button>
                    <a-radio-button value="application">内部应用</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="组件名称" name="component" :rules="[{ required: true, message: '请选择您的依赖!' }]">
                <a-select v-model:value="formState.component" :options="components" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>