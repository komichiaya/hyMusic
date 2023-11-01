<!--  -->
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import MyFavouriteMusic from "@/components/MyFavouriteMusic/index.vue"
import CardList from "@/components/CardList/cardList.vue"
import { userList } from "@/store/User/userList"
import { userStore } from "@/store/User/userInfo"

import { songListInfo } from "@/store/SongList/songListInfo"
import { playStore } from "@/store/Play"


const route = useRoute()
const router = useRouter()
const typeList = ref(['所有歌单', '我创建的歌单', '我收藏的歌单',])
const id: any = ref(null)
const t = ref('')
const userListStore = userList()
const user = userStore()
const songListInfoStore = songListInfo()
const limit = ref(computed(() => user.userSubcount.createdPlaylistCount + user.userSubcount.subPlaylistCount))
const play = playStore()
const lycArr = ref([])
onMounted(async () => {
    const id = (userListStore.playList[0] as any).id;
    await songListInfoStore.getSongListAllSongs(id, 6, 0)
    await play.getSongLyric(songListInfoStore.songList[0].id)
    setLycArr()
})
const setLycArr = () => {
    const lycString = play.lyricInfo.lrc.lyric
    const arr = lycString.split('\n')
    const reg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
    for (const item of arr) {
        const content = item.replace(reg, '').trim();
        (lycArr.value as any).push(content)
    }
}
const changeType = (type: string, key: number) => {
    id.value = key
    t.value = typeList.value[key] == '所有歌单' ? 'all' : 'other'


}
const currentChange = (e: number) => {
    console.log(e);
    userListStore.getUserList(user.userInfo.userId, 19, e * 19)

}
</script>
<template>
    <div>
        <div class="h">
            <MyFavouriteMusic :userFavoriteMusic="songListInfoStore.songList" :lrc="lycArr" />
        </div>
        <div class="m">
            <div style="margin-top: 40px;">
                <div class="title">
                    <p>
                        我的歌单：
                    </p>
                </div>
                <div class="b">
                    <div class="h">
                        <el-check-tag v-for="(item, key) in  typeList" :key="key" @change="changeType(item, key)"
                            :checked="key == id ? true : false" style="margin-right:8px">
                            {{ item }}
                        </el-check-tag>
                    </div>
                    <div class="main">
                        <CardList :songList="userListStore.playList" :limit="limit" :currentChange="currentChange" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.m {
    .title {
        p {
            font-size: 24px;
            font-weight: 700;

        }
    }
}
</style>