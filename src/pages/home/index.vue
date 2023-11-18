<!--  -->
<script setup lang="ts">

import { useWindowSize } from '@vueuse/core'
import { ElScrollbar } from 'element-plus'
import { useRoute } from 'vue-router';
const props = defineProps(['anotherHight'])
const { height } = useWindowSize()
console.log(height.value, props.anotherHight);
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const route = useRoute()
watch(() => route.fullPath,
    () => {
        scrollbarRef.value!.setScrollTop(0)
    })

</script>
<template>
    <el-scrollbar ref='scrollbarRef' :height="height - anotherHight" id='scrollbar'>
        <div style="padding:64px 5vw 96px; overflow-y: hidden; width: 100%;">
            <div>
                <router-view v-slot="{ Component, route }">
                    <keep-alive max="1">
                        <component :is="Component" :key="route.query.songId" v-if="route.meta.keepAlive"></component>
                    </keep-alive>
                    <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive"></component>
                </router-view>



            </div>
        </div>
    </el-scrollbar>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
</style>