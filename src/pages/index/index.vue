<script lang="ts" setup>
import songSheet from '@/components/SongSheet/songSheet.vue'
import Recommend from '@/components/Recommend/recommend.vue'
import RecommendedSinger from '@/components/RecommendedSinger/recommendedSinger.vue'
import { userList } from "@/store/User/userList"
import { userStore } from '@/store/User/userInfo'
const uL = userList()
const uS = userStore()
onMounted(() => {
    const id = uS.userInfo.userId
    uL.getUserList(id)
    uL.getUserRecommend()
    uS.getFollowsFriend(id)
    uS.getUserFollowArt(6)
})
</script>
<template>
    <songSheet :title="'用户歌单'" :songList="uL.playList_less" v-if="uS.userInfo.userId" />
    <Recommend />
    <RecommendedSinger :userFollows='uS.followArtists' />
    <songSheet :title="'推荐歌单'" :songList="uL.recommendList_less" />
</template>
<style lang="less"></style>