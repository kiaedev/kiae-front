
<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref } from 'vue';
import { Route } from 'ant-design-vue/lib/breadcrumb/Breadcrumb';
import { logout, useKiaeApi } from "@/hooks/kiae"
import { useRequest } from 'vue-request';
import { Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const selectedKeys = ref<string[]>(['1'])
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

const router = useRouter()
const { userSvc, systemSvc } = useKiaeApi()
const { data } = useRequest(() => userSvc.userServiceInfo())
const userProfile = computed(() => {
  return data.value?.data
})

systemSvc.systemServiceGetStatus().then(ret => {
  if (!ret.data.ready) {

    // FIXME: only warning 'contact administrators to setup settings' for the member

    Modal.warning({
      title: 'System Not Ready',
      content: "系统未就绪，请先到后台进行相关配置",
      onOk: () => {
        router.push('/admin')
      }
    })
  }
})


</script>
  
<template>
  <a-layout class="layout">
    <a-layout-header style="height: 48px;line-height: 48px;">
      <div class="logo" />
      <div style="float: right">

        <a-dropdown placement="bottomRight">
          <a-avatar v-if="userProfile?.avatar" :src="userProfile?.avatar" />
          <a-avatar v-else style="background-color: #87d068">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>

          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">Signed in as {{ userProfile?.nickname }}</a>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item>
                <a href="javascript:;" @click="logout">Logout</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>

    <a-layout-content style="padding: 0 100px">
      <a-breadcrumb :routes="routes" style="margin: 15px 0">
        <template #itemRender="{ route, routes, paths }">
          <span v-if="routes.indexOf(route) === routes.length - 1">{{ route.breadcrumbName }}</span>
          <router-link v-else :to="`/` + paths.join('/')">{{ route.breadcrumbName }}</router-link>
        </template>
      </a-breadcrumb>

      <div :style="{ minHeight: '800px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      Kiae ©2022 Created by saltbo
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
