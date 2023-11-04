<!--  -->
<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()
const currentDate = ref(new Date())
const props = defineProps(['songList', 'type'])
const type = ref(computed(() => props.type))

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
</script>
<template>
    <div class="m">
        <div class="title">
            <slot></slot>
        </div>
        <div class="list">
            <el-card :body-style="{ padding: '0px' }" v-for="item in songList">
                <div style="height: 300px;" @click="toDetail(item.id)">
                    <el-image :src="(item.picUrl || item.coverImgUrl || item.avatarUrl) + '?param=300y300'" class="image"
                        lazy />
                </div>
                <div style="padding: 14px">
                    <p>{{ item.name || item.nickname }}</p>
                </div>
            </el-card>
        </div>
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
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 15px
    }
}

.image {
    height: 100%;
}
</style>