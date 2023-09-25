// 0:歌单/专辑 1:歌手 
<script lang='ts' setup>
import listHeader from "@/components/ListHeader/listHeader.vue"
import songList from "@/components/SongList/songList.vue";
import Singer from "@/components/Singer/Singer.vue";

import { useRoute } from 'vue-router';
const route = useRoute()
const type = ref("")
onMounted(() => {
    type.value = route.query.type as any
})
watch(
    () => route.query.type,
    (now) => {
        type.value = now as any
    }
)
</script>
<template>
    <div>
        <div class="h">
            <listHeader :type="Number(type)" />
        </div>
        <div class="m">
            <div>
                <Singer v-if="Number(type)" />
                <songList :songCount="20" v-else />
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

