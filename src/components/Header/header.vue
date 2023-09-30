<!--  -->
<script setup lang="ts">

import {
    ArrowLeftBold, ArrowRightBold, More, HomeFilled
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import { useElementSize } from '@vueuse/core'
import { debounce } from "../../assets/tools"
import { fa } from 'element-plus/es/locale';


const el = ref(null)
const { width, height } = useElementSize(el)
const route = useRoute()
const router = useRouter();
const search = ref("")
const backType = ref((history.state as any).back)
const forwardType = ref((history.state as any).forward)
const dialogVisible = ref(false)
const isLogin = ref(false)
const activeName = ref('first')
const visible = ref(false)
const submitBtn = ref("登录")
const submitType = ref(true)
const registerBtn = ref('注册')
const registerType = ref(true)// true:注册 false:登录
const loginBoHeight = ref('200px')
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab.props.label)
}

const handleClose = () => {
    dialogVisible.value = false

}

const ruleFormRef = ref<FormInstance>()

const checkUserName = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('Please input the age'))
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
        }
    }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    }
    callback()
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}
const validateCode = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the Code'))
    }
    callback()
}
const ruleForm = reactive({
    pass: '',
    checkPass: "",
    username: '',
    code: ""
})

const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    agusernamee: [{ validator: checkUserName, trigger: 'blur' }],
    code: [{ validator: validateCode, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
            handleClose()
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    // if (registerType) handleClose()

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
const submitBtnClick = () => {
    submitForm(ruleFormRef.value)
}
const registerBtnClick = () => {
    registerType.value = !registerType.value

    if (registerType.value) {
        // resetForm(ruleFormRef.value)
        registerBtn.value = '注册'
        submitBtn.value = '登录'

    } else {
        submitBtn.value = '注册'
        registerBtn.value = '返回'
    }
    ruleFormRef.value?.resetFields()

}
watch([route, registerType],
    ([p, t], [preP, preT]) => {
        const { state: { back, forward } } = history
        backType.value = back
        forwardType.value = forward
        loginBoHeight.value = t ? "200px" : "250px"
    })
const login = () => {
    dialogVisible.value = true
}


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
                                    <el-button link>
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
                    <el-popover placement="bottom-start" :width="width" title="Title" :visible="visible">
                        <div>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                            </ul>
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
                <div @click="login" style="cursor: pointer;">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </div>
                <el-dialog v-model="dialogVisible" title="登录账号" width="35%" :before-close="handleClose" align-center center
                    v-if="!isLogin">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="账号登录" name="first">
                            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                                class="loginBox">
                                <el-form-item label="手机号码/账号:" prop="username" style="margin-bottom: ;">
                                    <el-input v-model.number="ruleForm.username" style="width: 200px" />
                                </el-form-item>
                                <el-form-item label="密码:" prop="pass">
                                    <el-input v-model="ruleForm.pass" autocomplete="off" type="password" show-password
                                        style="width: 200px" />
                                </el-form-item>
                                <el-form-item v-if="!registerType" label="请再次输入密码:" prop="checkPass">
                                    <el-input v-model="ruleForm.checkPass" autocomplete="off" type="password" show-password
                                        style="width: 200px" />
                                </el-form-item>
                                <el-form-item v-if="!registerType" label="验证码:" prop="code">
                                    <el-input v-model="ruleForm.code" autocomplete="off" type="text" style="width: 200px">
                                        <template #append>
                                            <el-button size="small">获取验证码</el-button>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitBtnClick" style="margin-right: 5px;">
                                        {{ submitBtn }}</el-button>
                                    <el-button @click="registerBtnClick">{{ registerBtn }}</el-button>
                                </el-form-item>

                            </el-form>

                        </el-tab-pane>

                        <el-tab-pane label="二维码登录" name="second">
                            <div class="QRcode">
                                <img src="../../assets/pic.png" alt="" style="height: 100%;width: 100%;">
                            </div>
                        </el-tab-pane>

                    </el-tabs>


                </el-dialog>
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

.loginBox {
    height: v-bind(loginBoHeight);
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    position: relative;

    .dialog-footer {
        position: absolute;
        bottom: 20px;
        width: 100%;
    }


}

.QRcode {
    width: 200px;
    height: 200px;
    margin: 0 auto;
}



.el-row {
    flex: 1;
    align-items: center;
}
</style>