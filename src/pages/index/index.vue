<script lang="ts" setup>
import playList from '@/components/PlayList/playList.vue'
import Recommend from '@/components/Recommend/recommend.vue'
import RecommendedSinger from '@/components/RecommendedSinger/recommendedSinger.vue'
</script>
<template>
    <playList :title="'用户歌单'" />
    <Recommend />
    <RecommendedSinger />
    <playList :title="'用户歌单'" />
</template>
<style lang="less"></style>