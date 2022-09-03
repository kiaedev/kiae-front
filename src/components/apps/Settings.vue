<script lang="ts" setup>
import { ref } from "@vue/reactivity"

const dataSource = ref()

</script>

<template>
    <div>
        <div>
            <a-input></a-input>
        </div>
        <div>
            <a-card title="存活探测" style="width: 40%">
                <template #extra><a href="#">more</a></template>
                <p>card content</p>
                <p>card content</p>
                <p>card content</p>
            </a-card>
            <br>
            <a-card title="存活探测" style="width: 40%">
                <template #extra><a href="#">more</a></template>
                <p>card content</p>
                <p>card content</p>
                <p>card content</p>
            </a-card>
        </div>
    </div>
</template>