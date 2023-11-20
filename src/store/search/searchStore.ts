import { defineStore } from "pinia";
import { getCloudSearch, getSearch } from "@/api";
export const SearchStroe = defineStore("SearchStroe", {
  state: () => {
    const searchResList: any[] = [];
    const searchList: any[] = [];

    return {
      searchList,
      searchResList,
    };
  },
  actions: {
    async getSearchList(
      keywords: string,
      limit: number = 30,
      type: number = 1
    ) {
      const res = await getCloudSearch(keywords, limit, type);
      if (res.code === 200) {
        switch (type) {
          case 1:
            const { songs, songCount } = res.result;
            this.searchResList = songs;
            break;
          case 10:
            const { albums, albumCount } = res.result;
            this.searchResList = albums;
            break;
          case 100:
            const { artists } = res.result;
            this.searchResList = artists;
            break;
          case 1000:
            const { playlists, playlistCount } = res.result;
            this.searchResList = playlists;
            break;
        }
      }
    },
    async getSearchMore(
      keywords: string,
      limit: number = 30,
      type: number = 1
    ) {
      const res = await getSearch(keywords, limit, type);
      if (res.code === 200) {
        switch (type) {
          case 1018:
            const { song, playList, artist, album, user } = res.result;
            const list = [song, artist, playList, album, user];
            this.searchList = list;
            break;
          case 1:
            const { songs, songCount } = res.result;
            this.searchResList = songs;
            break;
          case 10:
            const { albums, albumCount } = res.result;
            this.searchResList = albums;
            break;
          case 100:
            const { artists } = res.result;
            this.searchResList = artists;
            break;
          case 1000:
            const { playlists, playlistCount } = res.result;
            this.searchResList = playlists;

            break;
        }
      }
    },
  },
});
