<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue';
import { useRequest } from 'vue-request';
import { SelectValue } from 'ant-design-vue/lib/select';
const emit = defineEmits(['done'])
const props = defineProps<{
    pid?: string
}>()

const { visible, modalOpen, modalClose } = useModal()

const { providerSvc, projSvc, } = useKiaeApi()
const { data, runAsync } = useRequest(() => providerSvc.providerServiceList(), { manual: true });
const providers = computed(() => {
    return data.value?.data.items?.map((item: any) => ({ label: item.name, value: item.name }))
})

const { formState, formSubmit } = useFormSubmiter({ gitProvider: '' }, (values: any) => {
    projSvc.projectServiceCreate(values).then(() => {
        message.success("保存成功")
        modalClose()
        emit('done')
    })
})

const repo = useRequest(() => providerSvc.providerServiceListRepos(formState.gitProvider), { manual: true })
const repos = computed(() => {
    return repo.data.value?.data.items?.map((item: any) => ({ label: item.fullName, value: item.fullName, repo: item }))
})
const reposLoading = computed(() => repo.loading.value);


const onProviderSwitch = () => {
    if (formState.gitProvider == '') {
        formState.gitProvider = data.value?.data.items?.at(0)?.name
    }

    repo.run()
}

const onRepoChange = (value: SelectValue, options: any) => {
    const { repo } = options
    console.log(value, repo);
    formState.name = repo.fullName.replace("/", "-")
    formState.intro = repo.intro
    formState.gitRepo = repo.gitUrl
}

const gotoAuthorize = (provider: string) => {
    const callback = encodeURIComponent(`${location.origin}/#/done`)
    const width = 800;
    const height = 500;
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);
    var myWindow = window.open(`/provider/oauth2/authorize?provider=${provider}&callback=${callback}`, 'mywin', `width=${width},height=${height},left=${left},top=${top}`);
    window.addEventListener('message', event => {
        if (event.origin === location.origin) {
            if (event.data === 'close') {
                myWindow?.close()
                repo.error.value = undefined
                repo.run()
            }
        }
    })

    myWindow?.focus();
}

watch(visible, (val) => {
    if (val) {
        runAsync().then(onProviderSwitch)
    }
})
</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" title="创建项目" :footer="null" width="800px">

        <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="formSubmit">

            <a-form-item label="Git源" name="type">
                <a-radio-group v-model:value="formState.gitProvider" :options="providers" @change="onProviderSwitch" />
            </a-form-item>

            <a-form-item label="仓库" name="repo">
                <a-select v-if="!repo.error.value" :options="repos" :loading="reposLoading" @change="onRepoChange" />
                <a-button v-if="!reposLoading && !repos" size="small" @click="gotoAuthorize(formState.gitProvider)">
                    去授权
                </a-button>
            </a-form-item>

            <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请给项目起一个名字!' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="描述" name="intro" :rules="[{ required: true, message: '请给项目一个描述信息!' }]">
                <a-textarea v-model:value="formState.intro" />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
  
  