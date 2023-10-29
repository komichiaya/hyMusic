import { defineStore } from "pinia";
import { userStore } from "./userInfo";
import { getUserSongList, getUserRecommendSong } from "@/api";
const uS = userStore();
export const userList = defineStore("userList", {
  state: () => {
    return {
      playList_less: [],
      playList: [],
      recommendList: [],
      recommendList_less: [],
    };
  },
  actions: {
    async getUserList(
      uid: number | string,
      limit: number = 30,
      offset: number = 0
    ) {
      const res = await getUserSongList(uid, limit, offset);
      if (res.code === 200) {
        this.playList = res.playlist;
        this.playList_less = res.playlist.slice(1, 6);
      }
    },
    async getUserRecommend() {
      const res = await getUserRecommendSong();
      if (res.code === 200) {
        this.recommendList = res.recommend;
        this.recommendList_less = res.recommend.slice(0, 5);
      }
    },
  },
});
