<script lang="ts" setup>
import { ref } from "@vue/reactivity"
import { useModal, useSelect } from "@/hooks/modal";

const { visible, modalOpen } = useModal()
const { currentSelect, handleSelect } = useSelect()
const props = defineProps({
    configs: Array,
    visible: Boolean
})

const columns = [
    {
        title: '类型',
        dataIndex: 'level',
    },
    {
        title: '名称',
        dataIndex: 'filename',
    },
    {
        title: '挂载目录',
        dataIndex: 'mountPath',
    },
    {
        title: '状态',
        dataIndex: 'reporter',
    },
    {
        title: '时间',
        dataIndex: 'created',
    },
    {
        title: '操作',
        key: 'action',
    },
]
</script>

<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的配置" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right">
                <ConfigEditor>添加配置文件</ConfigEditor>
            </a-button>
        </a-col>
    </a-row>

    <div>
        <a-table :columns="columns" :dataSource="configs">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <ConfigEditor :filename="record.filename" :config="record.content">编辑</ConfigEditor>
                        <a-divider type="vertical" />
                        <a class="ant-dropdown-link">
                            更多操作
                            <down-outlined />
                        </a>
                    </span>
                </template>
            </template>
        </a-table>

        <a-modal v-model:visible="visible" title="编辑配置文件" width="800px" :footer="null">
            <ConfigEditor v-model:config="currentSelect"></ConfigEditor>
        </a-modal>
    </div>
</template>