<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useFormSubmiter, useModal } from "@/hooks/modal";
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue';
import { useRequest } from 'vue-request';
import { useProject } from '@/hooks/project';
import { SelectValue } from 'ant-design-vue/lib/select';
const emit = defineEmits(['done'])
const props = defineProps<{
    pid: string
}>()
const { currentPid, projectGet } = useProject()

const { visible, modalOpen, modalClose } = useModal()

const { providerSvc, imageSvc, } = useKiaeApi()

const gitRefsSvc = async () => {
    const proj = await projectGet(currentPid())
    const gitUrl = proj.gitRepo || ''
    const provider = gitUrl.substring(gitUrl.indexOf("@") + 1, gitUrl.indexOf('.'))
    const repoName = gitUrl.substring(gitUrl.indexOf(":") + 1, gitUrl.indexOf('.git'))
    console.log(provider, repoName);

    formState.ref = ''
    return formState.type == 'branch' ? providerSvc.providerServiceListBranches(provider, repoName) : providerSvc.providerServiceListTags(provider, repoName)
}

const { data, loading, run } = useRequest(gitRefsSvc, { manual: true });
const gitRefs = computed(() => {
    return data.value?.data.items?.map((item: any) => ({ label: item.name, value: item.name, commit: item.commit }))
})

const onCommitChange = (value: SelectValue, options: any) => {
    const { commit } = options
    formState.commitId = commit.sha1
    formState.commitMsg = commit.message
    formState.commitAuthor = commit.committerName
}

const { formState, formSubmit } = useFormSubmiter({ type: 'branch' }, (values: any) => {
    imageSvc.imageServiceCreate(props.pid, values).then(() => {
        message.success("保存成功")
        modalClose()
        emit('done')
    })
})

watch(visible, (v) => {
    if (v) run()
})

</script>

<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" title="镜像构建" :footer="null">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" autocomplete="off"
            @finish="formSubmit">
            <a-form-item label="SourceRef" name="type">
                <a-radio-group v-model:value="formState.type" @change="run">
                    <a-radio value="branch">Branch</a-radio>
                    <a-radio value="tag">Tag</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="Commit" name="ref" :rules="[{ required: true, message: '请选择代码!' }]">
                <a-select v-model:value="formState.ref" :options="gitRefs" :loading="loading" :disabled="loading"
                    @change="onCommitChange" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit">构建</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>