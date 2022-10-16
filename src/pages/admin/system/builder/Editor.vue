<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue/es';
import { useRequest } from 'vue-request';
const props = defineProps<{
    // app: Object,
    value?: Object,
}>()

const emit = defineEmits(["done"])

let title = !props.value ? "创建构建器" : "编辑构建器"
const { visible, modalOpen, modalClose } = useModal()

const { builderSvc } = useKiaeApi()
const { data, loading, error, runAsync } = useRequest(() => builderSvc.builderServiceSuggestedStacks(), { manual: true });
const suggestedStacks = computed(() => {
    let results = data.value?.data.items?.map((el: any) => ({ label: `${el.name} - ${el.intro}`, value: el.name }))
    results?.push({ label: 'Custom', value: '' })
    return results
})
const { formState, formSubmit } = useFormSubmiter({ cnb: 'Paketo Base', packs: [{ name: "", pack: "", envs: [] }] }, (values: any) => {
    builderSvc.builderServiceCreate(values).then(() => {
        message.success("保存成功")
        modalClose()
        emit("done")
    })
})
const onProviderSwitch = () => {
    const p = data.value?.data.items?.find(el => el.name == formState.cnb)
    formState.stack_id = p?.stackId
    formState.build_image = p?.buildImage
    formState.run_image = p?.runImage
}

runAsync().then(onProviderSwitch)


const removeDomain = (index: any) => {
    formState.lbs.splice(index, 1);
};

const addDomain = () => {
    formState.lbs.push({
        value: '',
        key: Date.now(),
        envs: []
    });
};
</script>
    
<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" :title="title" :footer="null" width="800px">
        <a-form :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">

            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入名称!' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="描述" name="intro" :rules="[{ required: true, message: '请输入描述!' }]">
                <a-input v-model:value="formState.intro" />
            </a-form-item>

            <a-form-item label="Stack源" name="cnb">
                <a-select v-model:value="formState.cnb" @change="onProviderSwitch" :options="suggestedStacks" />
            </a-form-item>
            <a-form-item label="StackID" name="stack_id" :rules="[{ required: true, message: '请输入客户端ID!' }]">
                <a-input v-model:value="formState.stack_id" />
            </a-form-item>
            <a-form-item label="构建镜像" name="build_image" :rules="[{ required: true, message: '请输入构建镜像!' }]">
                <a-input v-model:value="formState.build_image" />
            </a-form-item>
            <a-form-item label="运行镜像" name="run_image" :rules="[{ required: true, message: '请输入运行镜像!' }]">
                <a-input v-model:value="formState.run_image" />
            </a-form-item>
            <a-form-item label="Buildpacks">
                <a-row v-for="(pack, index) in formState.packs" :key="index" style="margin: 10px 0">
                    <a-col>
                        <a-row>
                            <a-col :span="6">
                                <a-input v-model:value="pack.lang" placeholder="语言名称" />
                            </a-col>
                            <a-col :span="12" :offset="1">
                                <a-input v-model:value="pack.image" placeholder="PackImage"></a-input>
                            </a-col>
                        </a-row>

                        <a-row v-for="(env, index) in pack.envs" :key="index">
                            <a-col :span="5">
                                <a-input v-model:value="env.name" placeholder="名称" />
                            </a-col>
                            <a-col :span="13" :offset="1">
                                <a-input v-model:value="env.intro" placeholder="描述"></a-input>
                            </a-col>
                            <a-col :span="4" :offset="1">
                                <MinusCircleOutlined class="dynamic-delete-button"
                                    @click="pack.envs.splice(index, 1);" />
                            </a-col>
                        </a-row>

                        <a-button type="dashed" style="width: 50%" @click="pack.envs.push({})">
                            <PlusOutlined />
                            添加环境变量
                        </a-button>
                    </a-col>
                    <a-col :span="4" :offset="1">
                        <MinusCircleOutlined v-if="formState.packs.length > 1" class="dynamic-delete-button"
                            :disabled="formState.packs.length === 1" @click="removeDomain(index)" />
                    </a-col>
                </a-row>
                <a-button type="dashed" style="width: 60%" @click="addDomain">
                    <PlusOutlined />
                    添加Buildpack
                </a-button>
            </a-form-item>


            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>