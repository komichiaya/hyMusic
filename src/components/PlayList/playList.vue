<!--  -->
<script setup lang="ts">
import songSheet from '@/components/SongSheet/songSheet.vue'
import { useRoute } from "vue-router";

const props = defineProps(['hotAlbums', 'title'])
const route = useRoute()

</script>
<template>
    <songSheet :title="title" :songList="hotAlbums" />
</template>

<style scoped>
/* @import url(); 引入css类 */
</style>