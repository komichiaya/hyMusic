<!--  -->
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

import { useWindowSize } from "@vueuse/core"
const { width } = useWindowSize()
const w = ref(width.value + 'px')
const router = useRouter()
const route = useRoute()
const checked = ref(false)
const typeList = ref([{
    c: '所有', e: "all", t: 1018
}, {
    c: '歌曲', e: "song", t: 1
}, { c: '艺人', e: 'singer', t: 100 }, {
    c: '播放清单', e: 'list', t: 1000
}, {
    c: '专辑', e: "album", t: 10
}, {
    c: '电台', e: "fm", t: 1009
}])
const id: any = ref(null)
const t = ref('')
const onClick = (type: string, key: number) => {
    id.value = key
    t.value = type == 'all' ? 'all' : 'other'
    switch (t.value) {
        case 'all':
            router.push({
                path: `/search/${t.value}/search_all`,
                query: {
                    s: route.query.s,
                    type: key
                }
            })
            break;
        case 'other':
            const t1 = typeList.value.filter((item) => item.e == type)
            router.push({
                path: `/search/${type}/search_list`,
                query: {
                    s: route.query.s,
                    type: t1[0].t,
                    limit: 1
                }
            })
            break;
        default:
            router.push({
                path: `/search/${t.value}/search_all`,
                query: {
                    s: route.query.s,
                    type: key
                }
            })
    }
}
onMounted(() => {
    t.value = String(route.params.type)
    id.value = route.query.type + ''
})
watch([route, width],
    ([newRoute, newWidth], [oldRoute, oldWidth]) => {
        t.value = String(newRoute.params.type)
        w.value = newWidth + 'px'
    })
</script>
<template>
    <div class="box">
        <el-affix target=".box" :offset="60">
            <div class="h">
                <el-check-tag v-for="(item, key) in  typeList" :key="key" @change="onClick(item.e, key)"
                    :checked="key == id ? true : false" style="margin-right:8px">
                    {{ item.c }}
                </el-check-tag>
            </div>
        </el-affix>

        <div class="main">
            <router-view></router-view>
        </div>

    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.box {
    .h {
        background-color: var(--el-bg-color);
        // background-color: #000;
        display: block;
        padding: 8px;
        width: v-bind(w) !important;
    }
}
</style>