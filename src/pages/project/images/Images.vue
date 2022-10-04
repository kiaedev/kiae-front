
<script lang="ts" setup>
import { useProject } from '@/hooks/project';
import { useKiaeApi } from '@/hooks/kiae';
import { useRequest } from 'vue-request';
import { useImageOperater } from '@/hooks/image_op';
import { computed } from 'vue';
import { ImageImageStatus } from '@/libs/kiae';
import { invert } from 'lodash';

const columns = [
    {
        title: '名称',
        dataIndex: 'image',
    },
    {
        title: '版本',
        dataIndex: 'tag',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '最近更新',
        dataIndex: 'updatedAt',
    },
    {
        title: '操作',
        key: 'action'
    }
]

const { currentPid } = useProject()
const { imageSvc } = useKiaeApi()
const { handleDelete } = useImageOperater()
const { data, loading, error, run } = useRequest(() => imageSvc.imageServiceList(currentPid()));
const dataSource = computed(() => data.value?.data.items?.map((el: any) => {
    const colors: any = {
        [ImageImageStatus.Pending]: 'warning',
        [ImageImageStatus.Building]: 'processing',
        [ImageImageStatus.Failed]: 'red',
        [ImageImageStatus.Published]: 'green',
        [ImageImageStatus.Expired]: 'default',
    }
    el.extra = { statusColor: colors[el.status], statusText: invert(ImageImageStatus)[el.status] }
    return el
}))
</script>
    
<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的镜像" style="width: 300px" />
        </a-col>
        <a-col flex="300px">
            <a-dropdown-button type="primary" style="float: right">
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="1">
                            <ImageEditor :pid="currentPid()" @done="run">添加镜像</ImageEditor>
                        </a-menu-item>
                    </a-menu>
                </template>
                <ImageBuild :pid="currentPid()" @done="run">构建新镜像</ImageBuild>
            </a-dropdown-button>
        </a-col>
    </a-row>

    <a-table :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex?.endsWith('At')">
                {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
            <template v-else-if="column.dataIndex === 'status'">
                <a-tag :color="record.extra.statusColor">{{ record.extra.statusText }}</a-tag>
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <Terminal :image="record">构建日志</Terminal>
                    <a-divider type="vertical"></a-divider>
                    <a @click="handleDelete(record, run)">删除</a>
                </span>
            </template>
        </template>
    </a-table>
</template>

<style>

</style>
    