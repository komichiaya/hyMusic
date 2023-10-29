import instance, { http } from "./ajax";
import { LoginRes } from "./type";
export const userLoginQRCreateKey = () =>
  http.get("/login/qr/key", {
    params: {
      timerstamp: new Date().getTime(),
    },
  });
export const userLoginQR = (key: any) =>
  http.get<LoginRes>("/login/qr/create", {
    params: {
      key,
      qrimg: true,
    },
  });
export const userLoginQRCheck = (
  key: any,
  type: boolean | undefined = undefined
) =>
  http.get("/login/qr/check", {
    params: {
      key,
      timerstamp: new Date().getTime(),
      noCookie: type,
    },
  });
export const getAccount = () => http.get("/user/account");
export const getUserDetail = (uid: string | number) =>
  http.get("/user/detail", {
    params: {
      uid,
    },
  });
export const getUserRefresh = () =>
  http.get("/login/refresh", {
    params: {
      cookie: localStorage.getItem("userCookie"),
    },
  });
export const logout = () => http.get("/logout");

export const getUserSongList = (
  uid: number | string,
  limit: number = 30,
  offset: number = 0
) =>
  http.get("/user/playlist", {
    params: {
      uid,
      limit,
      offset,
    },
  });
export const getUserRecommendResource = () => http.get("/recommend/resource");
export const getUserRecommendSongs = () => http.get("/recommend/songs");

export const getUserSongListInfo = (
  id: number | string,
  limit: number,
  offset: number
) =>
  http.get("/playlist/track/all", {
    params: {
      id,
      limit,
      offset,
    },
  });
export const getUserLikeSongIDList = (uid: string | number) =>
  http.get("/likelist", {
    params: {
      uid,
      timerstamp: new Date().getTime(),
    },
  });
export const setUserLikeSong = (id: string | number, like: boolean) =>
  http.get("/like", {
    params: {
      id,
      like,
      timerstamp: new Date().getTime(),
    },
  });

export const getSongListDetail = (id: number | string) =>
  http.get("/playlist/detail", {
    params: {
      id,
    },
  });
export const getUserFollows = (uid: number | string) =>
  http.get("/user/follows", {
    params: {
      uid,
    },
  });
export const getUserLikeArtists = (limit: number) =>
  http.get("/artist/sublist", {
    params: {
      limit,
      timestamp: new Date().getTime(),
    },
  });

export const getArtistDetail = (id: string | number) =>
  http.get("/artist/detail", {
    params: { id },
  });
export const getArtistTopSong = (id: string | number) =>
  http.get("/artist/top/song", {
    params: {
      id,
    },
  });
export const getArtistAlbumInfo = (id: string | number, limit: number) =>
  http.get("/artist/album", {
    params: {
      id,
      limit,
    },
  });
export const getAlbumDetail = (id: string | number) =>
  http.get("/album", {
    params: {
      id,
    },
  });
