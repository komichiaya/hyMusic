<!--  -->
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const checked = ref(false)
const typeList = ref(['所有', '歌曲', '艺人', '播放清单', '专辑', '电台', '用户',])
const id: any = ref(null)
const t = ref('')
const onClick = (type: string, key: number) => {
    id.value = key
    t.value = typeList.value[key] == '所有' ? 'all' : 'other'
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
                path: `/search/${t.value}/search_list/limit=1`,
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
watch(() => route.params,
    (newParams, oldParams) => {
        t.value = String(newParams.type)
    })
</script>
<template>
    <div class="b">
        <el-affix target=".b" :offset="60">
            <div class="h">
                <el-check-tag v-for="(item, key) in  typeList" :key="key" @change="onClick(item, key)"
                    :checked="key == id ? true : false" style="margin-right:8px">
                    {{ item }}
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
    }
}
</style>