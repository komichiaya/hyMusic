<!--  -->
<script setup lang="ts">
import CardList from "@/components/CardList/cardList.vue"
import { useRouter, useRoute } from 'vue-router';
const route = useRoute()
const router = useRouter()
onMounted(() => {

})
watch(() => route,
    (newR, oldR) => {

    })
</script>
<template>
    <CardList :type="''" />
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
</style>