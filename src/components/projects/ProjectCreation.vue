<template>
    <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="Git" name="git" :rules="[{ required: true, message: '请提供一个git仓库地址!' }]">
            <a-input v-model:value="formState.git" />
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
</template>
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useProject } from '@/hooks/project';
  
  interface FormState {
      git: string;
      name: string;
      intro: string;
  }
  export default defineComponent({
      emits: ["done"],
      setup(props, ctx) {
          const formState = reactive<FormState>({
              git: '',
              name: '',
              intro: '',
          });
  
          const { projectCreate } = useProject()
          const onFinish = async (values: any) => {
              await projectCreate(values)
              ctx.emit("done")
          };
  
          const onFinishFailed = (errorInfo: any) => {
              console.log('Failed:', errorInfo);
          };
          return {
              formState,
              onFinish,
              onFinishFailed,
          };
      },
  });
  </script>
  
  