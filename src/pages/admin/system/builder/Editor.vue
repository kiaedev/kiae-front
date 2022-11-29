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

let title = !props.value ? "New Builder" : "Edit Builder"
const { visible, modalOpen, modalClose } = useModal()

const { builderSvc, registrySvc } = useKiaeApi()
const registryRequest = useRequest(() => registrySvc.registryServiceList());
const registries = computed(() => {
    return registryRequest.data.value?.data.items?.map(el => ({ label: el.name, value: el.id }))
})
const { data, loading, error, runAsync } = useRequest(() => builderSvc.builderServiceSuggestedStacks(), { manual: true });
const suggestedStacks = computed(() => {
    let results = data.value?.data.items?.map((el: any) => ({ label: `${el.name} - ${el.intro}`, value: el.name }))
    results?.push({ label: 'Custom', value: '' })
    return results
})

const { formState, formSubmit } = useFormSubmiter({ cnb: 'Paketo Base', packs: [{ name: "", pack: "", envs: [] }] }, (values: any) => {
    builderSvc.builderServiceCreate(values).then(() => {
        message.success("Succeed")
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
    formState.packs.splice(index, 1);
};

const addDomain = () => {
    formState.packs.push({
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

            <a-form-item :label="$t('name')" name="name"
                :rules="[{ required: true, message: 'Please input the name!' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item :label="$t('intro')" name="intro"
                :rules="[{ required: true, message: 'Please input the intro!' }]">
                <a-input v-model:value="formState.intro" />
            </a-form-item>
            <a-form-item label="Registry" name="registry_id"
                :rules="[{ required: true, message: 'Please select the registry!' }]">
                <a-select v-model:value="formState.registry_id" :options="registries" />
            </a-form-item>

            <a-form-item label="Stack" name="cnb">
                <a-select v-model:value="formState.cnb" @change="onProviderSwitch" :options="suggestedStacks" />
            </a-form-item>
            <a-form-item label="StackID" name="stack_id"
                :rules="[{ required: true, message: 'Please input the stackId!' }]">
                <a-input v-model:value="formState.stack_id" />
            </a-form-item>
            <a-form-item :label="$t('buildImage')" name="build_image"
                :rules="[{ required: true, message: 'Please input the build image!' }]">
                <a-input v-model:value="formState.build_image" />
            </a-form-item>
            <a-form-item :label="$t('runImage')" name="run_image"
                :rules="[{ required: true, message: 'Please input the run image!' }]">
                <a-input v-model:value="formState.run_image" />
            </a-form-item>
            <a-form-item label="Buildpacks">
                <a-row v-for="(pack, index) in formState.packs" :key="index" style="margin: 10px 0" class="inner-form">
                    <a-col>
                        <a-row>
                            <a-col :span="16">
                                <a-input size="small" v-model:value="pack.id" placeholder="PackId"></a-input>
                            </a-col>
                            <a-col :span="7" :offset="1">
                                <a-input size="small" v-model:value="pack.lang" placeholder="Language" />
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24">
                                <a-input size="small" v-model:value="pack.image" placeholder="PackImage"></a-input>
                            </a-col>
                        </a-row>

                        <a-row v-for="(env, index) in pack.envs" :key="index">
                            <a-col :span="10">
                                <a-input size="small" v-model:value="env.name" placeholder="EnvVar Name" />
                            </a-col>
                            <a-col :span="9" :offset="1">
                                <a-input size="small" v-model:value="env.intro" placeholder="Introduction"></a-input>
                            </a-col>
                            <a-col :span="3" :offset="1">
                                <MinusCircleOutlined class="dynamic-delete-button"
                                    @click="pack.envs.splice(index, 1);" />
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-button size="small" type="dashed" style="width: 50%" @click="pack.envs.push({})">
                                <PlusOutlined />
                                Add EnvVar
                            </a-button>
                        </a-row>

                    </a-col>
                    <a-col :span="1" :offset="3">
                        <MinusCircleOutlined v-if="formState.packs.length > 1" class="dynamic-delete-button"
                            :disabled="formState.packs.length === 1" @click="removeDomain(index)" />
                    </a-col>
                </a-row>
                <a-button type="dashed" style="width: 60%" @click="addDomain">
                    <PlusOutlined />
                    Add Buildpack
                </a-button>
            </a-form-item>


            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style scoped>
.inner-form {
    background-color: #eef0f5;
    padding: 10px 10px;
    margin: 0px 50px
}

.inner-form .ant-row {
    margin: 3px 0;
}
</style>