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
                <a-menu-item key="overview">
                    <pie-chart-outlined />
                    <span>{{ $t('admin.menu.home') }}</span>
                </a-menu-item>
                <a-sub-menu key="clusters">
                    <template #title>
                        <span>
                            <team-outlined />
                            <span>{{ $t('admin.menu.clusterManager') }}</span>
                        </span>
                    </template>
                    <a-menu-item key="">{{ $t('admin.menu.clusters') }}</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="gateway">
                    <template #title>
                        <span>
                            <user-outlined />
                            <span>{{ $t('admin.menu.gateway') }}</span>
                        </span>
                    </template>
                    <a-menu-item key="instances">{{ $t('admin.menu.instance') }}</a-menu-item>
                    <a-menu-item key="entries">{{ $t('admin.menu.entry') }}</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="system">
                    <template #title>
                        <span>
                            <team-outlined />
                            <span>{{ $t('admin.menu.system') }}</span>
                        </span>
                    </template>
                    <a-menu-item key="git-providers">{{ $t('admin.menu.gitProvider') }}</a-menu-item>
                    <a-menu-item key="registries">{{ $t('admin.menu.registry') }}</a-menu-item>
                    <a-menu-item key="builders">{{ $t('admin.menu.builder') }}</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>Admin</a-breadcrumb-item>
                    <a-breadcrumb-item>Overview</a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <router-view></router-view>
                </div>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Kiae ©2022 Created by saltbo
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
  