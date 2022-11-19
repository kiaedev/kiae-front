<script lang="ts" setup>
import { ref } from "@vue/reactivity"
import { useRequest } from "vue-request"
import { useKiaeApi } from "@/hooks/kiae"
import { useEntryOperater } from "@/hooks/op_entry"
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const props = defineProps({
    app: {
        type: Object,
        required: true,
    },
})
const search = ref({ route: '' })
const { entrySvc } = useKiaeApi()
const { handleEnable, handleDisable, handleDelete } = useEntryOperater()
const { data, loading, error, run } = useRequest(() => entrySvc.entryServiceList(props.app.id));
const columns = [
    {
        title: 'Gateway',
        dataIndex: 'gateway',
    },
    {
        title: 'Host',
        dataIndex: 'host',
    },
    {
        title: 'RouteScope',
        dataIndex: 'scope',
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
            <a-button type="primary" style="float: right">
                <EntryEditor v-model:app="app" @done="run">New Endpoint</EntryEditor>
            </a-button>
        </a-col>
    </a-row>

    <div>
        <a-table :columns="columns" :dataSource="data?.data.items" size="small">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'host'">
                    <a :href="`//${record.host}`" target="_blank">{{ record.host }}</a>
                </template>
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <!-- <EntryEditor :value="record" v-model:app="app" @done="run">{{ $t('btn.edit') }}</EntryEditor> -->
                        <a size="small" type="primary" v-if="record.status == 'OP_STATUS_DISABLED'"
                            @click="handleEnable(record, run)">$t('btn.enable')</a>
                        <a size="small" v-else @click="handleDisable(record, run)">$t('btn.disable')</a>
                        <a-divider type="vertical" />
                        <a @click="handleDelete(record, run)">{{ $t('btn.delete') }}</a>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>