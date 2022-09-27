
<script lang="ts">
import { defineComponent, reactive, ref, defineEmits, onMounted } from 'vue';
import { useEnvs, useImages, useProject } from '@/hooks/project';
import { useApplication } from "@/hooks/app_op"
import { useRoute } from 'vue-router';
import { useKiaeApi } from '@/hooks/kiae';
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
export default defineComponent({
    setup() {
        const envType = ref('std')
        const route = useRoute()
        console.log(route.params.pid.toString());

        const formState = reactive<FormState>({
            pid: route.params.pid.toString(),
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
        });
        console.log(formState);
        const { handleAppCreate } = useApplication()
        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

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
        const images = ref<any>([])
        const { imageSvc } = useKiaeApi()
        const { currentPid } = useProject()
        onMounted(async () => {
            imageSvc.imageServiceList(currentPid()).then((res) => {
                images.value = res.data?.items
            })
        })
        const { envs } = useEnvs()
        return {
            envType,
            formState,
            envs,
            images,
            handleAppCreate,
            onFinishFailed,
            addPort,
            removePort
        };
    },
});
</script>

<template>
    <a-form :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="() => { handleAppCreate(formState, () => $emit('done')); }" @finishFailed="onFinishFailed">
        <a-form-item label="环境类型">
            <a-radio-group v-model:value="envType">
                <a-radio-button value="std">常规环境</a-radio-button>
                <a-radio-button value="custom">自定义环境</a-radio-button>
            </a-radio-group>
        </a-form-item>
        <a-form-item label="环境" name="env" :rules="[{ required: true, message: '请选择应用环境' }]">
            <a-select v-if="envType == 'std'" v-model:value="formState.env" placeholder="请选择您的应用环境">
                <a-select-option v-for="env in     envs" :key="env.id" :value="env.name">
                    {{ env.intro }}
                </a-select-option>
            </a-select>
            <a-input v-else placeholder="请输入一个环境名称"></a-input>
        </a-form-item>
        <a-form-item label="镜像" name="image" :rules="[{ required: true, message: '请选择应用镜像' }]">
            <a-select v-model:value="formState.image" placeholder="请选择您的应用镜像">
                <a-select-option v-for="image in     images" :key="image.id" :value="image.image" :image="image.image">
                    {{ image.image }}
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item :label="`端口${index + 1}`" name="ports" v-for="(port, index) in     formState.ports" :key="index"
            :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input-number v-model:value="port.port" style="width: 230px">
                <template #addonAfter>
                    <a-select v-model:value="port.appProtocol" style="width: 80px">
                        <a-select-option value=".com">http</a-select-option>
                        <a-select-option value=".jp">http2</a-select-option>
                        <a-select-option value=".cn">tcp</a-select-option>
                    </a-select>
                </template>
            </a-input-number>
            <MinusCircleOutlined v-if="index != 0" style="line-height: 35px; margin-left: 8px;"
                @click="removePort(port)" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
            <a-button type="dashed" size="small" @click="addPort">
                <PlusOutlined />
                添加端口
            </a-button>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
            <a-button type="primary" html-type="submit">保存</a-button>
        </a-form-item>
    </a-form>
</template>
  
  