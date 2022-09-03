
  <script lang="ts">
  import { computed, defineComponent, reactive } from 'vue';
  import type { UnwrapRef } from 'vue';
  
  interface FormState {
      fieldA: string;
      fieldB: string;
  }
  export default defineComponent({
      setup() {
          const formState: UnwrapRef<FormState> = reactive({
              fieldA: '',
              fieldB: '',
          });
          //   const formItemLayout = computed(() => {
          //       return layout === 'horizontal'
          //           ? {
          //               labelCol: { span: 4 },
          //               wrapperCol: { span: 14 },
          //           }
          //           : {};
          //   });
          //   const buttonItemLayout = computed(() => {
          //       return layout === 'horizontal'
          //           ? {
          //               wrapperCol: { span: 14, offset: 4 },
          //           }
          //           : {};
          //   });
          return {
              formState,
              //   formItemLayout,
              //   buttonItemLayout,
          };
      },
  });
  </script>
    

<template>
    <a-card title="基本信息">
        <a-form layout="vertical" :model="formState">
            <a-form-item label="名称">
                <a-input v-model:value="formState.fieldA" placeholder="input placeholder" />
            </a-form-item>
            <a-form-item label="介绍">
                <a-input v-model:value="formState.fieldB" placeholder="input placeholder" />
            </a-form-item>
            <a-form-item label="代码仓库">
                <a-input v-model:value="formState.fieldB" placeholder="input placeholder" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary">保存</a-button>
            </a-form-item>
        </a-form>
    </a-card>
    <br>
    <a-card title="存活探测" style="width: 40%">
        <template #extra><a href="#">more</a></template>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
    </a-card>
    <br>
    <a-card title="就绪探测" style="width: 40%">
        <template #extra><a href="#">more</a></template>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
    </a-card>
    <br>
    <a-card title="删除" style="width: 40%">
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
    </a-card>
</template>
  