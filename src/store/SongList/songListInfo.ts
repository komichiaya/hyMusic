import { defineStore } from "pinia";
import {
  getUserSongListInfo,
  getUserLikeSongIDList,
  setUserLikeSong,
  getSongListDetail,
} from "@/api";
type songListType = {
  id: number;
  al: {
    picUrl: string;
    name: string;
  };
  name: string;
  ar: [
    {
      name: string;
      id: number;
    }
  ];
  dt: number;
};
export const songListInfo = defineStore("songListInfo", {
  state: () => {
    const songList: songListType[] = [];
    const likeSongIDList: number[] = [];
    const songListDetail = {};
    return {
      songList,
      likeSongIDList,
      songListDetail,
    };
  },
  actions: {
    async getSongListAllSongs(
      id: number | string,
      limit: number = 10,
      offset: number = 0
    ) {
      const res = await getUserSongListInfo(id, limit, offset);
      if (res.code == 200) {
        this.songList = res.songs;
      }
    },
    async getLikeSongIDList(uid: number | string) {
      const res = await getUserLikeSongIDList(uid);
      if (res.code == 200) {
        this.likeSongIDList = res.ids;
      }
    },
    async setLikeSont(id: string | number, like: boolean) {
      const res = await setUserLikeSong(id, like);
    },
    async getSongListInfo(id: number | string) {
      const res = await getSongListDetail(id);
      if (res.code == 200) {
        this.songListDetail = res.playlist;
      }
    },
  },
});
