
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
            <!-- <a-form-item :label="`端口${index + 1}`" name="ports" v-for="(port, index) in     formState.ports"
                :key="index" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-number v-model:value="port.port" style="width: 230px">
                    <template #addonAfter>
                        <a-select v-model:value="port.protocol" style="width: 80px">
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
            </a-form-item> -->
            <a-form-item>
                <a-button type="primary">保存</a-button>
            </a-form-item>
        </a-form>
    </a-card>
    <!-- <br>
    <a-card title="端口配置" style="width: 40%">
        <template #extra><a href="#">more</a></template>

        <a-form>
        </a-form>
    </a-card> -->
    <br>
    <div>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                <a-card title="存活探测">
                    <HealthProbe v-model:value="formState.livenessProbe"></HealthProbe>
                </a-card>
            </a-col>
            <a-col :span="12">
                <a-card title="就绪探测">
                    <HealthProbe v-model:value="formState.readinessProbe"></HealthProbe>
                </a-card>
            </a-col>
        </a-row>
    </div>
    <br>
    <a-card title="高级操作">
        <a-form-item label="代码仓库">
            <a-input v-model:value="formState.git" placeholder="input placeholder" />
        </a-form-item>
    </a-card>
</template>
  