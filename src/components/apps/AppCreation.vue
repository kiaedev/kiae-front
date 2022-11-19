
<script lang="ts" setup>
import { reactive, ref, defineEmits, onMounted } from 'vue';
import { useEnvs, useProject } from '@/hooks/project';
import { useKiaeApi } from '@/hooks/kiae';
import { useFormSubmiter, useModal } from '@/hooks/modal';
import { message } from 'ant-design-vue';
import { ImageImageStatus } from '@/libs/kiae';
interface Port {
    port: number;
    protocol: string,
    appProtocol: string;
}
interface FormState {
    pid: string;
    env: string | undefined;
    image: string | undefined;
    ports: Port[];
    remember: boolean;
}

const emit = defineEmits(["done"])
const { visible, modalOpen, modalClose } = useModal()
const { currentPid } = useProject()
const { appSvc, imageSvc } = useKiaeApi()

const images = ref<any>([])
onMounted(async () => {
    imageSvc.imageServiceList(currentPid(), ImageImageStatus.Published).then((res) => {
        images.value = res.data?.items
    })
})

const envType = ref('std')
const { envs } = useEnvs()
const { formState, formSubmit } = useFormSubmiter({
    pid: currentPid(),
    env: undefined,
    image: undefined,
    ports: [
        {
            port: 8000,
            protocol: 'TCP',
            appProtocol: 'http',
        },
    ],
    remember: true,
}, (values: FormState) => {
    appSvc.appServiceCreate(values).then(() => {
        message.success("succeed!")
        modalClose()
        emit("done")
    })
})

const removePort = (item: Port) => {
    let index = formState.ports.indexOf(item);
    if (index !== -1) {
        formState.ports.splice(index, 1);
    }
};
const addPort = () => {
    formState.ports.push({
        port: 8000,
        protocol: 'TCP',
        appProtocol: 'http',
    });
};

</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" title="New Application" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="Type">
                <a-radio-group v-model:value="envType">
                    <a-radio-button value="std">Standard</a-radio-button>
                    <a-radio-button value="custom">Custom</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="Env" name="env" :rules="[{ required: true, message: 'Please select the env' }]">
                <a-select v-if="envType == 'std'" v-model:value="formState.env" placeholder="Select the environment">
                    <a-select-option v-for="env in envs" :key="env.id" :value="env.name">
                        {{ env.intro }}
                    </a-select-option>
                </a-select>
                <a-input v-else placeholder="Input the custom environment name"></a-input>
            </a-form-item>
            <a-form-item label="Image" name="image" :rules="[{ required: true, message: 'Please select the image' }]">
                <a-select v-model:value="formState.image" placeholder="Select the image">
                    <a-select-option v-for="image in     images" :key="image.id" :value="image.image"
                        :image="image.image">
                        {{ image.image }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item :label="`Port${index + 1}`" name="ports" v-for="(port, index) in     formState.ports"
                :key="index" :rules="[{ required: true, message: 'Please input the port!' }]">
                <a-input-number v-model:value="port.port" style="width: 230px">
                    <template #addonAfter>
                        <a-select v-model:value="port.appProtocol" style="width: 80px">
                            <a-select-option value="http">http</a-select-option>
                            <a-select-option value="http2">http2</a-select-option>
                            <a-select-option value="tcp">tcp</a-select-option>
                        </a-select>
                    </template>
                </a-input-number>
                <MinusCircleOutlined v-if="index != 0" style="line-height: 35px; margin-left: 8px;"
                    @click="removePort(port)" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                <a-button type="dashed" size="small" @click="addPort">
                    <PlusOutlined />
                    Add Port
                </a-button>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
  
  