<!--  -->
<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import playList from '../PlayList/playList.vue'
import Recommend from '../Recommend/recommend.vue'
import RecommendedSinger from '../RecommendedSinger/recommendedSinger.vue'
const props = defineProps(['anotherHight'])
const { height } = useWindowSize()

</script>
<template>
    <playList />
    <Recommend />
    <RecommendedSinger />
    <playList />
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.ep-bg-purple {
    width: 100%;
    background-color: #fff;
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>