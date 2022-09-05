
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {  useProject } from '../../../hooks/project';
const dataSource = ref<any>([]);
const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '完整地址',
        dataIndex: 'image',
    },
    {
        title: '最近版本',
        dataIndex: 'latest',
    },
    {
        title: '最近更新',
        dataIndex: 'updatedAt',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
    },
]

const {currentPid,projectGet} = useProject()

onMounted(async () => {
    const proj = await projectGet(currentPid())
    console.log(proj);

    dataSource.value = proj?.images
})

</script>
    
<template>
    <div>
    </div>
    <a-table :dataSource="dataSource" :columns="columns">
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
    