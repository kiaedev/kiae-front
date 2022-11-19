
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import GatewayEditor from "./GatewayEditor.vue";
import { useGatewayOperater } from "@/hooks/op_gateway";
import { useKiaeApi } from "@/hooks/kiae";
import { useRequest } from "vue-request";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const { gatewaySvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => gatewaySvc.gatewayServiceList());
const { handleDelete } = useGatewayOperater()

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
        title: 'Hosts',
        dataIndex: 'hosts',
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
                    <a-button type="primary" style="float: right">
                        <GatewayEditor @done="run">{{ $t('btn.addGateway') }}</GatewayEditor>
                    </a-button>
                </a-col>
            </a-row>
        </div>

        <a-table :dataSource="data?.data.items" :columns="columns">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'hosts'">
                    {{ record.hosts }}
                </template>
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
    </div>
</template>
    
<style>

</style>
    