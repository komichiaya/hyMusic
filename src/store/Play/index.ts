import { defineStore } from "pinia";
import { getSongLyc, getSongDetail, getSongUrlNew, getSongUrl } from "@/api";
interface SongInfoType {
  url: string;
}
interface audioType {
  currentTime: number;
  volume: number;
  play: Function;
  src: string;
}
export const playStore = defineStore("playStore", {
  state: () => {
    const songsInfo: Array<SongInfoType> = [];
    const newSongsInfo: Array<SongInfoType> = [];
    const oldSongsInfo: Array<SongInfoType> = [];
    const audio: audioType = {
      currentTime: 0,
      volume: 0.5,
      play: () => {},
      src: "",
    };
    const newAudio: audioType = {
      currentTime: 0,
      volume: 0.5,
      play: () => {},
      src: "",
    };
    const oldAudio: audioType = {
      currentTime: 0,
      volume: 0.5,
      play: () => {},
      src: "",
    };
    const historyList: any = [];
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
      songs: [],
      play: {
        stop: () => {},
      },
      songsInfo,
      newSongsInfo,
      oldSongsInfo,
      audio,
      newAudio,
      oldAudio,
      isPlay: false,
      pushHistoryList: false,
      historyList,
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
    async getSongInfo(ids: number | number[]) {
      const res = await getSongDetail(ids);
      if (res.code === 200) {
        this.songs = res.songs;
      }
    },
    async getUrl(
      id: string | number,
      br?: number,
      level?: string,
      type?: string
    ) {
      const res = await getSongUrlNew(id, level);
      switch (type) {
        case "new":
          if (res.code === 200) {
            this.newSongsInfo = res.data;
          } else {
            const res = await getSongUrl(id, br);
            if (res.code === 200) {
              this.newSongsInfo = res.data;
            }
          }
          break;
        case "old":
          if (res.code === 200) {
            this.oldSongsInfo = res.data;
          } else {
            const res = await getSongUrl(id, br);
            if (res.code === 200) {
              this.oldSongsInfo = res.data;
            }
          }
          break;
        default:
          if (res.code === 200) {
            this.songsInfo = res.data;
          } else {
            const res = await getSongUrl(id, br);
            if (res.code === 200) {
              this.songsInfo = res.data;
            }
          }
          break;
      }
    },
  },
  getters: {},
});
