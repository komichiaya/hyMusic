<script setup lang='ts'>
import {
    CaretRight,
    CirclePlus
} from '@element-plus/icons-vue'
import songList from "@/components/SongList/songList.vue";
import playList from '../PlayList/playList.vue';
import { articInfoState } from "@/store/Artist/artistInfo"
import { useRoute } from "vue-router"
const route = useRoute()
const aIF = articInfoState()
const props = defineProps(['songList'])
const songCount = ref(5)
const SL = computed(() => props.songList.slice(0, songCount.value))
const showMoreOrLess = ref('显示更多内容')
onMounted(() => {
    aIF.getArtistAlbum(Number(route.query.id), 5)
})
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
watch(SL, (newV, oldV) => {
    console.log(newV, oldV);
})
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
                <songList :songList="SL" />
            </div>
            <div class="more">
                <p @click="more_less" style="cursor: pointer;display: inline;">{{ showMoreOrLess }}</p>
            </div>
            <playList title="音乐作品" :hotAlbums="aIF.hotAlbums" />
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