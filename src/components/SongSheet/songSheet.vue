<!--  -->
<script setup lang="ts">
import { useRouter } from "vue-router";
defineProps({
    title: String
})
const router = useRouter();
const currentDate = ref(new Date())
const toList = () => {
    router.push({
        path: "/List",
        query: {
            type: 0,
            id: 123
        }
    })
}
</script>
<template>
    <div class="w">
        <div class="header">
            {{ title }}:
        </div>
        <div>
            <el-col>
                <div class="list">
                    <div class="item" v-for="(item, index) in 5" :key='index'>
                        <el-card :body-style="{ padding: '0px' }" @click="toList" style="cursor: pointer;">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                class="image" />
                            <div style="padding: 14px">
                                <span>Yummy hamburger1</span>
                                <div class="bottom">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button text class="button">Operating</el-button>
                                </div>
                            </div>
                        </el-card>
                    </div>

                </div>
            </el-col>
        </div>

    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}

.w {
    margin-top: 54px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: 700;
    }

    .list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 44px 24px;

        .b {
            width: 100%;
            height: 100%;
            background-color: #fff;
        }


    }

}
</style>