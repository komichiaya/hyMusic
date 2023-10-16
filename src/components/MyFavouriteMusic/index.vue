
<script setup lang="ts">
import songList from "../SongList/songList.vue"
import infoCard from "../InfoCard/infoCard.vue"

</script>
<template>
    <div class="m">
        <el-row :gutter="24">
            <el-col :span="10">
                <div class="playCard">
                    <infoCard :showLrc="true" />
                </div>
            </el-col>
            <el-col :span="8">
                <songList :songCount="5" :showLikeBtn="false" />

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