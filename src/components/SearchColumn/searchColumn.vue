<!--  -->
<script setup lang="ts">
const currentDate = ref(new Date())

</script>
<template>
    <div class="m">
        <div class="title">
            <slot></slot>
        </div>
        <div class="list">
            <el-card :body-style="{ padding: '0px' }" v-for="item in 5">
                <div style="height: 300px;">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        class="image" />
                </div>
                <div style="padding: 14px">
                    <p>Yummy hamburger</p>
                    <p>Yummy hamburger</p>
                </div>
            </el-card>
        </div>
    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */
.m {

    .title {
        font-size: 32px;
        font-weight: 800;
        margin: 8px
    }

    .list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 20px
    }
}

.image {
    height: 100%;
}
</style>