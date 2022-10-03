
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { useProject } from '@/hooks/project';

export default defineComponent({
    setup() {
        const formState = ref<any>({});
        const { currentPid, projectGet } = useProject()
        onMounted(async () => {
            const proj = await projectGet(currentPid())
            console.log(proj);

            formState.value = proj
        })
        return {
            formState,
        };
    },
});
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
            <a-button type="primary" style="float:right">Save</a-button>
        </div>
    </a-card>
    <br>

    <a-card title="Build & Development Settings">
        <!-- 控制哪个分支触发构建 -->
        <a-form-item label="CI">
            <a-switch v-model:value="formState.ci" />
        </a-form-item>

        <!-- 控制哪个镜像部署到哪个环境 -->
        <a-form-item label="CD">
            <a-switch v-model:value="formState.cd" />
        </a-form-item>

        <div class="card-footer">
            <a-button type="primary" style="float:right">Save</a-button>
        </div>
    </a-card>
    <br>

    <a-card title="代码仓库">
        <a-form-item label="Address">
            <a-input v-model:value="formState.git" placeholder="input placeholder" />
        </a-form-item>

        <div class="card-footer">
            <a-button type="primary" style="float:right">Save</a-button>
        </div>
    </a-card>
    <br>

    <a-card title="镜像仓库">
        <a-form-item label="ImageAddress">
            <a-input v-model:value="formState.git" placeholder="input placeholder" />
        </a-form-item>
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