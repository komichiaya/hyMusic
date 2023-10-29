<script lang='ts' setup>
// 0:歌单/专辑 1:歌手
import listHeader from "@/components/ListHeader/listHeader.vue"
import songList from "@/components/SongList/songList.vue";
import Singer from "@/components/Singer/Singer.vue";

import { useRoute } from 'vue-router';
import { songListInfo } from "@/store/SongList/songListInfo"
import { userList } from '@/store/User/userList';
import { userStore } from "@/store/User/userInfo"
import { articInfoState } from "@/store/Artist/artistInfo"

const sLI = songListInfo()
const uL = userList()
const aIF = articInfoState()
const route = useRoute()
const type = ref("")
const ID = ref(0)
const index = ref(0)
const offset = ref(0)
const sLT = songListInfo()
const uS = userStore()
const list = ref([])
const header = ref({})
onMounted(async () => {
    type.value = route.query.type as any
    ID.value = route.query.id as any
    index.value = route.query.index as any
    const id = uS.userInfo.userId
    switch (Number(type.value)) {
        case 0:
            await sLT.getSongListInfo(ID.value)
            await sLI.getSongListDetail(ID.value, 20, offset.value)
            await sLI.getLikeSongIDList(id);
            (list as any).value = [...sLI.songList];
            header.value = sLT.songListDetail
            break;
        case 1:
            await aIF.getArtistInfo(ID.value)
            await aIF.getArtistHotSong(ID.value);
            (list as any).value = [...aIF.topSong];
            header.value = aIF.artistDetail.artist;
            break;
        case 3:
            await aIF.getAlbumInfo(ID.value);
            (list as any).value = [...aIF.albumInfo.songs]
            header.value = aIF.albumInfo.album
            break;
    }
    window.onbeforeunload = () => {
    }
})
onUnmounted(() => {
    sLT.songListDetail = {}

})
watch(
    () => route.query,
    (now) => {
        type.value = now.type as any
        ID.value = now.id as any

    }
)
</script>
<template>
    <div>
        <div class="h">
            <listHeader :type="Number(type)" :listHeaders="header" :listId="route.query.id" />
        </div>
        <div class="m">
            <div v-if="list">
                <Singer v-if="Number(type) == 1 && aIF.topSong.length" :songList="list" />
                <songList :songList="list" v-else />
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.h {
    width: 100%;
    margin-bottom: 72px;
}

.m {
    width: 100%;
}
</style>

