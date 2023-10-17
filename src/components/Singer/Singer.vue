<!--  -->
<script setup lang='ts'>
import {
    CaretRight,
    CirclePlus
} from '@element-plus/icons-vue'
import songList from "@/components/SongList/songList.vue";
import playList from '../PlayList/playList.vue';
const songCount = ref(5)
const showMoreOrLess = ref('显示更多内容')
const more_less = () => {
    switch (songCount.value) {
        case 5:
            songCount.value = 10
            showMoreOrLess.value = '显示较少内容'
            break;
        case 10:
            songCount.value = 5
            showMoreOrLess.value = '显示更多内容'
            break;
    }
}
</script>
<template>
    <div class="albumList">
        <div class="list">
            <div class="title">
                <div class="t">
                    <p class="h2">热门</p>
                </div>
            </div>
            <div class="list">
                <songList :songCount="songCount" />
            </div>
            <div class="more">
                <p @click="more_less" style="cursor: pointer;display: inline;">{{ showMoreOrLess }}</p>
            </div>
            <playList title="音乐作品" />
        </div>
    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.albumList {
    .pic {
        width: 150px;
        height: 150px;

        img {
            width: 100%;
            height: 100%;
            border: 1px solid #000;
            border-radius: 5%;
        }
    }

    .list {
        .title {
            .t {
                margin: 8px;

                .h2 {
                    font-size: 28px;
                    font-weight: 700;

                }
            }
        }
    }
}
</style>