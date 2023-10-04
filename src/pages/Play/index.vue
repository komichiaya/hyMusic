<!--  -->
<script lang="ts">
export default {
    name: "PlayComponent"
}
</script>
<script setup lang="ts" >

import { useRoute } from "vue-router"
import Ly from "lyric-parser"
import { lrc } from "../../assets/lrc"
import { ElScrollbar } from 'element-plus'
import moment from 'moment'

const rowOffset = 4
const route = useRoute()
const is404 = ref(false)
const isShow = ref(true)
const changePlayType = ref(false)
const lrcArr: (any) = ref([])
const currentRow = ref(-1)
const songPlay = ref(null)
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const progressBar = ref(0)
const sound = ref(0)
const styleType = ref('hidden')
const soundType = ref('hidden')
const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
const divHight = ref(0)
const id = ref()
const beginTime = ref("00:00")
const overTime = ref("00:00")
const time = ref(moment(0, "S"))
const oTime = ref(moment(0, "S"))
const isLeavePage = ref(false)
const isSlide = ref(false)
const isJump = ref(false)
const changeType = (show: boolean, type: number) => {
    switch (type) {
        case 1:
            // console.log(oTime.value.format("mm:ss"));
            show ? styleType.value = 'visible' : styleType.value = 'hidden';
            const oM = oTime.value.minute()
            const oS = oTime.value.second()
            const oT = oM * 60 + oS
            const t = Number(moment.duration(oT, 'seconds').valueOf()) * (progressBar.value / 100)
            console.log(moment(t));
            beginTime.value = moment(t).format('mm:ss')
            time.value = moment(t)
            isSlide.value = true;
            (songPlay as any).value.seek(t)
            if (!changePlayType.value) {
                (songPlay as any).value.stop()
            }

            break;
        case 2:
            show ? soundType.value = 'visible' : soundType.value = 'hidden';
            break;
        default:
            styleType.value = 'hidden';
            soundType.value = 'hidden';
            break;
    }

}
const show = () => {
    isShow.value = !isShow.value
}
const lrcPlayFn = ({ lineNum, txt }: { lineNum: number, txt: any }) => {
    // console.log(lineNum, txt)
    currentRow.value = lineNum
}
const jump = (lineNum: number) => {
    const t = (songPlay as any).value.lines[lineNum].time;
    (songPlay as any).value.seek(t);
    isJump.value = true;
    clearInterval(id.value)
    time.value = moment((songPlay as any).value.lines[lineNum].time)
    play()
}

/**
 * play() 播放歌词
 * stop() 暂停播放
 * seek(startTime) 跳转时间
 * togglePlay() 切换播放/暂停的时间
 */
const cheack = () => {
    if (JSON.stringify(route.query) == "{}" || route.query.songId == "") {
        is404.value = true
    } else {
        is404.value = false

    }
}
const play = () => {
    id.value = setInterval(() => {
        beginTime.value = time.value.add(1, 's').format("mm:ss")
        const m = time.value.minute() * 60
        const s = time.value.second()
        const oM = oTime.value.minute() * 60
        const oS = oTime.value.second()
        progressBar.value = Number(((m + s) / (oM + oS)).toFixed(4)) * 100
    }, 1000);
    if (isSlide.value) {
        (songPlay as any).value.togglePlay()
    } else if (isJump.value) {
        (songPlay as any).value.seek((songPlay as any).value.lines[currentRow.value + 1].time)
    }
    else {
        (songPlay as any).value.play()
    }
    changePlayType.value = true


}
const stop = () => {
    // alert('暂停播放');
    (songPlay as any).value.stop()
    changePlayType.value = false
    clearInterval(id.value)
}
const move = (currentRow: any) => {
    scrollbarRef.value!.setScrollTop((Number(currentRow) - rowOffset) * 40)

}

