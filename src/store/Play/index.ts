import { defineStore } from "pinia";
import { getSongLyc } from "@/api";
export const playStore = defineStore("playStore", {
  state: () => {
    return {
      currentRow: -1,
      lyricInfo: {
        transUser: {},
        lyricUser: {},
        klyric: {},
        lrc: {
          lyric: "",
        },
        tlyric: {},
        romalrc: {},
      },
    };
  },
  actions: {
    changeCurrentRow(value: number) {
      this.currentRow = value;
    },
    async getSongLyric(id: number | string) {
      const res = await getSongLyc(id);
      if (res.code === 200) {
        this.lyricInfo = {
          transUser: res.transUser,
          lyricUser: res.lyricUser,
          lrc: res.lrc,
          klyric: res.klyric,
          tlyric: res.tlyric,
          romalrc: res.romalrc,
        };
      }
    },
  },
  getters: {},
});
