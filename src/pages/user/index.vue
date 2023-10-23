<!--  -->
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import MyFavouriteMusic from "@/components/MyFavouriteMusic/index.vue"
import CardList from "@/components/CardList/cardList.vue"

const route = useRoute()
const router = useRouter()
const typeList = ref(['所有歌单', '我创建的歌单', '我收藏的歌单',])
const id: any = ref(null)
const t = ref('')

const changeType = (type: string, key: number) => {
    id.value = key
    t.value = typeList.value[key] == '所有歌单' ? 'all' : 'other'


}
</script>
<template>
    <div>
        <div class="h">
            <MyFavouriteMusic />
        </div>
        <div class="m">
            <div style="margin-top: 40px;">
                <div class="title">
                    <p>
                        我的歌单：
                    </p>
                </div>
                <div class="b">
                    <div class="h">
                        <el-check-tag v-for="(item, key) in  typeList" :key="key" @change="changeType(item, key)"
                            :checked="key == id ? true : false" style="margin-right:8px">
                            {{ item }}
                        </el-check-tag>
                    </div>
                    <div class="main">
                        <CardList />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.m {
    .title {
        p {
            font-size: 24px;
            font-weight: 700;

        }
    }
}
</style>