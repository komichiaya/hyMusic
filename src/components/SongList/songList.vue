<!--  -->
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router"
import { songListInfo } from "@/store/SongList/songListInfo"
import { userStore } from "@/store/User/userInfo"
import { articInfoState } from '@/store/Artist/artistInfo';
import moment from "moment"
import { ElLoading } from 'element-plus'


const router = useRouter()
const route = useRoute()
const sLI = songListInfo()
const uS = userStore()
const aLF = articInfoState()
const type = ref("")
const listId = ref(0)
const offset = ref(0)
const isLike = ref(false)
const loading = ref(false)
const list: any = ref([])
interface Props {
    songList: { id: number; al: { picUrl: string; name: string; }; name: string; ar: [{ name: string; id: number; }]; dt: number; }[],
    showLikeBtn?: {
        type: boolean,
        default: true,
    }
}
const props = defineProps<Props>()
type mutationType = {
    events: {
        newValue: [],
        oldValue: []
    }
}
sLI.$subscribe((mutation, state) => {
    if ((mutation.events as any).newValue.length != (mutation.events as any).oldValue.length) {
        console.log(1);
    }
})
onMounted(() => {
    type.value = route.query.type as any
    listId.value = route.query.id as any


})
onUnmounted(() => {
    console.log(1);
})

const clickLog: any = ref([])
const toPlay = (id: string | number) => {
    //原理就是保留最后3次的点击时间戳，判断数组开头结尾的时间差是否在3000ms内
    clickLog.value.push((new Date()).getTime())
    if (clickLog.value.length > 3) {
        clickLog.value.splice(0, 1)
    }
    if (clickLog.value.length === 3) {
        if (clickLog.value[2] - clickLog.value[0] < 3000) {
            clickLog.value.splice(0, 3)
            router.push({
                path: "/Play", query: {
                    songId: id,
                }
            })
        }
    }

}
const toSinger = (id: string | number) => {
    router.push({
        path: "/Singer", query: {
            type: 1,
            songId: id,
        }
    })
}
const check = (id: string | number) => {
    const b = sLI.likeSongIDList.find((item: number) =>
        item == id
    )
    isLike.value = !Boolean(b)
    return b
}

const likeSong = (id: string | number) => {
    // isLike.value = Boolean(check(id))
    sLI.setLikeSont(id, Boolean(!isLike.value))
    sLI.getLikeSongIDList(uS.userInfo.userId)
}

watch(
    () => route.query,
    (now) => {
        type.value = now.type as any
        listId.value = now.id as any
    }
)
</script>
<template>
    <div class="songList" v-loading="loading">
        <div class="m" v-if="songList.length">
            <el-row class="song" v-for="(item, index) in songList" :key="item.id" @click="toPlay(item.id)">
                <el-col :span="4">
                    <div class="img">
                        <el-image style="width: 100%; height: 100%;
                        border: 1px solid transparent;border-radius: 10px;" :src="item.al.picUrl + '?param=200y200'"
                            lazy />
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="songInfo">
                        <div class="songName">
                            <span>{{ item.name }}</span>
                        </div>
                        <div class="singerName">

                            <div v-for="it in item.ar">
                                <span @click="toSinger(it.id)">{{ it.name }}</span>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="albumName">
                        <span>{{ item.al.name }}</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="other">
                        <div class="like" v-if="showLikeBtn">
                            <i :class="check(item.id) ? 'iconfont icon-aixin' : 'iconfont icon-aixin1'"
                                @click="likeSong(item.id)"></i>
                        </div>
                        <div class="time">
                            <span>{{ moment(item.dt).format("mm:ss") }}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */

.el-row {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: center;
    margin: 8px;
}

.songList {

    .m {

        :hover {
            background: #303133;
        }



        .img {
            width: 50px;
            height: 50px;
        }

        .songInfo {
            margin-left: 4px;

            .songName {
                font-size: 18px;
                font-weight: 600;
                cursor: default;
                padding-right: 16px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                word-break: break-all;
            }

            .singerName {
                display: flex;

                div {
                    margin-right: 5px;

                    span {
                        color: inherit;
                        text-decoration: none;
                        cursor: pointer;
                    }
                }


            }
        }

        .albumName {
            flex: 1;
            display: flex;
            font-size: 16px;
            opacity: .88;
            color: var(--color-text);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            max-width: 300px;
        }

        .other {
            display: flex;
            flex-direction: row;

            .like {
                width: 80px;
                cursor: pointer;
            }

            .time {
                font-size: 16px;
                width: 50px;
                cursor: default;
                display: flex;
                justify-content: flex-end;
                margin-right: 10px;
                font-variant-numeric: tabular-nums;
                opacity: .88;
                color: var(--color-text);

            }
        }
    }
}
</style>