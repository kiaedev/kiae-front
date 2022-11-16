
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted, onUnmounted, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useModal } from '@/hooks/modal'
import AppCreation from "@/components/apps/AppCreation.vue";
import AppDetail from '@/components/apps/AppDetail.vue'
import { useApplication } from "@/hooks/op_app";
import { renderComponent } from "@/libs/helper/component";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const route = useRoute()
const apps = ref<any>([])
const { visible, modalOpen, } = useModal()


const columns = [
    {
        title: t('name'),
        dataIndex: 'name',
    },
    {
        title: t('env'),
        dataIndex: 'env',
    },
    {
        title: t('size'),
        dataIndex: 'size',
    },
    {
        title: t('status'),
        dataIndex: 'status',
    },
    {
        title: t('createdAt'),
        dataIndex: 'createdAt',
    },
    {
        title: t('action'),
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
                    <a-button type="primary" style="float: right" @click="modalOpen">
                        {{ $t('btn.createGatewayInstances') }}</a-button>
                </a-col>
            </a-row>
        </div>

        <a-table :dataSource="apps" :columns="columns">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'name'">
                    <!-- <a @click="handleAppClick(record)">
                            {{ record.name }}
                        </a> -->
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
                        <a>{{ $t('btn.edit') }}</a>
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
    