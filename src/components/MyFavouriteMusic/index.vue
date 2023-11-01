
<script setup lang="ts">
import songList from "../SongList/songList.vue"
import infoCard from "../InfoCard/infoCard.vue"
const props = defineProps(["userFavoriteMusic", 'lrc'])
const firstSongInfo = ref(computed(() => props.userFavoriteMusic[0]))
const songsList = ref(computed(() => props.userFavoriteMusic.splice(1, 5)))
onMounted(() => {

})
</script>
<template>
    <div class="m">
        <el-row :gutter="24">
            <el-col :span="10">
                <div class="playCard">
                    <infoCard :showLrc="true" :song-info="firstSongInfo" :lrc="lrc" />
                </div>
            </el-col>
            <el-col :span="8" v-if="userFavoriteMusic.length">
                <songList :songList="songsList" />
            </el-col>


        </el-row>

    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.m {
    .playCard {
        display: flex;
    }
}
</style>