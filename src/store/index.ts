import { defineStore } from "pinia";
export const store = defineStore("allStore", {
  state() {
    return {
      isShowFooter: false,
    };
  },
  actions: {
    chageShowFooterType() {
      this.isShowFooter = !this.isShowFooter;
    },
  },
  getters: {},
});
