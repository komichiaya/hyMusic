import { defineStore } from "pinia";
export const playStore = defineStore("playStore", {
  state: () => {
    return {
      currentRow: -1,
    };
  },
  actions: {
    changeCurrentRow(value: number) {
      this.currentRow = value;
    },
  },
  getters: {},
});
