<script lang="ts" setup>
import { ref } from "@vue/reactivity"
import ConfigEditor from "./ConfigEditor.vue"
import { useModal, useSelect } from "@/hooks/modal";

const { showModal, visible, handleOk } = useModal()
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
    <div>
        <a-table :columns="columns" :dataSource="configs">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'name'">
                    <a @click="handleAppClick(record)">
                        {{ record.name }}
                    </a>
                </template>
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a @click="() => { handleSelect(record); showModal() }">编辑</a>
                        <a-divider type="vertical" />
                        <a class="ant-dropdown-link">
                            更多操作
                            <down-outlined />
                        </a>
                    </span>
                </template>
            </template>
        </a-table>

        <a-modal v-model:visible="visible" title="编辑配置文件" width="800px" @ok="handleOk" :footer="null">
            <ConfigEditor v-model:config="currentSelect"></ConfigEditor>
        </a-modal>
    </div>
</template>