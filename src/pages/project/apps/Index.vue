
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted, onUnmounted, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useModal } from '@/hooks/modal'
import AppCreation from "@/components/apps/AppCreation.vue";
import AppDetail from '@/components/apps/AppDetail.vue'
import { useApplication } from "@/hooks/app_op";
import { renderComponent } from "@/libs/helper/component";

const route = useRoute()
const apps = ref<any>([])
const { visible, modalOpen, } = useModal()
const { listApps } = useApplication()
const listRefresh = () => {
    listApps({ pid: route.params.pid }).then((res) => {
        apps.value = res.items
        visible.value = false
        console.log(1111);
    });
}
const handleAppClick = async (app: any) => {
    renderComponent(AppDetail, { value: app }, listRefresh)
}

onMounted(listRefresh)

const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '环境',
        dataIndex: 'env',
    },
    {
        title: '配置',
        dataIndex: 'size',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
    },
    {
        title: '操作',
        key: 'action',
    },
]
</script>
<template>
    <div>
        <div>
            <a-row type="flex">
                <a-col flex="100">
                    <a-input-search placeholder="Search..." />
                </a-col>
                <a-col flex="auto">
                    <a-button type="primary" style="float: right" @click="modalOpen">创建应用</a-button>
                </a-col>
            </a-row>

            <a-modal v-model:visible="visible" title="创建应用" :footer="null">
                <AppCreation @done="listRefresh"></AppCreation>
            </a-modal>
        </div>
        <a-table :dataSource="apps" :columns="columns">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'name'">
                    <a @click="handleAppClick(record)">
                        {{ record.name }}
                    </a>
                </template>
                <!-- <template v-else-if="column.key === 'status'">
                    <span>
                        <a-tag :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                            {{ tag.toUpperCase() }}
                        </a-tag>
                    </span>
                </template> -->
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a>编辑</a>
                        <a-divider type="vertical" />
                        <a class="ant-dropdown-link">
                            <AppOp :value="record" @done="listRefresh" @deleted="listRefresh">更多操作</AppOp>
                        </a>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>

<style>

</style>
