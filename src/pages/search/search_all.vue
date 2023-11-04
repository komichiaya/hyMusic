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
onMounted(async () => {
    keywords.value = route.query.s
    await Search.getSearchMore(keywords.value, 30, 1018)
})
watch(() => route.query,
    (a, b) => {
        console.log(a.query);
    })
</script>
<template>
    <div class="m" v-if="Search.searchResList.length">
        <div class="t">

            <!-- <div class="popular">
                <div class="title">热门搜索结果</div>

                <InfoCard />
            </div> -->
            <div class="songs">
                <div class="title">歌曲</div>
                <SongList :songList="Search.searchResList[0].songs" />
            </div>
        </div>
        <div style="margin-top: 40px;" v-if="title.length">
            <div v-for="(item, index) in title">
                <SearchColumn
                    :songList="Search.searchResList[(index + 1 > Search.searchResList.length) ? index : index + 1][item.type]"
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