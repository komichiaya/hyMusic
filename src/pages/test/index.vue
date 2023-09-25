<!--  -->
<script setup lang="ts">
import { getCode, login } from '@/api/index';
const username = ref("")
const password = ref("")
const code = ref("");
const codeSrc = ref("");
const wlanuserip = "10.110.75.19";
const wlanacip = "183.56.17.19";
const setCode = async () => {
    const res = await getCode()
    codeSrc.value = URL.createObjectURL(res.data)

}
setMaxDigits(200);
const key = new RSAKeyPair(
    "10001",
    "",
    "b2867727e19e1163cc084ea57b9fa8406a910c6703413fa7df96c1acdca7b983a262e005af35f9485d92cd4c622eca4a14d6fd818adca5cae73d9d228b4ef05d732b41fb85f80af578a150ebd9a2eb5ececb853372ca4731ca1c8686892987409be3247f9b26cae8e787d8c135fc0652ec0678a5eda0c3d95cc1741517c0c9c3"
);
const loginKey = encryptedString(
    key,
    '{"userName":"' +
    username.value +
    '","password":"' +
    password.value +
    '","rand":"' +
    code.value +
    '"}'
);
const toLogin = async () => {
    const res = await login({
        loginKey,
        wlanuserip,
        wlanacip
    })
    console.log(res)

}
</script>
<template>
    <div class="m">
        <div class="input">
            <el-input v-model="username" placeholder="请输入内容" />
            <el-input v-model="password" placeholder="请输入内容" type="password" />
            <el-input v-model="code" placeholder="验证码" />
        </div>
        <div class="code">
            <el-image :src="codeSrc" />
            <el-button type="primary" @click="setCode">获取验证码</el-button>
        </div>
        <div class="login">
            <el-button type="primary" @click="toLogin">登录</el-button>
        </div>
    </div>

</template>

<style scoped lang="less">
/* @import url(); 引入css类 */


.m {
    width: 960px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .el-input {
        width: 200px;
    }
}
</style>