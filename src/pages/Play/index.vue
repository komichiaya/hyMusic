<!--  -->
<script lang="ts">
export default {
    name: "PlayComponent"
}
</script>
<script setup lang="ts" >
import { useRoute, useRouter } from "vue-router"
import Ly from "lyric-parser"
import { lrc } from "../../assets/lrc"
import { ElScrollbar } from 'element-plus'
import moment from 'moment'
import pubsub from "pubsub-js"
import { playStore } from "../../store/Play"
import { storeToRefs } from "pinia"


const router = useRouter()
const pStore = playStore()
const { currentRow: cR, songs } = storeToRefs(pStore)
const rowOffset = 4
const route = useRoute()
const is404 = ref(false)
const isShow = ref(true)
const changePlayType = ref(false)
const lrcArr: (any) = ref([])
const songPlay = ref(null)
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const progressBar = ref(0)
const styleType = ref('hidden')
const soundType = ref('hidden')
const divHight = ref(0)
const id = ref()
const beginTime = ref("00:00")
const overTime = ref("00:00")
const time = ref(moment(0, "S"))
const oTime = ref(moment(0, "S"))
const isLeavePage = ref(false)
const isSlide = ref(false)
const isJump = ref(false)
const nowID = ref()
const ID = ref(0)
const currentTime = ref(0)
pStore.$subscribe((mutation, state) => {
    const { lyricInfo } = state

})


const jump = (lineNum: number) => {
    const t = (pStore.play as any).lines[lineNum].time;
    // (songPlay as any).value.seek(t);
    isJump.value = true;
    // clearInterval(id.value)
    pStore.changeCurrentRow(lineNum);
    time.value = moment(t)
    //play()
    pubsub.publish('jump1', lineNum)
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

const move = (currentRow: any) => {
    scrollbarRef.value!.setScrollTop((Number(currentRow) - rowOffset) * 40)
}
pubsub.subscribe('move', move)
onMounted(async () => {
    window.onbeforeunload = () => {
        localStorage.setItem("ID", JSON.stringify(nowID.value))
    }
    cheack()
    setTimeout(() => {
        divHight.value = document.getElementById("scrollbar")?.clientHeight || 0
    })

})

onActivated(async () => {
    cheack()
    isLeavePage.value = false
    const id = (computed(() => route.query.songId))
    await pStore.getSongInfo(nowID.value || id.value)
    await pStore.getSongLyric(nowID.value || id.value)
    console.log(Number(id.value), Number(localStorage.getItem("ID")));
    if (Number(id.value) != Number(localStorage.getItem("ID")) || pStore.audio.src == '') {
        console.log("进来了")
        if (JSON.stringify(pStore.play) != '{}') {
            pStore.play.stop()
        }
        if (pStore.audio.src != '') {
            (pStore.audio as any).pause();
        }
        pubsub.publish("initTime")
        await pStore.getUrl(Number(id.value));
        pStore.play = new Ly(pStore.lyricInfo.lrc.lyric, demo)
        pStore.audio = new Audio(pStore.songsInfo[0].url)
        lrcArr.value = (pStore.play as any).lines
        ID.value = nowID.value
        beginTime.value = time.value.format("mm:ss")
        overTime.value = moment((pStore.songs[0] as any).dt).format("mm:ss")
        oTime.value = moment((pStore.songs[0] as any).dt)
    }

    pubsub.publish('play')
    move(pStore.currentRow)

})
const demo = ({ lineNum, txt }: { lineNum: number, txt: any }) => {
    cR.value = lineNum
}
onDeactivated(() => {
    isLeavePage.value = true
    const id = Number(route.query.songId)
    ID.value = id
})
const chageType = () => {

}
const watchStop = watch([route, cR, beginTime],
    ([newRoute, currentNewRow, newBeginTime], [oldRoute, currentOldRow, oldBeginTime]) => {
        nowID.value = newRoute.query.songId
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
        } else {
            // console.log(currentNewRow, currentOldRow);
        }

    }

)
watchEffect(() => {

})
</script>
<template>
    <div :style="{ height: (divHight - 180) + 'px' }" class="box">
        <div v-if="is404">
            404
        </div>
        <div v-else>
            <div style="width:90vw;height:100%" v-if="pStore.audio">
                <el-container class="c">
                    <el-main style="width: 70%;" class="main">
                        <el-scrollbar height="400px" ref="scrollbarRef" wrap-style="scroll-behavior: smooth;">
                            <ul class="songLrcBox">
                                <li v-for="(item, index) in  lrcArr " :key="index"
                                    :class="['songLrc', cR == index ? 'currentLyrics' : null]" @click='jump(index)'>
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
        cursor: pointer;

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