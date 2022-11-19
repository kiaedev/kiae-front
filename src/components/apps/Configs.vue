<script lang="ts" setup>
import { ref } from "@vue/reactivity"
import { useModal, useSelect } from "@/hooks/modal";
import { AppConfiguration } from "@/libs/kiae";
import { useApplication } from "@/hooks/op_app";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
defineEmits(["refresh"])
const props = defineProps<{
    appid: string
    configs?: Array<AppConfiguration>
}>()

const { handleAppCfgDelete } = useApplication()

const columns = [
    {
        title: t('name'),
        dataIndex: 'filename',
    },
    {
        title: 'MountPath',
        dataIndex: 'mountPath',
    },
    {
        title: 'Content',
        dataIndex: 'content',
    },
    {
        title: t('createdAt'),
        dataIndex: 'createdAt',
    },
    {
        title: t('updatedAt'),
        dataIndex: 'updatedAt',
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
            <a-input-search placeholder="Searching..." style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <ConfigEditor :appid="appid" @done="$emit('refresh')">New Config</ConfigEditor>
            </a-button>
        </a-col>
    </a-row>

    <a-table :columns="columns" :dataSource="configs">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'createdAt' || column.dataIndex === 'updatedAt'">
                {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
            <template v-else-if="column.key === 'action'">
                <span>
                    <ConfigEditor :appid="appid" :config="record" @done="$emit('refresh')">{{ $t('btn.edit') }}
                    </ConfigEditor>
                    <a-divider type="vertical" />
                    <a @click="handleAppCfgDelete(appid, record, () => $emit('refresh'))">{{ $t('btn.delete') }}</a>
                </span>
            </template>
        </template>
    </a-table>
</template>