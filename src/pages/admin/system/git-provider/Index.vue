
<script lang="ts" setup>
import { useProviderOperater } from "@/hooks/op_provider";
import { useKiaeApi } from "@/hooks/kiae";
import { useRequest } from "vue-request";
import Editor from "./Editor.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const { providerSvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => providerSvc.providerServiceList());
const { handleDelete } = useProviderOperater()

const columns = [

    {
        title: t('name'),
        width: 100,
        dataIndex: 'name',
    },
    {
        title: t('authorizeUrl'),
        width: 300,
        ellipsis: true,
        dataIndex: 'authorizeUrl',
    },
    {
        title: t('clientId'),
        ellipsis: true,
        dataIndex: 'clientId',
    },
    {
        title: t('createdAt'),
        width: 190,
        dataIndex: 'createdAt',
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
            <a-input-search placeholder="Searching..." style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <Editor @done="run">{{ $t('btn.addGitProvider') }}</Editor>
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
                    <a>{{ $t('btn.edit') }}</a>
                    <a-divider type="vertical" />
                    <a @click="handleDelete(record, run)">{{ $t('btn.delete') }}</a>
                </span>
            </template>
        </template>
    </a-table>
</template>
        
<style>

</style>
        