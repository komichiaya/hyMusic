<!--  -->
<script setup lang="ts">
import { useRouter } from "vue-router"
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const router = useRouter()

</script>
<template>
    <div class="w">
        <div class="title">
            推荐歌手:
        </div>
        <div class="averageList">
            <el-card class="box-card" v-for="(item, index) in 6" :key="index" style="cursor: pointer;"
                @click="() => router.push({ path: '/List', query: { type: 1 } })">
                <el-image style="border-radius: 50%;"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <div style="padding: 14px">
                    <span>HY</span>
                </div>
            </el-card>

        </div>
    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.box-card {
    border: 1px solid transparent;
    border-radius: 10px;
}

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

    .averageList {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 44px 24px;

        .average {
            width: 200px;
            height: 200px;
            border: 1px solid #fff;
            border-radius: 50%;
        }
    }

}
</style>