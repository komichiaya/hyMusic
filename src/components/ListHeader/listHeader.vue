// 0:歌单/专辑 1:歌手
<script setup lang="ts">
import { songListInfo } from "@/store/SongList/songListInfo"
import { userList } from "@/store/User/userList"
import moment from "moment";

const props = defineProps(['type', 'listHeaders', 'listId'])
const sLT = songListInfo()
const imgUrl = ref(computed(() => {
    switch (props.type) {
        case 0:
            return props.listHeaders.coverImgUrl
        case 1:
            return props.listHeaders.avatar
        case 3:
            return props.listHeaders.blurPicUrl
    }
}))
onMounted(() => {
})
</script>
<template>
    <div class="h">
        <div class="m">
            <div class="pic">
                <el-image style="width: 250px; height: 250px" :src="imgUrl + '?param=200y200'" />
            </div>
            <div class="txt">
                <div class="title">
                    <p>{{ listHeaders.name }}</p>
                </div>
                <div class="artist" v-if="!type">
                    "Playlist by"
                    <a href="#">
                        {{ listHeaders.creator?.nickname }}
                    </a>
                </div>
                <div class="date" v-if="!type">
                    {{ moment(listHeaders.createTime).format("YYYY-MM-DD") }}创建
                </div>
                <div class="works" v-if="type">
                    <span>
                        <i class="iconfont icon-24gf-videoAlbum"></i>
                        {{ listHeaders.albumSize }}
                    </span>
                    <span>
                        <i class="iconfont icon-yinle"></i>
                        {{ listHeaders.musicSize }}
                    </span>
                </div>
                <div class="info">
                    <p>{{ listHeaders.description || listHeaders.briefDesc }}</p>

                </div>
                <div class="btn">
                    <el-button type="primary">
                        <el-icon>
                            <i class="iconfont icon-27_bofang"></i>
                            <!-- <i class="iconfont icon-28_bofang"></i> -->
                        </el-icon>
                        <span style='margin-left: 8px;'>
                            {{ type ? "播放热门歌曲" : "播放" }}
                        </span>
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

            .works {
                display: flex;
                flex-direction: row;

                span {
                    margin-right: 8px;
                }
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