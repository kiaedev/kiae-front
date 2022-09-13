<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror'
import { basicSetup } from 'codemirror'
import { StreamLanguage } from '@codemirror/language'
import { json } from '@codemirror/lang-json'
import { xml } from '@codemirror/legacy-modes/mode/xml'
import { yaml } from '@codemirror/legacy-modes/mode/yaml'
import { toml } from '@codemirror/legacy-modes/mode/toml'
import { properties } from '@codemirror/legacy-modes/mode/properties'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { ref } from "@vue/reactivity";
import { computed } from 'vue'
const props = defineProps<{
    config?: string
    filename?: string
}>()
const envs = ref([
    "KIAE_RUN_ENV",
    "KIAE_MW_MYSQL_DSN",
    "KIAE_MW_MONGO_DSN",
    "KIAE_MW_REDIS_DSN",
])


const { visible, modalOpen, modalClose } = useModal()
let title = !props.config ? "添加配置文件" : "编辑配置文件"

const { formState, formSubmit } = useFormSubmiter({ ext: 'yaml', mountPath: '/kapp/etc/' }, () => {
    console.log(formState.value)
})

const lang_xml = () => StreamLanguage.define(xml)
const lang_yaml = () => StreamLanguage.define(yaml)
const lang_toml = () => StreamLanguage.define(toml)
const lang_properties = () => StreamLanguage.define(properties)
const cfg_lang = computed(() => {
    if (formState.ext === 'json') {
        return json
    } else if (formState.ext === 'xml') {
        return lang_xml
    } else if (formState.ext === 'yaml') {
        return lang_yaml
    } else if (formState.ext === 'toml') {
        return lang_toml
    } else if (formState.ext === 'properties') {
        return lang_properties
    }

    return json
})

const extensions = computed(() => {
    return [basicSetup, cfg_lang.value()]
})
</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" width="800px" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="文件名" name="filename" :rules="[{ required: true, message: '请输入文件名!' }]">
                <a-input v-model:value="formState.filename">
                    <template #addonAfter>
                        <a-select v-model:value="formState.ext" style="width: 120px; text-align: left;">
                            <a-select-option value="yaml">.yaml</a-select-option>
                            <a-select-option value="toml">.toml</a-select-option>
                            <a-select-option value="xml">.xml</a-select-option>
                            <a-select-option value="json">.json</a-select-option>
                            <a-select-option value="properties">.properties</a-select-option>
                        </a-select>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="挂载目录" name="mountPath" :rules="[{ required: true, message: '请输入要挂载的目录!' }]">
                <a-input v-model:value="formState.mountPath"></a-input>
            </a-form-item>
            <a-form-item label="文件内容" name="content" :rules="[{ required: true, message: '请输入文件内容!' }]">
                <codemirror v-model="formState.content" :style="{ height: '500px' }" :indent-with-tab="true"
                    :tab-size="2" :extensions="extensions" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 3, span: 16 }">
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>