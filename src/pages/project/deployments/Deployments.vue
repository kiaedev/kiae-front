
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useProject } from '@/hooks/project';
import { useKiaeApi } from '@/hooks/kiae';
import { useRequest } from 'vue-request';
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const columns = [
    {
        title: 'ImageURL',
        dataIndex: 'imageUrl',
        width: 250,
        ellipsis: true,
    },
    {
        title: t('status'),
        dataIndex: 'status',
        width: 100,
    },
    {
        title: 'Commit',
        dataIndex: 'commitId',
        width: 100,
    },
    {
        title: 'Message',
        dataIndex: 'commitMsg',
        ellipsis: true,
    },
    {
        title: t('updatedAt'),
        dataIndex: 'updatedAt',
        width: 200,
    },
]

const { currentPid, projectGet } = useProject()
const { deploySvc } = useKiaeApi()
// const { handleDelete } = useImageOperater()
const { data, loading, error, run } = useRequest(() => deploySvc.deploymentServiceList(currentPid()));
const deployments = computed(() => {
    return data.value?.data.items?.map((el) => { el.commitId = el.commitId?.substring(0, 7); return el })
})

</script>
    
<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="Searching..." style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <Deploy>New Deployment</Deploy>
            </a-button>
        </a-col>
    </a-row>

    <a-table :dataSource="deployments" :columns="columns">
        <template #bodyCell="{ column, record }">
            <!-- <template v-if="column.dataIndex === 'name'">
                <a @click="handleAppClick(record)">
                    {{ record.name }}
                </a>
            </template> -->
            <template v-if="column.dataIndex.endsWith('At')">
                {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
            <!-- <template v-else-if="column.key === 'action'">
                <span>
                    <a @click="() => { handleSelect(record); showModal() }">{{ $t('btn.edit') }}</a>
                    <a-divider type="vertical" />
                    <a class="ant-dropdown-link">
                        更多操作
                        <down-outlined />
                    </a>
                </span>
            </template> -->
        </template>
    </a-table>
</template>

<style>

</style>
    