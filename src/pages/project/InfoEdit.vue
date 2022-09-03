<template>
    <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="仓库类型">
            <a-radio-group v-model:value="formState.source_type">
                <a-radio-button value="git">Git</a-radio-button>
                <a-radio-button value="image">Image</a-radio-button>
            </a-radio-group>
        </a-form-item>
        <a-form-item label="仓库地址" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.name" />
        </a-form-item>
        <!-- <a-form-item label="项目描述" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-textarea v-model:value="formState.intro" />
        </a-form-item> -->

        <!-- <a-form-item name="remember" :wrapper-col="{ offset: 4, span: 16 }">
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item> -->

        <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
            <a-button type="primary" html-type="submit">去创建</a-button>
        </a-form-item>
    </a-form>
</template>
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  
  interface FormState {
      source_type: string;
      name: string;
      intro: string;
      remember: boolean;
  }
  export default defineComponent({
      setup() {
          const formState = reactive<FormState>({
              source_type: 'git',
              name: '',
              intro: '',
              remember: true,
          });
          const onFinish = (values: any) => {
              console.log('Success:', values);
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
  
  