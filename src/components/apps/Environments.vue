<script lang="ts" setup>
import { useModal } from "@/hooks/modal"
import { ref } from "@vue/reactivity"

const dataSource = ref()
const columns = [
    {
        title: '类型',
        dataIndex: 'created',
    },
    {
        title: 'KEY',
        dataIndex: 'level',
    },
    {
        title: 'VALUE',
        dataIndex: 'name',
    },
    {
        title: '状态',
        dataIndex: 'version',
    },
    {
        title: '创建时间',
        dataIndex: 'reporter',
    },
]
const { visible, modalOpen } = useModal()
</script>

<template>
    <a-row type="flex">
        <a-col flex="auto">
            <a-input-search placeholder="请输入要查询的环境变量" style="width: 500px" />
        </a-col>
        <a-col flex="300px">
            <a-button type="primary" style="float: right" @click="modalOpen">添加环境变量</a-button>

            <a-modal v-model:visible="visible" title="添加环境变量" width="800px" :footer="null">
                <!-- <ConfigEditor v-model:config="currentSelect"></ConfigEditor> -->
            </a-modal>
        </a-col>
    </a-row>
    <div>
        <a-table :columns="columns" :dataSource="dataSource"></a-table>
    </div>
</template>