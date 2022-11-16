
<script lang="ts" setup>
import { computed, ref } from "@vue/reactivity";
import { useModal } from '@/hooks/modal'
import AppDetail from '@/components/apps/AppDetail.vue'
import { renderComponent } from "@/libs/helper/component";
import { useRequest } from "vue-request";
import { useKiaeApi, appStatusMapper } from "@/hooks/kiae";
import { useProject } from "@/hooks/project";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const { currentPid } = useProject()
const { appSvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => appSvc.appServiceList(currentPid()));
const dataSource = computed(() => data.value?.data.items?.map(appStatusMapper))

const handleAppClick = async (app: any) => {
    renderComponent(AppDetail, { value: app }, run)
}

const columns = [
    {
        title: t('name'),
        dataIndex: 'name',
    },
    {
        title: '环境',
        dataIndex: 'env',
    },
    {
        title: '配置',
        dataIndex: 'size',
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
        <div>
            <a-row type="flex">
                <a-col flex="100">
                    <a-input-search placeholder="Search..." />
                </a-col>
                <a-col flex="auto">
                    <a-button type="primary" style="float: right">
                        <AppCreation @done="run">创建应用</AppCreation>
                    </a-button>
                </a-col>
            </a-row>
        </div>
        <a-table :dataSource="dataSource" :columns="columns">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'name'">
                    <a @click="handleAppClick(record)">
                        {{ record.name }}
                    </a>
                </template>
                <template v-else-if="column.dataIndex === 'status'">
                    <a-tag :color="record.extra.statusColor">{{ record.extra.statusText }}</a-tag>
                </template>
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a>{{ $t('btn.edit') }}</a>
                        <a-divider type="vertical" />
                        <a class="ant-dropdown-link">
                            <AppOp :value="record" @done="run" @deleted="run">更多操作</AppOp>
                        </a>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>

<style>

</style>
