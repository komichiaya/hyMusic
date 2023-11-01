<!--  -->
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { DArrowRight as IconView } from '@element-plus/icons-vue'
import { PropType } from "vue"
import { userStore } from "@/store/User/userInfo"
const uS = userStore()
const type = ref(0)
type arr = {
    id: number,
    name: string,
    description: string,
    coverImgUrl: string,
    picUrl: string,
    creator: {
        nickname: string
    }
    artist: {
        name: string
    }
}
const props = defineProps({
    title: String,
    songList: Array as PropType<arr[]>
})
const router = useRouter();
const route = useRoute()
const currentDate = ref(new Date())
onMounted(() => {
    if (props.title == '音乐作品') {
        type.value = 3
    } else {
        type.value = 0
    }
})
const toList = (id: number, index: number) => {
    router.push({
        path: "/List",
        query: {
            type: type.value,
            id,
            index
        }
    })
}
const morePage = () => {
    if (props.title == '用户歌单') {
        router.push({
            name: "User",
            params: {
                id: uS.userInfo.userId
            }
        })
    } else if (props.title == "推荐歌单") {
        console.log(1);
        router.push({
            name: "recommend",

        })
    }

}
</script>
<template>
    <div class="w">
        <div class="header">
            <div class="title">
                {{ title }}:
            </div>
            <el-link @click="morePage">
                more<el-icon class="el-icon--right">
                    <DArrowRight />
                </el-icon>
            </el-link>
        </div>
        <div>
            <el-col>
                <div class="list">
                    <div class="item" v-for="(item, index) in songList" :key='item.id'>
                        <el-card :body-style="{ padding: '0px' }" @click="toList(item.id, index
                        )" style="cursor: pointer;">
                            <el-image lazy :src="(item.coverImgUrl || item.picUrl) + '?param=300y300'" class="image">
                                <template #placeholder>
                                    <div class="image-slot">Loading
                                        <span class="dot">...</span>
                                    </div>
                                </template>
                            </el-image>
                            <div style="padding: 14px">
                                <div class="listTitle">
                                    {{ item.name }}
                                </div>
                                <div class="bottom">
                                    <time class="nickname">@{{ item.creator?.nickname || item.artist?.name }}</time>
                                </div>
                            </div>
                        </el-card>
                    </div>

                </div>
            </el-col>
        </div>

    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.image-slot {
    display: block;
    widows: 200px;
    height: 200px;
}

.listTitle {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
    line-height: 1;
    height: 32px;
}




.image {
    width: 100%;
    display: block;
}

.w {
    margin-top: 54px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 20px;

        .title {
            font-size: 28px;
            font-weight: 700;
        }

        .more {
            color: #C0C4CC;
            font-size: 12px
        }
    }

    .list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 44px 24px;



        .bottom {
            margin-top: 13px;
            line-height: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .nickname {
                font-size: 12px;
                color: #999;
            }

        }

    }

}
</style>