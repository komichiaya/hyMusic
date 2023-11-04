<!--  -->
<script setup lang="ts">
import Login from "../Login/login.vue"
import {
    ArrowLeftBold, ArrowRightBold, More, HomeFilled
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from "element-plus"

import { useElementSize } from '@vueuse/core'
import { debounce } from "../../assets/tools"
import { userStore } from "@/store/User/userInfo"
import { getSearchHot } from "@/api"

const el = ref(null)
const { width, height } = useElementSize(el)
const route = useRoute()
const router = useRouter();
const search = ref("")
const backType = ref((history.state as any).back)
const forwardType = ref((history.state as any).forward)
const hotSearchList = ref([])
const visible = ref(false)
const uS = userStore()
onMounted(async () => {
    const { result: { hots } } = await getSearchHot()
    hotSearchList.value = (hots)
})
const userInputSearch = (e: any) => {
    debounce(() => {
        if (e.trim()) {
            console.log(e)
            visible.value = true
        }
    }, 500)
}
const userFocusInput = () => {
    if (search.value.trim()) {
        console.log(search.value);
        visible.value = true

    }
}
const userEnterSearch = (e: any) => {
    visible.value = false
    if (search.value.trim()) {
        router.push({
            path: "/search/all/search_all",
            query: {
                s: search.value,
                type: "0"
            }
        })
    }
}
const loginOut = async () => {
    localStorage.removeItem('userCookie')
    const res = await uS.userLogout()
    if (res) {
        ElMessage({
            message: '退出成功',
            type: 'success',
        })
    }
    location.reload()
}
watch([route],
    () => {
        const { state: { back, forward } } = history
        backType.value = back
        forwardType.value = forward
    })



</script>
<template>
    <div class="m">
        <el-row :gutter="20" justify="space-evenly">
            <el-col :span="6" :xs="4">
                <div class="btn">
                    <el-dropdown>
                        <el-button :icon="More" color="#000" class='more' size="large" />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <el-button link @click="router.push('Settings')">
                                        设置
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button link>
                                        账号
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button link @click="loginOut">
                                        退出
                                    </el-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <el-button :icon="ArrowLeftBold" size="large" class="hidden-xs-only" :disabled="!backType"
                        @click="router.back()" />
                    <el-button :icon="ArrowRightBold" size="large" class="hidden-xs-only" :disabled="!forwardType"
                        @click="router.forward()" />
                </div>
            </el-col>
            <el-col :span="8" :xs="4">
                <div class="search">
                    <el-button size="large" :icon="HomeFilled" circle style='margin-right: 20px'
                        @click="router.push('/Home')" />
                    <el-popover placement="bottom-start" :width="width" :visible="visible" popper-class="popper">
                        <div>
                            <div class="history">
                                <p>搜索历史</p>
                                <ul>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>4</li>
                                    <li>5</li>
                                </ul>
                            </div>
                            <div class="dashed" />
                            <div class="trending">
                                <p>热搜榜</p>
                                <ul v-for="item in hotSearchList">
                                    <li>{{ item.first }}</li>
                                </ul>
                            </div>

                        </div>
                        <template #reference>
                            <el-input size="large" v-model="search" class="hidden-xs-only" placeholder="想听什么?" clearable
                                ref="el" @input="userInputSearch" @keyup.enter="userEnterSearch" @focus="userFocusInput"
                                @blur="() => { visible = false }">
                                <template #prefix>
                                    <el-icon>
                                        <Search />
                                    </el-icon>
                                </template>
                            </el-input>
                        </template>
                    </el-popover>
                </div>
            </el-col>
            <el-col :span="6" :xs="4">
                <Login />
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="less">
/* @import url(); 引入css类 */

.m {
    height: var(--el-header-height);
    display: flex;
    align-items: center;



    .more {
        margin-right: 10px;
        font-size: 24px;
        color: #fff;
        font-weight: 700;
    }

    .search {
        display: flex;
        align-items: center;
        width: 85%;




    }


}

.el-row {
    flex: 1;
    align-items: center;
}
</style>
<style lang="less">
.popper {
    background-color: #fff;

    .dashed {
        margin: 8px 0;
        border-top: 2px dashed var(--el-border-color);
    }
}
</style>