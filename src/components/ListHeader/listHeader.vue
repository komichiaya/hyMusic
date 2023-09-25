// 0:歌单/专辑 1:歌手
<script setup lang="ts">
const props = defineProps(['type'])

</script>
<template>
    <div class="h">
        <div class="m">
            <div class="pic">
                <el-image style="width: 250px; height: 250px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
            </div>
            <div class="txt">
                <div class="title">
                    <p>你好</p>
                </div>
                <div class="artist" v-if="!type">
                    "Playlist by"
                    <a href="#">
                        BeTheOG
                    </a>
                </div>
                <div class="date" v-if="!type">
                    17点49分
                </div>
                <div class="info">
                    <p>1v1 mid go</p>
                </div>
                <div class="btn">
                    <el-button type="primary">
                        <el-icon>
                            <i class="iconfont icon-27_bofang"></i>
                            <!-- <i class="iconfont icon-28_bofang"></i> -->
                        </el-icon>
                        <!-- <span style='margin-left: 8px;'>
                            {{ type ? "播放热门歌曲" : "播放" }}
                        </span> -->
                    </el-button>
                    <el-button type="info" plain>
                        <el-icon>
                            <i class="iconfont icon-aixin"></i>
                        </el-icon>
                    </el-button>
                    <el-button type="info" plain>
                        <el-icon>
                            <More />
                        </el-icon>
                    </el-button>

                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
/* @import url(); 引入css类 */
.h {
    .m {
        display: flex;


        .txt {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            margin-left: 56px;

            .title {
                font-size: 36px;
                font-weight: 700;
            }

            .artist {
                font-size: 18px;
                opacity: .88;
                margin-top: 24px;

                a {
                    color: inherit;
                    text-decoration: none;
                    cursor: pointer;
                }
            }

            .date {
                font-size: 14px;
                opacity: .68;
                color: var(--color-text);
                margin-top: 2px;

            }

            .info {
                font-size: 14px;
                opacity: .68;
                margin-top: 24px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                cursor: pointer;
            }

            .btn {
                margin-top: 32px;
                display: flex;

            }
        }
    }
}
</style>