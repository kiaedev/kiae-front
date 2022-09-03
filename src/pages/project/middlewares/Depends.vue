
<script lang="ts" setup>
    import { ref } from 'vue';
    const dataSource = ref<any>([]);
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },  
        {
            title: '类型',
            dataIndex: 'type',
        },
        {
            title: '参数',
            dataIndex: 'properties',
        },
    ]
    
    </script>
    
    <template>
        <div>
            <a-button type="primary">添加中间件</a-button>
        </div>
        <a-table :dataSource="dataSource" :columns="columns" />
    </template>
    
    <style>
    </style>
    