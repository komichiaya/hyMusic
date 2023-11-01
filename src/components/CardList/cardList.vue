<!--  -->
<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import type { PropType } from 'vue'

interface songListType {
    name: string
    coverImgUrl: string,
    picUrl: string,
    id: number
}
const props = defineProps({
    type: String,
    typeNum: {
        type: Number,
        default: 0,
        require: true
    },
    songList: Array as PropType<songListType[]>,
    limit: {
        type: Number,
        default: 0,
        require: true
    },
    currentChange: {
        type: Function,
        // 不像对象或数组的默认，这不是一个
        // 工厂函数。这会是一个用来作为默认值的函数
        default() {
            return 'Default function'
        }
    }
})
const router = useRouter()
const route = useRoute()
const { width, height } = useWindowSize()
const count = ref(5)

const nowLimit = ref(1)

onMounted(() => {
    nowLimit.value = Number(route.params.limit) || 1

})
const toList = (id: number | string, index: number) => {
    router.push({
        path: "/list",
        query: {
            type: 0,
            id,
            index
        }
    })
}
watch([width.value, route],
    ([width, r], [preWidth, preR]) => {
        if (Number(width) >= 1920) {
            count.value = 8
        } else {
            count.value = 4
        }
        nowLimit.value = Number((r as any).params.limit)
    },
)
</script>
<template>
    <div class="m">
        <div v-for="(item, index) in songList">
            <el-card :body-style="{ padding: '15px' }" @click="toList(item.id, index)" style="cursor: pointer;">
                <div class="img">
                    <el-image :src="item.coverImgUrl || item.picUrl" class="image" lazy />
                </div>
                <div class="text">
                    <p>{{ item.name }}</p>
                </div>
            </el-card>
        </div>
        <div class="foot" v-if="limit > 24">
            <el-pagination layout="prev, pager, next" :page-count="Math.ceil((limit / 24))" hide-on-single-page
                v-model:current-page="nowLimit" @current-change="(e) => currentChange(e)" />
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