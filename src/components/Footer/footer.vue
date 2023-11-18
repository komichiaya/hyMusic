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
import { songListInfo } from "@/store/SongList/songListInfo"
import { debounce } from "@/assets/tools"



const store = playStore()
const songListStore = songListInfo()
const { currentRow: cR, songs } = storeToRefs(store)
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
const sound = ref(50)
const styleType = ref('hidden')
const soundType = ref('hidden')

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
const audio = ref(null)
const loopType = ref(true)
const n_drawer = ref(null)
const { width, height } = useElementSize(n_drawer)
const info: any = ref({})
const index = ref(0)
const showBtnType = ref(true)
store.$subscribe((mutation, state) => {
    // console.log(mutation, state)
    const { al, name, ar, dt }: any = state.songs[0]
    const { audio, newAudio, oldAudio, historyList }: any = state
    info.value = { al, name, ar, dt }
    oTime.value = moment(dt)
    overTime.value = moment(dt).format("mm:ss");
    audio.volume = sound.value * 0.01
    newAudio.volume = sound.value * 0.01
    oldAudio.volume = sound.value * 0.01
    if (audio.src) {
        showBtnType.value = false
    } else {
        showBtnType.value = true

    }
})

const toPlayPage = (songId: number) => {
    router.push(`/Play?songId=${songId}`)
}
const demo = () => {

}
const clo = () => {
    drawer.value = false
}

