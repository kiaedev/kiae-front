
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useProject } from '@/hooks/project';
import { useKiaeApi } from '@/hooks/kiae';
import { useRequest } from 'vue-request';

const columns = [
    {
        title: '镜像地址',
        dataIndex: 'imageUrl',
        width: 250,
        ellipsis: true,
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 100,
    },
    {
        title: '提交',
        dataIndex: 'commitId',
    },
    {
        title: '提交信息',
        dataIndex: 'commitMsg',
        width: 350,
        ellipsis: true,
    },
    {
        title: '最近更新',
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
            <a-input-search placeholder="请输入要查询的镜像" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <Deploy>部署</Deploy>
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
                    <a @click="() => { handleSelect(record); showModal() }">编辑</a>
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
    