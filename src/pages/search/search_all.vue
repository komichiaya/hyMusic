<!--  -->
<script setup lang="ts">
import SearchColumn from "../../components/SearchColumn/searchColumn.vue"
import SongList from "../../components/SongList/songList.vue"
import InfoCard from "../../components/InfoCard/infoCard.vue"

const title = ['艺人', '播放清单', '专辑', '电台', '用户']
</script>
<template>
    <div class="m">
        <div class="t">

            <!-- <div class="popular">
                <div class="title">热门搜索结果</div>

                <InfoCard />
            </div> -->
            <div class="songs">
                <div class="title">歌曲</div>
                <SongList :song-count="4" />
            </div>
        </div>
        <div style="margin-top: 40px;">
            <div v-for="item in title">
                <SearchColumn>
                    {{ item }}
                </SearchColumn>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.m {
    margin-top: 40px;

    .title {
        font-size: 32px;
        font-weight: 800;
        margin: 8px
    }

    .t {
        display: grid;
        grid-template-columns: 30% 70%;
        column-gap: 50px;
    }

}
</style>