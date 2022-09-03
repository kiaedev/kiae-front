<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <!-- <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu> -->
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb :routes="routes">
        <template #itemRender="{ route, routes, paths }">
          <span v-if="routes.indexOf(route) === routes.length - 1">{{ route.breadcrumbName }}</span>
          <router-link v-else :to="`/`+paths.join('/')">{{ route.breadcrumbName }}</router-link>
        </template>
      </a-breadcrumb>
      <div :style="{ background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>


</template>
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
      selectedKeys: ref<string[]>(['2']),
    };
  },
});
</script>
<style>
.site-layout-content {
  min-height: 280px;
  /* padding: 24px; */
  background: #fff;
}

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
