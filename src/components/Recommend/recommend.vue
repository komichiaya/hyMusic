<script lang="ts" setup>

import pic from "../../assets/wujing.jpg"
import 'animate.css';
const box: any = ref(null)
onMounted(() => {

})
const play = () => {
    alert("播放日推歌曲")
}
const myFMPlay = () => {
    alert("播放FM歌曲")

}
const myFMNestSong = () => {
    alert("FM下一首歌曲")

}
</script>
<template>
    <div class="w">
        <div class="title">
            为你推荐:
        </div>
        <div class="m">
            <div class="recommendList " ref="box">
                <img :src="pic" alt="" style="width: 100%;height: 600px;object-fit: cover;" />
                <div class="secondTitle">
                    <p>每日推荐</p>
                </div>
                <i class="iconfont  icon-bofang" @click="play"></i>
            </div>
            <div class="myFMList">
                <div>
                    <img :src="pic" alt="" style="width: 300px;height: 100%;object-fit: cover;" />
                </div>
                <div class="secondTitle">
                    <p>私人FM</p>
                </div>
                <div class="controller">
                    <el-icon :size="60" style="margin-right: 10px;cursor: pointer;" @click="myFMPlay">
                        <VideoPlay />
                    </el-icon>
                    <el-icon :size="50" style="cursor: pointer;" @click="myFMNestSong">
                        <DArrowRight />
                    </el-icon>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped >
.w {

    margin-top: 54px;

    .title {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: 700;
    }

    .m {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;

    }

    .recommendList {
        height: 300px;
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, .25);

        i {
            position: absolute;
            right: 10px;
            bottom: 10px;
            font-size: 30px;
            z-index: 2;
            cursor: pointer;


        }



        img {
            animation: move 20s infinite;
            animation-timing-function: ease-in-out;
        }

        @keyframes move {
            0% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(-300px);
            }

            100% {
                transform: translateY(0);
            }
        }

        .secondTitle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            user-select: none;

            p {
                font-size: 32px;
                font-weight: 700;
                color: #fff;
            }
        }
    }

    .recommendList::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }

    .myFMList {
        height: 300px;
        position: relative;
        overflow: hidden;
        border-radius: 20px;

        .secondTitle {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 2;
            user-select: none;

            p {
                font-size: 32px;
                font-weight: 700;
                color: #fff;
            }
        }

        .controller {
            position: absolute;
            right: 10px;
            bottom: 10px;
        }
    }





}
</style>