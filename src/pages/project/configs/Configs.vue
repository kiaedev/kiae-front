
<script lang="ts" setup>
import { ref } from 'vue';
const dataSource = ref<any>([]);
const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '挂载路径',
        dataIndex: 'mount_path',
    },
    {
        title: '创建时间',
        dataIndex: 'created',
    },
]

</script>

<template>
    <div>
        <a-button>新增配置</a-button>
    </div>
    <a-table :dataSource="dataSource" :columns="columns" />
</template>

<style>
</style>
