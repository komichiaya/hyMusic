<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import songList from "../SongList/songList.vue"
import { useWindowSize, useElementSize } from "@vueuse/core"
const router = useRouter();
const drawer = ref(false)
const { width: w, height: h } = useWindowSize()
const wStr = ref((w.value * .3) + 'px')
import { darkTheme } from 'naive-ui'
import Ly from "lyric-parser"
import { lrc } from "../../assets/lrc"
import { ElScrollbar } from 'element-plus'
import moment from 'moment'
import pubsub from "pubsub-js"
import { playStore } from "../../store/Play"
import { storeToRefs } from "pinia";
const store = playStore()
const { currentRow: cR } = storeToRefs(store)
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
const time = ref(moment(0))
const oTime = ref(moment(0))
const isLeavePage = ref(false)
const isSlide = ref(false)
const isJump = ref(false)
const drawer1 = ref(false)
const active = ref(false)

const n_drawer = ref(null)
const { width, height } = useElementSize(n_drawer)


const toPlayPage = (songId: number) => {
    router.push(`/Play?songId=${songId}`)
}
const demo = () => {

}
const clo = () => {
    drawer.value = false
}

const changeType = (show: boolean, type: number) => {
    console.log(type)
    switch (type) {
        case 1:
            // console.log(oTime.value.format("mm:ss"));
            show ? styleType.value = 'visible' : styleType.value = 'hidden';
            const oM = oTime.value.minute()
            const oS = oTime.value.second()
            const oT = oM * 60 + oS
            const t = Number(moment.duration(oT, 'seconds').valueOf()) * (progressBar.value / 100)
            console.log(moment().millisecond(t));
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
    currentRow.value = lineNum
}
const jump = pubsub.subscribe('jump1', (name: string, lineNum: number) => {
    console.log((songPlay as any).value.lines[lineNum].time)
    const t = (songPlay as any).value.lines[lineNum].time;
    (songPlay as any).value.seek(t);
    isJump.value = true;
    clearInterval(id.value)
    time.value = moment((songPlay as any).value.lines[lineNum].time)
    play()

})

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
        isSlide.value = false
    } else if (isJump.value) {
        (songPlay as any).value.seek((songPlay as any).value.lines[currentRow.value + 1].time)
        isJump.value = false
    }
    else {
        (songPlay as any).value.play()

    }
    changePlayType.value = true


}
const stop = () => {
    (songPlay as any).value.stop()
    changePlayType.value = false
    clearInterval(id.value)
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

const watchStop = watch([route, currentRow, beginTime],
    ([newRoute, currentNewRow, newBeginTime], [oldRoute, currentOldRow, oldBeginTime]) => {
        cheack()
        // console.log(currentNewRow, currentOldRow);
        store.changeCurrentRow(currentRow.value)
        if (time.value >= oTime.value) {
            console.log(1)
            stop()
        }
    }

)

</script>
<template>
    <div>
        <el-row class='f'>
            <el-col :span="8" class="album">
                <div class="albumPic" @click="toPlayPage(1)">
                    <el-image style="width: 100%; height: 100%" :src="url" fit="fill" />
                </div>
                <div class="albumInfo">
                    <div @click="toPlayPage(1)" style="cursor: pointer;">
                        <span>等天亮</span>
                    </div>
                    <div>
                        <div @click="router.push(`/List?type=1`)" style="cursor: pointer;">
                            <span>TTTianll</span>
                        </div>
                    </div>

                </div>
            </el-col>
            <el-col :span="8">
                <div style="display: flex;flex-direction: column;flex-wrap: nowrap;align-content: center;">
                    <div class="btngroup">
                        <el-button type="primary" circle color="#000">
                            <el-icon>
                                <i class="iconfont icon-29_shangyiji"></i>
                            </el-icon>
                        </el-button>
                        <el-button type="primary" circle color="#000" size="large" @click="play" v-if="!changePlayType">
                            <el-icon>
                                <i class="iconfont icon-27_bofang"></i>
                            </el-icon>
                        </el-button>
                        <el-button type="primary" circle color="#000" size="large" @click="stop" v-if="changePlayType">
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

                    <div class="schedule">
                        <p style="font-size: 16px; font-weight: 400;color: #E5EAF3;">
                            {{ beginTime }}
                        </p>

                        <el-slider v-model="progressBar" size="small" @input="changeType(true, 1)"
                            @change="changeType(false, 1)" style="width:100%;margin: 0 20px;" :show-tooltip="false" />
                        <p style="font-size: 16px; font-weight: 400;color: #E5EAF3;">
                            {{ overTime }}
                        </p>
                    </div>

                </div>
            </el-col>
            <el-col :span="8">
                <div class="btngroup">
                    <el-button type="primary" circle color="#000" class="hidden-xs-only" @click="() => drawer = !drawer">
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
                    <el-button type="primary" circle color="#000">
                        <el-icon>
                            <i class="iconfont icon-02_shengyin"></i>
                        </el-icon>
                    </el-button>
                    <el-slider v-model="sound" size="small" @input="changeType(true, 2)" @change="changeType(false, 2)"
                        style="width:20%" class="hidden-xs-only" />

                </div>
            </el-col>
        </el-row>

        <n-config-provider :theme="darkTheme">

            <n-drawer :show="drawer" placement="bottom" :height="h * .8" :show-mask='false' :on-update:show="demo"
                class="drawer" display-directive="show">
                <n-drawer-content>
                    <template #header>
                        <div class="darwer_h">
                            <div class="title">
                                播放列表

                            </div>
                            <div class="closeBtn">
                                <el-button @click='clo'>X</el-button>
                            </div>
                        </div>
                    </template>
                    <n-scrollbar>
                        <div class="demo">
                            <songList :songCount="10" />
                        </div>
                    </n-scrollbar>
                </n-drawer-content>
            </n-drawer>
        </n-config-provider>

    </div>
</template>
<style lang="less">
.drawer {
    width: 520px;


}

.n-drawer.n-drawer--bottom-placement {
    left: auto !important;
    bottom: 100px !important;
    right: 0 !important;

}

.el-drawer.btt,
.el-drawer.ttb {
    bottom: 100px;
}

.el-slider__button {
    width: 15px;
    height: 15px;
}


.slider-demo-block {
    .el-slider__button-wrapper {
        visibility: v-bind(styleType);
    }
}

.btngroup {
    .el-slider__button-wrapper {
        visibility: v-bind(soundType);
    }
}

.el-slider__runway:hover>.el-slider__button-wrapper {
    visibility: visible;
}

.el-slider__runway:focus>.el-slider__button-wrapper {
    visibility: visible;
}
</style>

<style scoped lang="less" >
/* @import url(); 引入css类 */
.darwer_h {
    display: flex;
    height: 100%;
    width: 472px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;

    .title {}

    .close_button {}

}

.control {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    width: 85%;


}

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

.aside {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    align-items: center;
    justify-content: center;
}



.f {
    display: flex;
    align-items: center;
    height: 100px;

    .album {
        display: flex;

        .albumInfo {
            margin-left: 8px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
        }

        .albumPic {
            width: 60px;
            height: 60px;
            cursor: pointer;
        }
    }

    .btngroup {
        display: flex;
        align-items: center;
        justify-content: center;

        button {
            margin: 0 8px;
        }

        ;
    }
}
</style>