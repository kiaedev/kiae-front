
<script lang="ts" setup>
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { useProject } from '@/hooks/project';
import { useFormSubmiter } from '@/hooks/modal';
import { useRequest } from 'vue-request';
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue';


const { builderSvc, projSvc } = useKiaeApi()
const { formState, resetFields, formSubmit } = useFormSubmiter({ name: '', builderId: '', buildEnvs: [], runArgsOveride: false }, (values: any) => {
    projSvc.projectServiceUpdate(currentPid(), values).then(() => {
        message.success("保存成功")
    })
});
const { data, loading, error, run } = useRequest(() => builderSvc.builderServiceList());
const builders = computed(() => {
    return data.value?.data.items?.map(el => ({ label: el.name, value: el.id, envs: el.packs?.map(pack => pack.envs) }))
})
const packEnvs = computed(() => {
    return builders.value?.find(el => el.value == formState.builderId)?.envs?.flat().map(el => ({ label: el?.name, value: el?.name }))
})

const { currentPid, projectGet } = useProject()
useRequest(() => projectGet(currentPid())).runAsync().then((proj) => {
    let value: any = proj
    value.runArgsOveride = proj.runArgs && proj.runArgs.length > 0
    resetFields(proj)
})

const removeDomain = (index: any) => {
    formState.buildEnvs.splice(index, 1);
};

const addDomain = () => {
    formState.buildEnvs.push({
        value: '',
        key: Date.now(),
    });
};
</script>
    

<template>
    <a-card title="基本信息">
        <a-form layout="vertical" :model="formState" style="width: 500px">
            <a-form-item label="名称">
                <a-input v-model:value="formState.name" placeholder="input placeholder" />
            </a-form-item>
            <a-form-item label="介绍">
                <a-textarea v-model:value="formState.intro" placeholder="input placeholder" />
            </a-form-item>
        </a-form>

        <div class="card-footer">
            <a-button type="primary" style="float:right" @click="formSubmit">Save</a-button>
        </div>
    </a-card>
    <br>

    <a-card title="Build & Development Settings">
        <a-form layout="vertical" :model="formState" style="width: 500px">
            <a-form-item label="构建框架">
                <a-select v-model:value="formState.builderId" :options="builders" />
            </a-form-item>

            <a-form-item label="构建变量">
                <a-row v-for="(env, index) in formState.buildEnvs" :key="index">
                    <a-col :span="10">
                        <a-select v-model:value="env.name" placeholder="请选择构建时环境变量" :options="packEnvs" />
                    </a-col>
                    <a-col :span="8" :offset="1">
                        <a-input v-model:value="formState.buildEnvs[env.name]"></a-input>
                    </a-col>
                    <a-col :span="4" :offset="1">
                        <MinusCircleOutlined class="dynamic-delete-button" @click="removeDomain(index)" />
                    </a-col>
                </a-row>
                <a-button type="dashed" style="width: 60%" @click="addDomain">
                    <PlusOutlined />
                    添加构建变量
                </a-button>
            </a-form-item>
            <a-row>
                <a-col :span="16">
                    <a-form-item label="启动参数">
                        <a-input v-model:value="formState.runArgs" :disabled="!formState.runArgsOveride"
                            placeholder="None">
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="7" :offset="1">
                    <a-form-item label="Overide">
                        <a-switch v-model:checked="formState.runArgsOveride" />
                    </a-form-item>
                </a-col>
            </a-row>

            <!-- 控制哪个分支触发构建 -->
            <a-form-item label="CI">
                <a-switch v-model:checked="formState.ci" />
            </a-form-item>

            <!-- 控制哪个镜像部署到哪个环境 -->
            <a-form-item label="CD">
                <a-switch v-model:checked="formState.cd" />
            </a-form-item>
        </a-form>


        <div class="card-footer">
            <a-button type="primary" style="float:right" @click="formSubmit">Save</a-button>
        </div>
    </a-card>
    <br>

    <a-card title="代码仓库">
        <a-form-item label="Address">
            <a-input v-model:value="formState.gitRepo" placeholder="input placeholder" />
        </a-form-item>

        <div class="card-footer">
            <a-button type="primary" style="float:right" @click="formSubmit">Save</a-button>
        </div>
    </a-card>
    <br>

    <a-card>
        <a-card-meta title="Delete Project"
            description="The project will be permanently deleted, including its deployments and domains. This action is irreversible and can not be undone.">
        </a-card-meta>

        <div class="card-footer">
            <a-button type="primary" danger style="float:right">Delete</a-button>
        </div>
    </a-card>
</template>
  
<style>
.card-footer {
    width: 100%;
    margin-top: 20px;
}
</style>