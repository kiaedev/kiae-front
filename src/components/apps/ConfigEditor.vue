<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror'
import { basicSetup } from 'codemirror'
import { StreamLanguage } from '@codemirror/language'
import { json } from '@codemirror/lang-json'
import { xml } from '@codemirror/legacy-modes/mode/xml'
import { yaml } from '@codemirror/legacy-modes/mode/yaml'
import { toml } from '@codemirror/legacy-modes/mode/toml'
import { textile } from '@codemirror/legacy-modes/mode/textile'
import { properties } from '@codemirror/legacy-modes/mode/properties'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { computed } from 'vue'
import { useKiaeApi } from '@/hooks/kiae'
import { message } from 'ant-design-vue/es'
import { AppConfiguration } from '@/libs/kiae'

const emit = defineEmits(["done"])
const props = defineProps<{
    appid: string
    config?: AppConfiguration
}>()

const { visible, modalOpen, modalClose } = useModal()
let title = !props.config ? "New Config" : "Edit Config"
let filename;
let ext = 'yaml'
if (props.config?.filename) {
    [filename, ext] = props.config.filename.split('.')
}

const { mountPath, content } = props.config || { mountPath: '', content: '' }

const { appSvc } = useKiaeApi()
const { formState, formSubmit } = useFormSubmiter({ filename, ext, mountPath, content }, (values: any) => {
    let cfg = Object.assign({}, values)
    cfg.filename = `${values.filename}.${values.ext}`

    const done = () => {
        message.success("succeed")
        modalClose()
        emit("done")
    }

    if (props.config?.name) {
        appSvc.appServiceCfgUpdate(props.appid, props.config?.name, cfg).then(done)
    } else {
        appSvc.appServiceCfgCreate(props.appid, cfg).then(done)
    }
})

const cfg_lang = computed(() => {
    if (formState.ext === 'json') {
        return json
    } else if (formState.ext === 'xml') {
        return () => StreamLanguage.define(xml)
    } else if (formState.ext === 'yaml') {
        return () => StreamLanguage.define(yaml)
    } else if (formState.ext === 'toml') {
        return () => StreamLanguage.define(toml)
    } else if (formState.ext === 'properties' || formState.ext === 'ini') {
        return () => StreamLanguage.define(properties)
    }

    return () => StreamLanguage.define(textile)
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
            <a-form-item label="Filename" name="filename"
                :rules="[{ required: true, message: 'Please input the filename!' }]">
                <a-input v-model:value="formState.filename">
                    <template #addonAfter>
                        <a-select v-model:value="formState.ext" style="width: 120px; text-align: left;">
                            <a-select-option value="yaml">.yaml</a-select-option>
                            <a-select-option value="toml">.toml</a-select-option>
                            <a-select-option value="xml">.xml</a-select-option>
                            <a-select-option value="json">.json</a-select-option>
                            <a-select-option value="ini">.ini</a-select-option>
                            <a-select-option value="properties">.properties</a-select-option>
                        </a-select>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="MountPath" name="mountPath"
                :rules="[{ required: true, message: 'Please input the mount path!' }]">
                <a-input v-model:value="formState.mountPath"></a-input>
            </a-form-item>
            <a-form-item label="Content" name="content"
                :rules="[{ required: true, message: 'Please input the config content!' }]">
                <codemirror v-model="formState.content" :style="{ height: '500px' }" :indent-with-tab="true"
                    :tab-size="2" :extensions="extensions" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 3, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>