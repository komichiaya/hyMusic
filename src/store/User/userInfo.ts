import { defineStore } from "pinia";
import {
  userLoginQRCheck,
  userLoginQR,
  userLoginQRCreateKey,
  getAccount,
  logout,
  getUserFollows,
  getUserLikeArtists,
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
      userFollows: [],
      followArtists: [],
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
    pollingCheckQR(type: boolean | undefined = undefined) {
      clearInterval(this.IntervalId);
      this.IntervalId = setInterval(async () => {
        const res = await userLoginQRCheck(this.QRkey, type);
        if (res.data === 800) {
          this.getQRKey();
          this.isLogin = false;
        }
        if (res.code === 803) {
          clearInterval(this.IntervalId);
          localStorage.setItem("userCookie", res.cookie);
          this.isLogin = true;
        }
        if (res.code === 502) {
          clearInterval(this.IntervalId);
          this.pollingCheckQR(true);
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
        if (res.profile) {
          this.userInfo = res.profile;
          return true;
        } else {
          return false;
        }
      }
    },
    async getFollowsFriend(uid: string | number) {
      const res = await getUserFollows(uid);
      if (res.code === 200) {
        this.userFollows = res.follow;
      }
    },
    async getUserFollowArt(limit: number) {
      const res = await getUserLikeArtists(limit);
      if (res.code === 200) {
        this.followArtists = res.data;
      }
    },
  },
  // gatters: {},
});
