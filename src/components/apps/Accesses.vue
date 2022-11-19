<script lang="ts" setup>
import { useRouteOperater } from "@/hooks/op_route";
import { useKiaeApi } from "@/hooks/kiae";
import { useModal, useSelect } from "@/hooks/modal"
import { ref } from "@vue/reactivity"
import { useRequest } from "vue-request";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const props = defineProps({
    app: {
        type: Object,
        required: true,
    },
})
const search = ref({ route: '' })
const { routeSvc } = useKiaeApi()
const { handleEnable, handleDisable, handleDelete } = useRouteOperater()
const { data, loading, error, run } = useRequest(() => routeSvc.routeServiceList(props.app.id));
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Route Count',
        dataIndex: 'path',
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
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search v-model:value="search.route" placeholder="Searching..." style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right" disabled>
                <AccessEditor v-model:app="app" @done="run">New AccessRule</AccessEditor>
            </a-button>
        </a-col>
    </a-row>

    <div>
        <a-table :columns="columns" :dataSource="data?.data.items" size="small">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'path'">
                    <RouteEditor :value="record" v-model:app="app" @done="run">{{ record.path }}</RouteEditor>
                </template>
                <template v-if="column.dataIndex === 'methods'">
                    <span>{{ record.methods }}</span>
                </template>
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a-button size="small" type="primary" v-if="record.status == 'OP_STATUS_DISABLED'"
                            @click="handleEnable(record, run)">$t('btn.enable')</a-button>
                        <a-button size="small" v-else @click="handleDisable(record, run)">$t('btn.disable')</a-button>
                        <a-divider type="vertical" />
                        <a-button size="small" @click="handleDelete(record, run)" danger>{{ $t('btn.delete') }}
                        </a-button>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>