import { defineStore } from "pinia";
import {
  getUserSongList,
  getUserRecommendResource,
  getUserRecommendSongs,
} from "@/api";
export const userList = defineStore("userList", {
  state: () => {
    return {
      playList_less: [],
      playList: [],
      recommendSongs: [],
      recommendList: [],
      recommendList_less: [],
      myFm: {},
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
      const res = await getUserRecommendResource();
      if (res.code === 200) {
        this.recommendList = res.recommend;
        this.recommendList_less = res.recommend.slice(1, 6);
        this.myFm = res.recommend[0];
      }
    },
    async getUserRecommendSongsList() {
      const res = await getUserRecommendSongs();
      if (res.code === 200) {
        this.recommendSongs = res.data.dailySongs;
      }
    },
  },
});
