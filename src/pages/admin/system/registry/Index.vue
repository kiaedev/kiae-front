
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { useKiaeApi } from "@/hooks/kiae";
import { useRequest } from "vue-request";
import Editor from "./Editor.vue";
import { useRegistryOperater } from "@/hooks/op_registry";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const { registrySvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => registrySvc.registryServiceList());
const { handleDelete } = useRegistryOperater()

const columns = [

    {
        title: t('name'),
        width: 200,
        dataIndex: 'name',
    },
    {
        title: t('intro'),
        width: 300,
        ellipsis: true,
        dataIndex: 'intro',
    },
    {
        title: t('server'),
        dataIndex: 'server',
    },
    {
        title: t('username'),
        width: 190,
        dataIndex: 'username',
    },
    {
        title: t('action'),
        width: 120,
        key: 'action',
    },
]
</script>
<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的镜像源" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <Editor @done="run">添加镜像源</Editor>
            </a-button>
        </a-col>
    </a-row>

    <a-table :dataSource="data?.data?.items" :columns="columns">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'createdAt'">
                {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <a><Editor :value="record" @done="run">{{ $t('btn.edit') }}</Editor></a>
                    <a-divider type="vertical" />
                    <a @click="handleDelete(record, run)">{{ $t('btn.delete') }}</a>
                </span>
            </template>
        </template>
    </a-table>
</template>
        
<style>

</style>
        