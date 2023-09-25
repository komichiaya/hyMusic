<script setup lang="ts">
import 'element-plus/theme-chalk/display.css'
import Home from './pages/home/index.vue';
import Header from '@/components/Header/header.vue'
import Footer from '@/components/Footer/footer.vue'
import { useElementSize } from '@vueuse/core'
import { store } from "./store"
import { storeToRefs } from 'pinia';
const { isShowFooter } = storeToRefs(store())
const h = ref()
const f = ref()
const { height: hh } = useElementSize(h)
const { height: fh } = useElementSize(f)
</script>

<template>
  <div class="w">
    <el-container>
      <el-header class="h" ref="h">
        <Header />
      </el-header>
      <el-main class="w">
        <Home :anotherHight='fh + hh' />
      </el-main>
      <el-footer class="f" ref="f" height="100px" v-show="!isShowFooter">
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>
<style>
html,
body {
  overflow: hidden;
  min-width: 960px;
}
</style>

<style scoped lang="less">
.w {
  padding: 0;

  .h {
    width: 100%;
  }



  .f {
    width: 100%;
  }
}
</style>
