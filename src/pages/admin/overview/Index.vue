<script lang="ts" setup>
import { useKiaeApi } from '@/hooks/kiae';
import { ref } from 'vue';

const ready = ref(true)
const { systemSvc } = useKiaeApi()
systemSvc.systemServiceGetStatus().then(ret => {
    ready.value = ret.data.ready || false
    console.log(ready.value);
})
</script>

<template>
    <a-alert v-if="!ready" message="系统未就绪" description="请先到系统设置中完成必要的配置。代码源、镜像源和镜像构建器各最少一项配置。" type="error" />

    <a-alert v-else message="系统已就绪" description="配置完成了，感谢您的使用~" type="success" show-icon />

    <br>
    <a-alert message="招募贡献者" description="项目积极开发中，欢迎有兴趣的朋友加入一起完善" type="info" show-icon />

    <br>
    <a-space>
        <a href="https://kiae.dev/">官方文档</a>
        <a href="https://github.com/kiaedev/kiae">项目源码</a>
        <a href="https://github.com/kiaedev/kiae/issues">问题反馈</a>
    </a-space>

</template>