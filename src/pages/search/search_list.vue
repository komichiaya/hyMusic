<!--  -->
<script setup lang="ts">
import CardList from "@/components/CardList/cardList.vue"
import SongList from "@/components/SongList/songList.vue"

import { useRouter, useRoute } from 'vue-router';
import { SearchStroe } from "@/store/search/searchStore"

const route = useRoute()
const router = useRouter()
const searchStore = SearchStroe()
const t = ref()
onMounted(() => {
    console.log(1)
    const { s, type, limit } = route.query
    search(String(s), Number(limit), Number(type))
    t.value = type
})
const search = async (keywords: string, limit: number, type: number) => {
    await searchStore.getSearchList(keywords, 30, type)
}
watch(() => route,
    (newR, oldR) => {
        if (newR.name == "Search_list") {
            console.log(2)

            const { s, type, limit } = newR.query
            search(String(s), Number(limit), Number(type))
            t.value = type
        }
        // const {} = newR
    },
    { deep: true })
</script>
<template>
    <div v-if="searchStore.searchResList.length">

        <SongList :songList="searchStore.searchResList" v-if="Object.hasOwn(searchStore.searchResList[0], 'al')" />
        <CardList :songList="searchStore.searchResList" v-else />

    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
</style>