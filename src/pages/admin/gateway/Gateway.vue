
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted, onUnmounted, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useModal } from '@/hooks/modal'
import GatewayEditor from "./GatewayEditor.vue";
import { useApplication } from "@/hooks/app_op";
import { renderComponent } from "@/libs/helper/component";
import { useKiaeApi } from "@/hooks/kiae";
import { useRequest } from "vue-request";

const { gatewaySvc } = useKiaeApi()
const { data, loading, error, run } = useRequest(() => gatewaySvc.gatewayServiceList());


const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '介绍',
        dataIndex: 'intro',
    },
    {
        title: '域名',
        dataIndex: 'hosts',
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
        <div style="height: 50px">
            <a-row type="flex">
                <a-col flex="100">
                    <a-input-search placeholder="Search..." />
                </a-col>
                <a-col flex="auto">
                    <a-button type="primary" style="float: right">
                        <GatewayEditor @done="run">添加网关</GatewayEditor>
                    </a-button>
                </a-col>
            </a-row>
        </div>

        <a-table :dataSource="data?.data.items" :columns="columns">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'hosts'">
                    {{ record.hosts }}
                </template>
                <template v-if="column.dataIndex === 'createdAt'">
                    {{ $dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a>编辑</a>
                        <a-divider type="vertical" />
                        <a class="ant-dropdown-link">
                            <!-- <AppOp :value="record" @done="listRefresh" @deleted="listRefresh">更多操作</AppOp> -->
                        </a>
                    </span>
                </template>
            </template>
        </a-table>
    </div>
</template>
    
<style>

</style>
    