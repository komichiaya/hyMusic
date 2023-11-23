<script setup lang='ts'>
import CardList from "@/components/CardList/cardList.vue"
import { userList } from "@/store/User/userList"
import { userStore } from "@/store/User/userInfo"
import { useRoute } from "vue-router"
const route = useRoute()
const userListStore = userList()
const currentChange = (e) => { }
const songList = ref([])
const storeUser = userStore()
onMounted(() => {
    const type = route.params.t
    if (type == "songSheet") {
        console.log(type)
        songList.value = userListStore.recommendList
    } else if (type == "RecommendedSinger") {
        console.log(type)
        songList.value = storeUser.followArtists
    }
})
</script>
<template>
    <CardList :songList="songList" :currentChange="currentChange" v-if="songList.length" />
</template>

<style scoped lang='less'>
/* @import url(); 引入css类 */
</style>