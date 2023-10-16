<script lang="ts" setup>
import songSheet from '@/components/SongSheet/songSheet.vue'
import Recommend from '@/components/Recommend/recommend.vue'
import RecommendedSinger from '@/components/RecommendedSinger/recommendedSinger.vue'
</script>
<template>
    <songSheet :title="'用户歌单'" />
    <Recommend />
    <RecommendedSinger />
    <songSheet :title="'推荐歌单'" />
</template>
<style lang="less"></style>