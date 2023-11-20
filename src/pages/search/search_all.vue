<!--  -->
<script setup lang="ts">
import SearchColumn from "../../components/SearchColumn/searchColumn.vue"
import SongList from "../../components/SongList/songList.vue"
import InfoCard from "../../components/InfoCard/infoCard.vue"
import { userList } from "@/store/User/userList"
import { SearchStroe } from "@/store/search/searchStore"

import { useRoute, useRouter } from "vue-router"
const title: any = [{
    name: '艺人',
    type: "artists"
}, {
    name: '播放清单',
    type: "playLists"
}, {
    name: '专辑',
    type: "albums"
}, {
    name: '用户',
    type: "users"
}]//'电台'
const u = userList()
const route = useRoute()
const keywords = ref()
const Search = SearchStroe()

onMounted(() => {
    console.log('onMounted')
    keywords.value = route.query.s
    search(keywords.value)
})
const search = async (keywords: string) => {
    await Search.getSearchMore(keywords, 30, 1018)
}
// watch(() => route,
//     (a, b) => {
//         if (a.name == 'Search_all') {
//             search(String(a.query.s))
//         }
//         console.log(a.query, a.path);
//     },
//     { deep: true, })
</script>
<template>
    <div class="m" v-if="Search.searchList.length">
        <div class="t">

            <!-- <div class="popular">
                <div class="title">热门搜索结果</div>

                <InfoCard />
            </div> -->
            <div class="songs">
                <div class="title">歌曲</div>
                <SongList :songList="Search.searchList[0].songs" />
            </div>
        </div>
        <div style="margin-top: 40px;" v-if="title.length">
            <div v-for="(item, index) in title">
                <SearchColumn
                    :songList="Search.searchList[(index + 1 > Search.searchList.length) ? index : index + 1][item.type]"
                    :type="item.type">
                    {{ item.name }}
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