onMounted(() => {

    beginTime.value = time.value.format("mm:ss")
    overTime.value = oTime.value.minute(5).seconds(35).format("mm:ss")

    cheack()
    songPlay.value = new Ly(lrc, lrcPlayFn)
    lrcArr.value = (songPlay as any).value.lines
    setTimeout(() => {
        divHight.value = document.getElementById("scrollbar")?.clientHeight || 0
    })
})
onActivated(() => {
    cheack()
    move(currentRow.value)
    isLeavePage.value = false
})
onDeactivated(() => {
    isLeavePage.value = true
})
const watchStop = watch([route, currentRow, beginTime],
    ([newRoute, currentNewRow, newBeginTime], [oldRoute, currentOldRow, oldBeginTime]) => {
        cheack()
        // console.log(currentNewRow, currentOldRow);
        if (!isLeavePage.value) {
            if (Number(currentNewRow) > rowOffset && currentNewRow! > currentOldRow!) {
                if (!(Number(currentNewRow) > lrcArr.value.length)) {
                    move(currentNewRow)
                }
            } else if (Number(currentNewRow) > lrcArr.value.length - 1) {
                return 0
            }
        }
        if (time.value >= oTime.value) {
            stop()
        }
    }

)
</script>
<template>
    <div :style="{ height: (divHight - 180) + 'px' }" class="box">
        <div v-if="is404">
            404
        </div>
        <div v-else>
            <div style="width:90vw;height:100%">
                <el-container class="c">
                    <el-aside width="30%" class="aside">
                        <div class="pic">
                            <el-image style="width: 200px; height: 200px" :src="url" />
                        </div>
                        <div class="title">
                            <p class="songName">等天亮</p>
                            <p class="singleName">TTTianll</p>
                        </div>
                        <div class="control">
                            <div
                                style="display: flex;flex-direction: column;flex-wrap: nowrap;align-items: center; margin: 5px 0px;">
                                <div class="btngroup">
                                    <el-button type="primary" circle color="#000">
                                        <el-icon>
                                            <i class="iconfont icon-29_shangyiji"></i>
                                        </el-icon>
                                    </el-button>
                                    <el-button type="primary" circle color="#000" size="large" @click="play"
                                        v-if="!changePlayType">
                                        <el-icon>
                                            <i class="iconfont icon-27_bofang"></i>
                                        </el-icon>
                                    </el-button>
                                    <el-button type="primary" circle color="#000" size="large" @click="stop"
                                        v-if="changePlayType">
                                        <el-icon>
                                            <i class="iconfont icon-28_bofang"></i>
                                        </el-icon>
                                    </el-button>
                                    <el-button type="primary" circle color="#000">
                                        <el-icon>
                                            <i class="iconfont icon-30_xiayiji"></i>
                                        </el-icon>
                                    </el-button>

                                </div>
                            </div>

                            <div class="schedule">
                                <p style="font-size: 20px; font-weight: 400;color: #E5EAF3;">
                                    {{ beginTime }}
                                </p>

                                <el-slider v-model="progressBar" size="small" @input="changeType(true, 1)"
                                    @change="changeType(false, 1)" style="width:100%;margin: 0 20px;"
                                    :show-tooltip="false" />
                                <p style="font-size: 20px; font-weight: 400;color: #E5EAF3;">
                                    {{ overTime }}
                                </p>
                            </div>
                            <div style="display: flex;
                                    flex-direction: row;
                                    flex-wrap: nowrap;
                                    justify-content: center;
                                    align-items: center;">
                                <div v-if="isShow" style="margin-right: 8px;">
                                    <el-button type="primary" circle color="#000" class="hidden-xs-only">
                                        <el-icon>
                                            <i class="iconfont icon-05_liebiao"></i>
                                        </el-icon>
                                    </el-button>
                                    <el-button type="primary" circle color="#000">
                                        <el-icon>
                                            <i class="iconfont icon-23_shunxubofang"></i>
                                        </el-icon>
                                    </el-button>
                                    <el-button type="primary" circle color="#000">
                                        <el-icon>
                                            <i class="iconfont icon-22_suijibofang"></i>
                                        </el-icon>
                                    </el-button>
                                </div>
                                <el-button type="primary" circle color="#000" @click="show">
                                    <el-icon>
                                        <i class="iconfont icon-02_shengyin"></i>
                                    </el-icon>
                                </el-button>
                                <el-slider v-model="sound" size="small" @input="changeType(true, 2)"
                                    @change="changeType(false, 2)" style="width:50%" class="hidden-xs-only" v-if="!isShow"
                                    :style="{ marginLeft: 8 + 'px' }" placement="bottom" />
                            </div>
                        </div>
                    </el-aside>
                    <el-main style="width: 70%;" class="main">
                        <el-scrollbar height="400px" ref="scrollbarRef" wrap-style="scroll-behavior: smooth;">
                            <ul class="songLrcBox">
                                <li v-for="(item, index) in  lrcArr " :key="index"
                                    :class="['songLrc', currentRow == index ? 'currentLyrics' : null]" @click='jump(index)'>
                                    <p :id="index + ''">{{ item.txt }}</p>
                                </li>
                            </ul>
                        </el-scrollbar>

                    </el-main>
                </el-container>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.c {
    display: flex;
}

.box {
    display: flex;
    align-items: center;
}

.songLrcBox {
    display: flex;
    align-items: center;
    flex-direction: column;

    li {
        margin: 5px 0;
        height: 30px;
    }

    .songLrc {
        p {
            font-size: 24px;
        }
    }

    .currentLyrics {
        height: auto;

        p {
            text-align: center;
            font-weight: 700;
            font-size: 32px;
        }
    }
}

.aside {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    justify-content: center;
}

.title {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;

    .songName {
        font-size: 18px;
    }

    .singleName {
        font-size: 12px;
    }
}

.control {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    width: 85%;

    .schedule {
        display: flex;
        width: 100%;
        align-content: center;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;

        p {
            font-size: 16px;
            width: 100px;
        }
    }
}
</style>