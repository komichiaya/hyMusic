<script setup lang='ts'>
import pic from "@/assets/calendar.png"
</script>
<template>
    <div class="demo">
        <img :src="pic" alt="">
        <p>
            <slot></slot>
        </p>
    </div>
</template>

<style scoped lang='less'>
/* @import url(); 引入css类 */
.demo {
    width: 250px;
    height: 250px;
    position: relative;

    img {
        width: 100%;
        height: 100%;
    }

    p {

        position: absolute;
        left: 50%;
        top: 65%;
        transform: translate(-50%, -50%);
        font-size: 64px;
        font-weight: 700;
        color: #fff
    }
}
</style>