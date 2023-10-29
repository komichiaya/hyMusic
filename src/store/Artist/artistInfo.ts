import { defineStore } from "pinia";
import {
  getArtistDetail,
  getArtistTopSong,
  getArtistAlbumInfo,
  getAlbumDetail,
} from "@/api";
export const articInfoState = defineStore("articInfo", {
  state: () => {
    const topSong: [] = [];
    const hotAlbums: [] = [];
    const albumInfo = { songs: [], album: {} };
    return {
      artistDetail: {
        artist: {},
      },
      topSong,
      hotAlbums,
      albumInfo,
    };
  },
  actions: {
    async getArtistInfo(id: string | number) {
      const res = await getArtistDetail(id);
      if (res.code === 200) {
        this.artistDetail = res.data;
      }
    },
    async getArtistHotSong(id: string | number) {
      const res = await getArtistTopSong(id);
      if (res.code === 200) {
        this.topSong = res.songs;
      }
    },
    async getArtistAlbum(id: string | number, limit: number) {
      const res = await getArtistAlbumInfo(id, limit);
      if (res.code === 200) {
        this.hotAlbums = res.hotAlbums;
      }
    },
    async getAlbumInfo(id: string | number) {
      const res = await getAlbumDetail(id);
      if (res.code === 200) {
        this.albumInfo.songs = res.songs;
        this.albumInfo.album = res.album;
      }
    },
  },
});
