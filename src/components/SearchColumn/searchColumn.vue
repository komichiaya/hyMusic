<!--  -->
<script setup lang="ts">
import { useRouter } from "vue-router"
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()
const router = useRouter()
const currentDate = ref(new Date())
const props = defineProps(['songList', 'type'])
const type = ref(computed(() => props.type))
const count = ref(4)
const toDetail = (id: number) => {
    switch (type.value) {
        case "artists":
            router.push({
                path: "/Singer",
                query: {
                    type: 1,
                    id
                }
            }
            )
            break;
        case "playLists":
            router.push({
                path: "/List",
                query: {
                    type: 0,
                    id
                }
            }
            )
            break;
        case "albums":
            router.push({
                path: "/Albums",
                query: {
                    type: 2,
                    id
                }
            }
            )
            break;
        case "users":
            break;
    }
}
watch(() => width.value,
    (w, preW) => {
        console.log(count.value);
        if (Number(w) >= 1700) {
            console.log(count.value);
            count.value = 4
        } else {
            console.log(count.value);
            count.value = 6
        }
    },
)
</script>
<template>
    <div class="m">
        <div class="title">
            <slot></slot>
        </div>
        <el-row :gutter="20">
            <el-col :span="count" v-for="item in songList" class="list">
                <div class="">
                    <el-card :body-style="{ padding: '0px' }">
                        <div style="height: 250;" @click="toDetail(item.id)">
                            <el-image :src="(item.picUrl || item.coverImgUrl || item.avatarUrl) + '?param=300y300'"
                                class="image" lazy />
                        </div>
                        <div style="" class="text">
                            <p>{{ item.name || item.nickname }}</p>
                        </div>
                    </el-card>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.m {

    .title {
        font-size: 32px;
        font-weight: 800;
        margin: 8px
    }

    .list {
        width: 300px;

        .text {
            padding: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.image {
    height: 100%;
}
</style>