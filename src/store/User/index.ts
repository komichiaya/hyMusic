import { defineStore } from "pinia";
import {
  userLoginQRCheck,
  userLoginQR,
  userLoginQRCreateKey,
  getAccount,
  logout,
} from "@/api";

export const userStore = defineStore("userStore", {
  state: () => {
    return {
      userToken: "",
      QRbase64: "",
      QRkey: "",
      IntervalId: 0,
      loading: true,
      isLogin: false,
      userInfo: {
        code: "",
        userId: "",
        avatarUrl: "",
      },
    };
  },
  actions: {
    async getQRKey() {
      const { data } = await userLoginQRCreateKey();
      const { unikey: key } = data;
      this.QRkey = key;
    },
    async QRLogin(key: string) {
      this.loading = true;
      const {
        data: { qrimg },
      } = await userLoginQR(key);
      this.loading = false;
      this.QRbase64 = qrimg;
    },
    pollingCheckQR() {
      this.IntervalId = setInterval(async () => {
        const res = await userLoginQRCheck(this.QRkey);
        if (res.data === 800) {
          this.getQRKey();
          this.isLogin = false;
        }
        if (res.code === 803) {
          clearInterval(this.IntervalId);
          localStorage.setItem("userCookie", res.cookie);
          this.isLogin = true;
        }
      }, 3000);
    },
    async userLogout() {
      const res = await logout();
      if (res.code == 200) {
        return true;
      }
    },
    async getUserInfo() {
      const res = await getAccount();
      if (res.code == 200) {
        console.log(res);
        this.userInfo = res.profile;
      }
    },
  },
  // gatters: {},
});
