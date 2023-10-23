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
    c: '所有', e: "all"
}, {
    c: '歌曲', e: "song"
}, { c: '艺人', e: 'singer' }, {
    c: '播放清单', e: 'list'
}, {
    c: '专辑', e: "album"
}, {
    c: '电台', e: "fm"
}, {
    c: '用户', e: 'user'
},])
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
            router.push({
                path: `/search/${type}/search_list/limit=1`,
                query: {
                    s: route.query.s,
                    type: key
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
        console.log(newRoute.params.type)
        t.value = String(newRoute.params.type)
        w.value = newWidth + 'px'
    })
</script>
<template>
    <div class="b">
        <el-affix target=".b" :offset="60">
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
.b {
    .h {
        background-color: var(--el-bg-color);
        // background-color: #000;
        display: block;
        padding: 8px;
        width: v-bind(w) !important;
    }
}
</style>