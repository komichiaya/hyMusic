<!--  -->
<script setup lang="ts">
import { useRoute } from 'vue-router';
import MyFavouriteMusic from "@/components/MyFavouriteMusic/index.vue"
import CardList from "@/components/CardList/cardList.vue"

const route = useRoute()
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
                <CardList />
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