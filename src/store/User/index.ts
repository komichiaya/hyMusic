import { defineStore } from "pinia";
import { userLoginQRCheck, userLoginQR, userLoginQRCreateKey } from "@/api";
import { ElLoading } from "element-plus";
let loadingInstance;

export const userStore = defineStore("userStore", {
  state: () => {
    return {
      userToken: "",
      QRbase64: "",
      QRkey: "",
      IntervalId: "",
      loading: true,
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
        }
        if (res.code === 803) {
          clearInterval(this.IntervalId);
          localStorage.setItem("userCookie", res.cookie);
        }
      }, 3000);
    },
  },
  gatters: {},
});
