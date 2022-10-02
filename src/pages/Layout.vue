
<script lang="ts">
import { Route } from 'ant-design-vue/lib/breadcrumb/Breadcrumb';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const routes = ref<Route[]>([
      {
        path: '',
        breadcrumbName: '首页',
      },
      {
        path: 'projects',
        breadcrumbName: '项目',
      },
      // {
      //   path: 'second',
      //   breadcrumbName: 'second',
      // },
    ]);

    return {
      routes,
      selectedKeys: ref<string[]>(['1']),
    };
  },
});
</script>
  
<template>
  <a-layout class="layout">
    <a-layout-header style="height: 48px;line-height: 48px;">
      <div class="logo" />
      <div style="float: right">

        <a-avatar style="background-color: #87d068">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
      </div>
    </a-layout-header>

    <a-layout-content style="padding: 0 100px">
      <a-breadcrumb :routes="routes" style="margin: 15px 0">
        <template #itemRender="{ route, routes, paths }">
          <span v-if="routes.indexOf(route) === routes.length - 1">{{ route.breadcrumbName }}</span>
          <router-link v-else :to="`/`+paths.join('/')">{{ route.breadcrumbName }}</router-link>
        </template>
      </a-breadcrumb>

      <div :style="{ minHeight: '800px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>


</template>
<style>
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
