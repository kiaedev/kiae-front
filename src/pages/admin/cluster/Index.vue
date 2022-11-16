
<script lang="ts" setup>
import Editor from "./Editor.vue";
import { ref } from "@vue/reactivity";
import { useKiaeApi } from "@/hooks/kiae";
import { useRequest } from "vue-request";
import { useClusterOperater } from "@/hooks/op_cluster";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const { clusterSvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => clusterSvc.clusterServiceList());
const { handleDelete } = useClusterOperater()

const columns = [
    {
        title: t('name'),
        dataIndex: 'name',
    },
    {
        title: t('intro'),
        dataIndex: 'intro',
    },
    {
        title: t('tags'),
        dataIndex: 'tags',
    },
    {
        title: t('status'),
        dataIndex: 'status',
    },
    {
        title: t('createdAt'),
        dataIndex: 'createdAt',
    },
    {
        title: t('action'),
        key: 'action',
    },
]
</script>
<template>
    <div>
        <div style="height: 50px">
            <a-row type="flex">
                <a-col flex="100">
                    <a-input-search placeholder="Search..." />
                </a-col>
                <a-col flex="auto">
                    <a-button type="primary" style="float: right" disabled>
                        <Editor @done="run">{{ $t('btn.addCluster') }}</Editor>
                    </a-button>
                </a-col>
            </a-row>
        </div>

        <a-table :dataSource="data?.data.items" :columns="columns">
            <template #bodyCell="{ column, record }">
                <!-- <template v-else-if="column.key === 'status'">
                        <span>
                            <a-tag :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                                {{ tag.toUpperCase() }}
                            </a-tag>
                        </span>
                    </template> -->
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span v-if="record.name != 'local'">
                        <a>{{ $t('btn.edit') }}</a>
                        <a-divider type="vertical" />
                        <a @click="handleDelete(record, run)">{{ $t('btn.delete') }}</a>
                    </span>
                    <span v-else>-</span>
                </template>
            </template>
        </a-table>
    </div>
</template>
    
<style>

</style>
    