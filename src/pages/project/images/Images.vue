
<script lang="ts" setup>
import { useProject } from '@/hooks/project';
import { useKiaeApi } from '@/hooks/kiae';
import { useRequest } from 'vue-request';
import { useImageOperater } from '@/hooks/op_image';
import { computed } from 'vue';
import { ImageImageStatus } from '@/libs/kiae';
import { invert } from 'lodash';
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const columns = [
    {
        title: t('name'),
        dataIndex: 'image',
    },
    {
        title: 'Tag',
        dataIndex: 'tag',
    },
    {
        title: t('status'),
        dataIndex: 'status',
    },
    {
        title: t('updatedAt'),
        dataIndex: 'updatedAt',
    },
    {
        title: t('action'),
        key: 'action'
    }
]

const { currentPid } = useProject()
const { imageSvc } = useKiaeApi()
const { handleDelete } = useImageOperater()
const { data, loading, error, run } = useRequest(() => imageSvc.imageServiceList(currentPid()));
const dataSource = computed(() => data.value?.data.items?.map((el: any) => {
    const colors: any = {
        [ImageImageStatus.Pending]: 'warning',
        [ImageImageStatus.Building]: 'processing',
        [ImageImageStatus.Failed]: 'red',
        [ImageImageStatus.Published]: 'green',
        [ImageImageStatus.Expired]: 'default',
    }
    el.extra = { statusColor: colors[el.status], statusText: invert(ImageImageStatus)[el.status] }
    return el
}))
</script>
    
<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="Searching..." style="width: 300px" />
        </a-col>
        <a-col flex="300px">
            <a-dropdown-button type="primary" style="float: right">
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="1">
                            <ImageEditor :pid="currentPid()" @done="run">Add Image</ImageEditor>
                        </a-menu-item>
                    </a-menu>
                </template>
                <ImageBuild :pid="currentPid()" @done="run">New Image</ImageBuild>
            </a-dropdown-button>
        </a-col>
    </a-row>

    <a-table :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex?.endsWith('At')">
                {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
            <template v-else-if="column.dataIndex === 'status'">
                <a-tag :color="record.extra.statusColor">{{ record.extra.statusText }}</a-tag>
            </template>
            <template v-else-if="column.key === 'action'">
                <span v-if="record.builderId">
                    <ImageBuildLogs :image="record" @close="run">BuildLogs</ImageBuildLogs>
                    <a-divider type="vertical"></a-divider>
                    <a @click="handleDelete(record, run)">{{ $t('btn.delete') }}</a>
                </span>
                <span v-else>
                    <a @click="handleDelete(record, run)">{{ $t('btn.delete') }}</a>
                </span>
            </template>
        </template>
    </a-table>
</template>

<style>

</style>
    