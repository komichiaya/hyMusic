<script setup lang='ts'>
import type { FormInstance, FormRules, TabsPaneContext } from 'element-plus'
// import { fa } from 'element-plus/es/locale';
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
import { MutationType } from 'pinia'
import { userStore } from "@/store/User/userInfo"

const route = useRoute()
const router = useRouter();
const submitBtn = ref("登录")
const registerBtn = ref('注册')
const registerType = ref(true)// true:注册 false:登录
const loginBoHeight = ref('200px')
const QRtype = ref(false)
const dialogVisible = ref(false)
const isLogin = ref(false)
const activeName = ref('first')
const submitType = ref(true)
const uS = userStore()
const offlineAvatar = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
const dialogCloseType = ref(false)
uS.$subscribe((mutation: any, state: any) => {
    if (state.isLogin && dialogVisible.value) {
        dialogVisible.value = false
        isLogin.value = true
        uS.getUserInfo()
        ElMessage({
            showClose: true,
            message: '登录成功',
            type: 'success',
        })


    }
})
const handleClick = async (tab: TabsPaneContext, event: Event) => {
    if (tab.props.label === '二维码登录') {
        QRtype.value = true
        await uS.getQRKey()
        uS.QRLogin(uS.QRkey)
    } else {
        QRtype.value = false
    }
}


const handleClose = () => {
    dialogVisible.value = false
    clearInterval(uS.IntervalId)
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

onMounted(() => {
    const userToken = JSON.stringify(localStorage.getItem('userCookie'))
    if (userToken != 'null') {
        isLogin.value = true
        uS.getUserInfo()
    } else {
        isLogin.value = false
    }
})
const submitBtnClick = () => {
    submitForm(ruleFormRef.value)
    isLogin.value = true
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
const refreshQR = async () => {
    await uS.getQRKey()
    uS.QRLogin(uS.QRkey)
    uS.pollingCheckQR()
}
watch([route, registerType, QRtype, dialogCloseType],
    ([p, t, Q, dt], [preP, preT, preQ, preDT]) => {
        loginBoHeight.value = t ? "200px" : "250px"
        if (Q) {
            uS.pollingCheckQR()
        } else {
            clearInterval(uS.IntervalId)

        }

    })
const login = () => {
    if (!isLogin.value) {
        dialogVisible.value = true
    } else {
        router.push({
            name: "User",
            params: {
                id: uS.userInfo.userId
            }
        })
    }
}
</script>
<template>
    <div>
        <el-avatar :src="isLogin ? uS.userInfo.avatarUrl : offlineAvatar" @click="login" style="cursor: pointer;" />
    </div>
    <el-dialog v-model="dialogVisible" title="登录账号" width="35%" :before-close="handleClose" align-center center
        destroy-on-close v-if="!isLogin" @close="() => dialogCloseType = true" @open="() => dialogCloseType = false">
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
                    <!-- <img > -->
                    <el-image :src="uS.QRbase64" alt="QRCode" title='点击刷新二维码' style="height: 100%;width: 100%;"
                        v-loading="uS.loading" @click='refreshQR'>

                        <template #error>
                            <div class="image-slot">
                                <el-icon><icon-picture /></el-icon>
                            </div>
                        </template>
                    </el-image>
                </div>
            </el-tab-pane>

        </el-tabs>


    </el-dialog>
</template>

<style scoped lang='less'>
/* @import url(); 引入css类 */
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
</style>@/store/User/userInfo