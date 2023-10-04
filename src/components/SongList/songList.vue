<!--  -->
<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()
const props = defineProps(['songCount'])
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
</script>
<template>
    <div class="songList">
        <div class="m">
            <el-row v-for="(item, index) in songCount" :key="index" @click="toPlay(2)">
                <el-col :span="3">
                    <div class="img">
                        <el-image style="width: 100%; height: 100%;
                        border: 1px solid transparent;border-radius: 10px;"
                            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="songInfo">
                        <div class="songName">
                            <span>nihao</span>
                        </div>
                        <div class="singerName" @click="toSinger(1)">
                            <span>hy</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="albumName">
                        <span>你好</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="other">
                        <div class="like">
                            <i class="iconfont icon-aixin"></i>
                        </div>
                        <div class="time">
                            <span>00:00</span>
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
    position: relative;
    box-sizing: border-box;
    align-items: center;
    margin: 8px;
}

.songList {
    .m {

        .img {
            width: 50px;
            height: 50px;
        }

        .songInfo {
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
                color: inherit;
                text-decoration: none;
                cursor: pointer;

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
        }

        .other {
            display: flex;
            flex-direction: row;

            .like {
                width: 80px;
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