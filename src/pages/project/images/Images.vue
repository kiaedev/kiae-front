
<script lang="ts" setup>
import { ref } from 'vue';
import { useImages } from '../../../hooks/project';
const { images } = useImages()
const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '完整地址',
        dataIndex: 'image',
    },
    {
        title: '最近版本',
        dataIndex: 'latest_tag',
    },
    {
        title: '最近更新',
        dataIndex: 'updated',
    },
    {
        title: '创建时间',
        dataIndex: 'created',
    },
]

</script>
    
<template>
    <div>
    </div>
    <a-table :dataSource="images" :columns="columns" />
</template>

<style>
</style>
    