<!--  -->
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
const url = ref("https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg")
const time = ref(0)
const sound = ref(0)
const styleType = ref('hidden')
const soundType = ref('hidden')
const router = useRouter();

const changeType = (show: boolean, type: number) => {
    switch (type) {
        case 1:
            show ? styleType.value = 'visible' : styleType.value = 'hidden'; break;
        case 2:
            show ? soundType.value = 'visible' : soundType.value = 'hidden'; break;
        default:
            styleType.value = 'hidden';
            soundType.value = 'hidden';
            break;
    }

}
const toPlayPage = (songId: number) => {
    router.push(`/Play?songId=${songId}`)
}
const toList = (songId: number) => { }
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
                        <el-button type="primary" circle color="#000" size="large">
                            <el-icon>
                                <i class="iconfont icon-27_bofang"></i>
                                <!-- <i class="iconfont icon-28_bofang"></i> -->
                            </el-icon>
                        </el-button>
                        <el-button type="primary" circle color="#000">
                            <el-icon>
                                <i class="iconfont icon-30_xiayiji"></i>
                            </el-icon>
                        </el-button>

                    </div>
                    <div class="slider-demo-block">
                        <el-slider v-model="time" size="small" @input="changeType(true, 1)" @change="changeType(false, 1)"
                            :show-tooltip="false" />
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="btngroup">
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
    </div>
</template>
<style lang="less">
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