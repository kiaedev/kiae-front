<script lang="ts" setup>
import { useEgressOperater } from "@/hooks/op_egress";
import { useKiaeApi } from "@/hooks/kiae"
import { useMiddlewareOperater } from "@/hooks/op_middleware";
import { EgressListResponse, MiddlewareListResponse } from "@/libs/kiae";
import { computed, ref, watch } from "vue-demi";
import { useRequest } from "vue-request"
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const props = defineProps({
    app: {
        type: Object,
        required: true,
    },
})

const { middlewareSvc, egressSvc } = useKiaeApi()
const egressOp = useEgressOperater()
const { handleClaimDelete } = useMiddlewareOperater()

const handleDelete = (row: any, run: Function) => {
    type.value == 'middleware' ? handleClaimDelete(row, run) : egressOp.handleDelete(row, run)
}

const type = ref('middleware')
let service: any = () => {
    return type.value == 'middleware' ? middlewareSvc.middlewareServiceClaims(props.app.id) : egressSvc.egressServiceList(props.app.id)
}
const { data, loading, error, run } = useRequest(service)
const columns = computed(() => {
    return type.value == 'middleware' ? mwColumns : appColumns;
})
watch(type, run)

const mwColumns = [
    {
        title: t('type'),
        dataIndex: 'type',
    },
    {
        title: t('name'),
        dataIndex: 'name',
    },
    {
        title: t('status'),
        dataIndex: 'status',
    },
    {
        title: '所属实例',
        dataIndex: 'instance',
    },
    {
        title: t('createdAt'),
        dataIndex: 'createdAt',
    },
    {
        key: 'action',
    },
]
const appColumns = [
    {
        title: t('type'),
        dataIndex: 'type',
    },
    {
        title: t('name'),
        dataIndex: 'name',
    },
    {
        title: '地址',
        dataIndex: 'host',
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
        key: 'action',
    },
]
</script>

<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-radio-group v-model:value="type">
                <a-radio-button value="middleware">Middleware</a-radio-button>
                <a-radio-button value="default">Application</a-radio-button>
            </a-radio-group>
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right" disabled>
                <DependEditor v-model:app="app" @done="run">New Dependent</DependEditor>
            </a-button>
        </a-col>
    </a-row>
    <div>
        <!-- <a-table :columns="columns" :dataSource="data?.data.items" size="small">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <EntryEditor :value="record" v-model:app="app" @done="run">{{ $t('btn.edit') }}</EntryEditor>
                        <a @click="handleDelete(record, run)">{{ $t('btn.delete') }}</a>
                    </span>
                </template>
            </template>
        </a-table> -->
    </div>
</template>