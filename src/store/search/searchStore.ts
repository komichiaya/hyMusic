import { defineStore } from "pinia";
import { getCloudSearch, getSearch } from "@/api";
export const SearchStroe = defineStore("SearchStroe", {
  state: () => {
    const searchResList: any[] = [];
    return {
      searchList: [],
      searchResList,
    };
  },
  actions: {
    async getSearList(keywords: string) {
      const res = await getCloudSearch(keywords);
      if (res.code === 200) {
      }
    },
    async getSearchMore(
      keywords: string,
      limit: number = 30,
      type: number = 1
    ) {
      const res = await getSearch(keywords, limit, type);
      if (res.code === 200) {
        if (type === 1018) {
          const { song, playList, artist, album, user } = res.result;
          const list = [song, artist, playList, album, user];
          this.searchResList = list;
        }
      }
    },
  },
});
