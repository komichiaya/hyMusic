<script lang="ts" setup>
const props = defineProps({
    showLrc: { type: Boolean, default: false }
})
</script>

<template>
    <div class="card">
        <div class="img">
            <el-image style="width: 100%;height: 100%"
                src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' fit="fill" />
        </div>
        <div class="str">
            <div class="name">
                <p>法螺话</p>
            </div>
            <div class="info">
                <div class="singer">
                    <p>理芽</p>
                </div>
                <!-- <div class="type">
                    歌手
                </div> -->
                <div class="album">
                    <p>法螺话</p>
                </div>
            </div>
            <div class="bottom">
                <div class="lrc" v-if="showLrc">
                    <ul>
                        <li> ひとに眠るものあたしのこころの中</li>
                        <li> 教えてあげるよ君だけに</li>
                        <li> あたしはね実は人殺しなんだ</li>
                        <li> 逃げるなら時間をあげる</li>
                        <li> 君は教えて</li>
                    </ul>
                </div>
                <div class="btn"></div>

            </div>
        </div>
    </div>
</template>


<style lang="less">
.card {
    border: 1px solid #1d1f1e;
    background-color: var(--el-bg-color-overlay);
    border-radius: 4px;
    display: flex;

    .img {
        width: 300px;
        height: 300px;
        overflow: hidden;
        border-radius: 4px;
        margin-right: 20px;
    }

    .str {
        margin: 12px 24px;

        .name {
            font-size: 24px;
        }

        .info {
            margin-bottom: 10px;

            .singer {
                font-size: 20px;
            }

            .album {
                font-size: 18px;
            }

            // .type {}
        }

        .bottom {}
    }
}
</style>
