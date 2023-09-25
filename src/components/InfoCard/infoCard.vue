<template>
    <div class="card">
        <div class="img">
            <el-image style="width: 100%;height: 100%"
                src='https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' fit="fill" />
        </div>
        <div class="name">
            <p>法螺话</p>
        </div>
        <div class="info">
            <div class="singer">
                <p>理芽</p>
            </div>
            <div class="type">
                歌手
            </div>
        </div>
        <div class="btn"></div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less">
.card {
    border: 1px solid transparent;
    background-color: var(--el-bg-color-overlay);
    border-radius: var(--el-card-border-radius);

    .img {
        width: 100px;
        height: 100px;
        overflow: hidden;
    }

    .name {}

    .info {
        .singer {}

        .type {}
    }
}
</style>
