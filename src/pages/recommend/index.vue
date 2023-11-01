<script setup lang='ts'>
import CardList from "@/components/CardList/cardList.vue"
import { userList } from "@/store/User/userlist"
const userListStore = userList()
const currentChange = (e) => { }
const songList = ref(computed(() => userListStore.recommendList))
</script>
<template>
    <CardList :songList="songList" :currentChange="currentChange" />
</template>

<style scoped lang='less'>
/* @import url(); 引入css类 */
</style>