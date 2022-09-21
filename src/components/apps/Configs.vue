<script lang="ts" setup>
import { ref } from "@vue/reactivity"
import { useModal, useSelect } from "@/hooks/modal";
import { AppConfiguration } from "@/libs/kiae";
import { useApplication } from "@/hooks/app_op";

defineEmits(["refresh"])
const props = defineProps<{
    appid: string
    configs?: Array<AppConfiguration>
}>()

const { handleAppCfgDelete } = useApplication()

const columns = [
    {
        title: '名称',
        dataIndex: 'filename',
    },
    {
        title: '挂载目录',
        dataIndex: 'mountPath',
    },
    {
        title: '内容',
        dataIndex: 'content',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
    },
    {
        title: '最近更新',
        dataIndex: 'updatedAt',
    },
    {
        title: '操作',
        key: 'action',
    },
]
</script>

<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的配置" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <ConfigEditor :appid="appid" @done="$emit('refresh')">添加配置文件</ConfigEditor>
            </a-button>
        </a-col>
    </a-row>

    <a-table :columns="columns" :dataSource="configs">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'createdAt' || column.dataIndex === 'updatedAt' ">
                {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <ConfigEditor :appid="appid" :config="record" @done="$emit('refresh')">编辑</ConfigEditor>
                    <a-divider type="vertical" />
                    <a @click="handleAppCfgDelete(appid, record, ()=>$emit('refresh'))"> 删除 </a>
                </span>
            </template>
        </template>
    </a-table>
</template>