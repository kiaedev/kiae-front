
<script lang="ts" setup>
import { useProject } from '@/hooks/project';
import { useKiaeApi } from '@/hooks/kiae';
import { useRequest } from 'vue-request';
import { message } from 'ant-design-vue';
import { useImageOperater } from '@/hooks/image_op';

const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '版本',
        dataIndex: 'tag',
    },
    // {
    //     title: '状态',
    //     dataIndex: 'status',
    // },
    {
        title: '完整地址',
        dataIndex: 'image',
    },
    {
        title: '最近更新',
        dataIndex: 'updatedAt',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
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
                <a @click="message.warn('功能开发中，敬请期待')">构建新镜像</a>
            </a-dropdown-button>
        </a-col>
    </a-row>

    <a-table :dataSource="data?.data.items" :columns="columns">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex?.endsWith('At')">
                {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <a @click="handleDelete(record, run)">删除</a>
                </span>
            </template>
        </template>
    </a-table>
</template>

<style>

</style>
    