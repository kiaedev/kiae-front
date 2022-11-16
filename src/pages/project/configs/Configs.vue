
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useProject } from '@/hooks/project';
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const dataSource = ref<any>([]);
const columns = [
    {
        title: t('name'),
        dataIndex: 'filename',
    },
    {
        title: '挂载路径',
        dataIndex: 'mountPath',
    },
    {
        title: t('createdAt'),
        dataIndex: 'createdAt',
    },
]

const { currentPid, projectGet } = useProject()
// onMounted(async () => {
//     const proj = await projectGet(currentPid())
//     console.log(proj);

//     dataSource.value = proj?.configs
// })


</script>

<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的配置" style="width: 300px" />
        </a-col>
        <a-col flex="100px">
            <a-button type="primary" style="float: right">
                <!-- <ConfigEditor>新增配置</ConfigEditor> -->
            </a-button>
        </a-col>
    </a-row>

    <a-table :dataSource="dataSource" :columns="columns" />
</template>

<style>

</style>
