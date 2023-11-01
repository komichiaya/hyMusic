<script lang="ts" setup>
import type { PropType } from 'vue'
interface SongInfo {
    name: string
    al: {
        picUrl: string
        name: string
    }
    ar: [{
        name: string
    }]
    year: number
}
const props = defineProps({
    showLrc: { type: Boolean, default: false },
    songInfo: Object as PropType<SongInfo>,
    lrc: []
})
const lrcArr = ref(computed(() => (props.lrc || []).slice(10, 15)))
</script>

<template>
    <div class="card">
        <div class="img">
            <el-image :src='songInfo?.al.picUrl + "?param=200y200"' fit="fill" />
        </div>
        <div class="str">
            <div class="name">
                <p>{{ songInfo?.name }}</p>
            </div>
            <div class="info">
                <div class="singer">
                    <p v-for="item in songInfo?.ar">{{ item.name }}</p>
                </div>
                <!-- <div class="type">
                    歌手
                </div> -->
                <div class="album">
                    <p>{{ songInfo?.al.name }}</p>
                </div>
            </div>
            <div class="bottom">
                <div class="lrc" v-if="showLrc">
                    <ul>
                        <li v-for="item in lrcArr">
                            {{ item }}
                        </li>

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
