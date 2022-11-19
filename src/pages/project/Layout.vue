<template>
  <a-layout style="padding: 12px 0; background: #fff">
    <a-layout-sider width="200" style="background: #fff">
      <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" @click="handleClick"
        style="height: 100%;">
        <a-menu-item key="apps">Applications</a-menu-item>
        <a-menu-item key="deployments">Deployments</a-menu-item>
        <a-menu-item key="images">Images</a-menu-item>
        <!-- <a-menu-item key="configs">配置中心</a-menu-item> -->
        <!-- <a-menu-item key="depends">依赖管理</a-menu-item> -->
        <!-- <a-menu-item key="permissions">权限控制</a-menu-item> -->
        <a-menu-item key="settings">Settings</a-menu-item>
        <!-- <a-sub-menu key="sub2">
          <template #title>
            <span>
              <laptop-outlined />
              项目设置
            </span>
          </template>
          <a-menu-item key="settings">基本设置</a-menu-item>
          <a-menu-item key="6">代码仓库</a-menu-item>
          <a-menu-item key="7">镜像仓库</a-menu-item>
        </a-sub-menu> -->

      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
  
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([])
const handleClick = (e: any) => {
  console.log(e.keyPath)
  openKeys.value = e.keyPath;
  router.push(`${e.keyPath.join('/')}`)
};

watch(route, (to) => {
  let keyPath: string[] = route.path.split('/').slice(1)
  console.log(keyPath, 222)
  selectedKeys.value = keyPath
})

onMounted(() => {
  let keyPath: string[] = route.path.split('/').slice(1)
  console.log(keyPath, 222)
  selectedKeys.value = keyPath
  openKeys.value = keyPath
})

</script>

<style>
</style>