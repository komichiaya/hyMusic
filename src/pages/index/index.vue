<script lang="ts" setup>
import songSheet from '@/components/SongSheet/songSheet.vue'
import Recommend from '@/components/Recommend/recommend.vue'
import RecommendedSinger from '@/components/RecommendedSinger/recommendedSinger.vue'
import { userList } from "@/store/User/userList"
import { userStore } from '@/store/User/userInfo'
const uL = userList()
const uS = userStore()
onMounted(async () => {
    const id = uS.userInfo.userId
    await uL.getUserList(id, 19, 0)
    await uL.getUserRecommend()
    await uS.getFollowsFriend(id)
    await uS.getUserFollowArt(6)
    await uS.getSubcount()
    await uL.getUserRecommendSongsList();

})
</script>
<template>
    <songSheet :title="'用户歌单'" :songList="uL.playList_less" v-if="uS.userInfo.userId" />
    <Recommend />
    <RecommendedSinger :userFollows='uS.followArtists' />
    <songSheet :title="'推荐歌单'" :songList="uL.recommendList_less" />
</template>
<style lang="less"></style>