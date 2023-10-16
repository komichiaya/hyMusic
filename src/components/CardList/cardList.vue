<!--  -->
<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const { width, height } = useWindowSize()
const count = ref(6)
const limit = ref(100)
const nowLimit = ref(1)
const currentChange = (e: number) => {
    router.push({
        path: `/search/${route.params.type}/search_list/limit=${nowLimit.value}`,
        query: (route.query as any)

    })
}
onMounted(() => {
    nowLimit.value = Number(route.params.limit) || 1
})
watch([width.value, route],
    ([width, r], [preWidth, preR]) => {
        if (Number(width) >= 1920) {
            count.value = 8
        } else {
            count.value = 6
        }
        nowLimit.value = Number((r as any).params.limit)
    },
)
</script>
<template>
    <div class="m">
        <div v-for="item in 24">
            <el-card :body-style="{ padding: '15px' }">
                <div class="img">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        class="image" />

                </div>
                <div class="text">
                    <p>Yummy hamburger</p>
                    <p>Yummy hamburger</p>
                </div>
            </el-card>
        </div>
        <div class="foot">
            <el-pagination layout="prev, pager, next" :page-count="limit" hide-on-single-page
                v-model:current-page="nowLimit" @current-change="currentChange" />
        </div>

    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.m {
    display: grid;
    grid-template-columns: repeat(v-bind(count), minmax(200px, 1fr));
    grid-gap: 20px;
    margin-top: 40px;

    .img {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;

        .image {
            border: 1px;
            border-radius: 50%;
        }

    }

    .text {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 20px;

    }

    .foot {
        grid-column: 1 / span v-bind(count);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        align-content: center;
        margin-top: 10px;
    }
}
</style>