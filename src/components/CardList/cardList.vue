<!--  -->
<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import type { PropType } from 'vue'

interface songListType {
    name: string
    coverImgUrl: string,
    picUrl: string,
    id: number,
    avatarUrl: string
    nickname: string
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
const { width } = useWindowSize()
const count = ref(4)

const nowLimit = ref(1)

onMounted(() => {
    nowLimit.value = Number(route.params.limit) || 1
    if (width.value >= 1700) {
        count.value = 4
    } else {
        count.value = 6
    }
})
const toList = (id: number | string, index: number) => {
    // 0:歌单 1:歌手 2:专辑 3：日推
    const type = Number(route.query.type)
    let t;
    switch (type) {
        case 10:
            t = 2
            break;
        case 100:
            t = 1
            break;
        case 1000:
            t = 0
            break;
    }
    router.push({
        path: "/list",
        query: {
            type: t,
            id,
            index
        }
    })
}
watch([width, route],
    ([w, r], [preW, preR]) => {
        console.log(count.value);
        if (Number(w) >= 1700) {
            count.value = 4
        } else {
            count.value = 6
        }
        nowLimit.value = Number((r as any).params.limit)
    },
)
</script>
<template>
    <div style="margin-top: 40px;">
        <el-row :gutter="20">
            <el-col :span="count" v-for="(item, index) in songList">
                <div style="width: 250px;">
                    <el-card :body-style="{ padding: '15px' }" @click="toList(item.id, index)" style="cursor: pointer;">
                        <div class="img">
                            <el-image :src="item?.coverImgUrl || item?.picUrl || item?.avatarUrl + + '?param=200y200'"
                                class="image" lazy />
                        </div>
                        <div class="text">
                            <p>{{ item.name || item.nickname }}</p>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <div class="foot" v-if="limit > 24">
            <el-pagination layout="prev, pager, next" :page-count="Math.ceil((limit / 24))" hide-on-single-page
                v-model:current-page="nowLimit" @current-change="(e) => currentChange(e)" />
        </div>

    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.el-col {
    margin-bottom: 20px;
}

.text {

    p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>