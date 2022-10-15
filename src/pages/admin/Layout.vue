<script lang="ts" setup>
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()
const openKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([])
const collapsed = ref<boolean>(false)
const handleClick = (e: any) => {
    console.log(e.keyPath)
    openKeys.value = e.keyPath;
    router.push(`/admin/${e.keyPath.join('/')}`)
};
</script>

<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="handleClick">
                <a-menu-item key="1">
                    <pie-chart-outlined />
                    <span>首页</span>
                </a-menu-item>
                <a-sub-menu key="clusters">
                    <template #title>
                        <span>
                            <team-outlined />
                            <span>集群管理</span>
                        </span>
                    </template>
                    <a-menu-item key="">集群列表</a-menu-item>
                    <a-menu-item key="environments">环境列表</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="middlewares">
                    <template #title>
                        <span>
                            <user-outlined />
                            <span>中间件管理</span>
                        </span>
                    </template>
                    <a-menu-item key="">实例列表</a-menu-item>
                    <!-- <a-menu-item key="4">访问入口</a-menu-item>
                    <a-menu-item key="5">Alex</a-menu-item> -->
                </a-sub-menu>
                <a-sub-menu key="sub1">
                    <template #title>
                        <span>
                            <user-outlined />
                            <span>网关</span>
                        </span>
                    </template>
                    <a-menu-item key="3">实例控制</a-menu-item>
                    <a-menu-item key="4">访问入口</a-menu-item>
                    <a-menu-item key="5">Alex</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="system">
                    <template #title>
                        <span>
                            <team-outlined />
                            <span>系统设置</span>
                        </span>
                    </template>
                    <a-menu-item key="git-providers">代码仓库</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<style>
#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}
</style>
  