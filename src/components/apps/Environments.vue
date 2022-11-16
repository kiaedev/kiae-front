<script lang="ts" setup>
import { useApplication } from "@/hooks/op_app"
import { useModal } from "@/hooks/modal"
import { ref } from "@vue/reactivity"

defineEmits(["refresh"])
const props = defineProps<{
    appid: string
    envs: Array<any>,
}>()

const { handleAppEnvDelete } = useApplication()

const columns = [
    {
        title: t('type'),
        dataIndex: 'type',
    },
    {
        title: 'KEY',
        dataIndex: 'name',
    },
    {
        title: 'VALUE',
        dataIndex: 'value',
    },
    {
        title: t('createdAt'),
        dataIndex: 'createdAt',
    },
    {
        title: t('action'),
        key: 'action'
    }
]
</script>

<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的环境变量" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <EnvEditor :appid="props.appid" @done="$emit('refresh')">添加环境变量</EnvEditor>
            </a-button>
        </a-col>
    </a-row>
    <div>
        <a-table :columns="columns" :dataSource="props.envs">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span v-if="record.type == 'USER'">
                        <EnvEditor :appid="props.appid" :env="record" @done="$emit('refresh')">{{ $t('btn.edit') }}</EnvEditor>
                        <a-divider type="vertical" />
                        <a @click="handleAppEnvDelete(appid, record, ()=>$emit('refresh'))">{{ $t('btn.delete') }}</a>
                    </span>
                    <span v-else>-</span>
                </template>
            </template>
        </a-table>
    </div>
</template>