const changeType = (show: boolean, type: number) => {
    switch (type) {
        case 1:
            // console.log(oTime.value.format("mm:ss"));
            show ? styleType.value = 'visible' : styleType.value = 'hidden';
            const oM = oTime.value.minute()
            const oS = oTime.value.second()
            const oT = oM * 60 + oS
            const t = Number(moment.duration(oT, 'seconds').valueOf()) * (progressBar.value / 100)
            // console.log(moment().millisecond(t));
            beginTime.value = moment(t).format('mm:ss')
            time.value = moment(t)
            isSlide.value = true;
            (store.play as any).seek(t);
            store.audio.currentTime = t / 1000
            if (!changePlayType.value) {
                (store.play as any).stop()
            }
            break;
        case 2:
            show ? soundType.value = 'visible' : soundType.value = 'hidden';
            if (store.audio.src != '') {
                store.audio.volume = sound.value * 0.01
            }
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
    // console.log((store.play as any).lines[lineNum].time)
    const t = (store.play as any).lines[lineNum].time;
    (store.play as any).seek(t);
    isJump.value = true;
    clearInterval(id.value)
    time.value = moment(t)
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
const play = async () => {
    if (id.value) {
        clearInterval(id.value)
    }
    id.value = setInterval(() => {
        beginTime.value = time.value.add(1, 's').format("mm:ss")
        const m = time.value.minute() * 60
        const s = time.value.second()
        const oM = oTime.value.minute() * 60
        const oS = oTime.value.second()
        progressBar.value = Number(((m + s) / (oM + oS)).toFixed(4)) * 100
    }, 1000);
    if (isSlide.value) {
        (store.play as any).togglePlay();
        store.audio.play();
        isSlide.value = false
    } else if (isJump.value) {
        // console.log((store.play as any).lines[cR.value + 1].time / 10, '(store.play as any).lines[cR.value + 1].time');
        (store.play as any).seek((store.play as any).lines[cR.value + 1].time);
        store.audio.currentTime = (store.play as any).lines[cR.value + 1].time / 1000
        store.audio.play()
        isJump.value = false
    }
    else {
        store.audio.volume = sound.value * 0.01;
        // console.log(store.audio.currentTime * 1000);
        (store.play as any).seek(store.audio.currentTime * 1000);
        store.audio.play()
        store.isPlay = true
    }
    changePlayType.value = true;
    const a = index.value + 1
    const length = store.historyList.length
    const i = a >= length ? a - length : a
    if (length) {
        await store.getUrl(store.historyList[i].id, undefined, undefined, "new")
        await store.getUrl(store.historyList.at(index.value - 1).id, undefined, undefined, "old")
        store.newAudio = new Audio(store.newSongsInfo[0].url)
        store.oldAudio = new Audio()
    } else {
        store.pushHistoryList = true;
        store.historyList.push(store.songs[0])

    }

}
pubsub.subscribe('play', play)

const stop = () => {
    (store.audio as any).pause();
    (store.play as any).stop();
    changePlayType.value = false
    clearInterval(id.value)
}
const pause = () => {
    (store.audio as any).pause();
    (store.play as any).stop();
    changePlayType.value = false
    // isSlide.value = true
    clearInterval(id.value)
}

onMounted(() => {
    beginTime.value = time.value.format("mm:ss")
    if (songs.value.length) {
        oTime.value = moment(info.value.dt)
        overTime.value = moment(info.value.dt).format("mm:ss")
    } else {
        overTime.value = oTime.value.minute(0).seconds(0).format("mm:ss")
    }
    cheack()
    // songPlay.value = new Ly(store.lyricInfo.lrc.lyric, lrcPlayFn)
    lrcArr.value = (store.play as any).lines
    setTimeout(() => {
        divHight.value = document.getElementById("scrollbar")?.clientHeight || 0
    })
})
const previousSong = () => {
    stop()
    initTime()
    store.audio = store.oldAudio
    router.replace({
        path: "/Play",
        query: {
            songId: store.historyList.at(index.value - 1).id,
            index: index.value - 1 < 0 ? index.value - 1 + store.historyList.length : index.value - 1
        }
    });

}
const nextSong = () => {
    stop()
    initTime()
    store.audio = store.newAudio
    const a = index.value + 1
    const length = store.historyList.length
    const i = a >= length ? a - length : a
    router.replace({
        path: "/Play",
        query: {
            songId: store.historyList[i].id,
            index: i
        }
    });

}
const loop = () => {
    console.log(123)
    nextSong()
}
const initTime = () => {
    time.value = moment(0)
    beginTime.value = time.value.format("mm:ss")
}
pubsub.subscribe("initTime", initTime)
const watchStop = watch([route, beginTime, store],
    ([newRoute, newBeginTime, newStore], [oldRoute, oldBeginTime, oldStore]) => {
        index.value = Number(newRoute.query.index);
        cheack()
        // console.log(currentNewRow, currentOldRow);
        // store.changeCurrentRow(currentRow.value)
        if (time.value.unix() == oTime.value.unix()) {
            if (JSON.stringify(store.play) != '{}') {
                nextSong()
            }
        }
        if (songs.value.length) {
            oTime.value = moment((songs.value[0] as any).dt)
            overTime.value = moment((songs.value[0] as any).dt).format("mm:ss")
        }
        /*   store.audio.addEventListener('ended', function (e) {
               const { isTrusted } = e
               console.log(isTrusted);
               if (isTrusted) {
                   if (loopType.value) {
                       loop()
                   } else {
                       console.log("stop");
                       stop()
                   }
               }
           })*/

    },
    { deep: true }

)
</script>
<template>
    <div v-if="JSON.stringify(info) != ''">
        <el-row class='f'>
            <el-col :span="8" class="album">
                <div class="albumPic" @click="toPlayPage(Number(route.query.songId))" v-if="Object.hasOwn(info, 'al')">
                    <el-image style="width: 100%; height: 100%" :src="info.al.picUrl" fit="fill" />
                </div>
                <div class="albumInfo">
                    <div @click="router.push({
                        path: '/Albums', query: {
                            id: Number(info.al.id),
                            type: 2
                        }
                    })" style="cursor: pointer;">
                        <span>{{ info.name }}</span>
                    </div>
                    <div v-for='item in info.ar '>
                        <div @click="router.push({
                            path: '/Singer', query: {
                                id: item.id,
                                type: 1
                            }
                        })" style="cursor: pointer;">
                            <span>{{ item.name }}</span>
                        </div>
                    </div>

                </div>
            </el-col>
            <el-col :span="8">
                <div style="display: flex;flex-direction: column;flex-wrap: nowrap;align-content: center;">
                    <div class="btngroup">
                        <el-button type="primary" circle color="#000" @click="previousSong" :disabled='showBtnType'>
                            <el-icon>
                                <i class="iconfont icon-29_shangyiji"></i>
                            </el-icon>
                        </el-button>
                        <el-button type="primary" circle color="#000" size="large" @click="play" v-if="!changePlayType"
                            :disabled='showBtnType'>
                            <el-icon>
                                <i class="iconfont icon-27_bofang"></i>
                            </el-icon>
                        </el-button>
                        <el-button type="primary" circle color="#000" size="large" @click="pause" v-if="changePlayType"
                            :disabled='showBtnType'>
                            <el-icon>
                                <i class="iconfont icon-28_bofang"></i>
                            </el-icon>
                        </el-button>
                        <el-button type="primary" circle color="#000" @click="nextSong" :disabled='showBtnType'>
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
                            <songList v-if="store.pushHistoryList" :songList="store.historyList" />
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