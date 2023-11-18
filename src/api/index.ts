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
export const userStatus = () =>
  http.get("/login/status", {
    params: {
      timerstamp: new Date().getTime(),
    },
  });
export const logout = () => http.get("/logout");

export const getUserSongList = (
  uid: number | string,
  limit: number,
  offset: number
) =>
  http.get("/user/playlist", {
    params: {
      uid,
      limit,
      offset,
    },
  });
export const getUserSubcount = () => http.get("/user/subcount");
export const getUserRecommendResource = () => http.get("/recommend/resource");
export const getUserRecommendSongs = () => http.get("/recommend/songs");
export const getRecommendPlaylist = (limit: number) =>
  http.get("/personalized", {
    params: {
      limit,
    },
  });
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
export const getSongDetail = (ids: number | number[]) =>
  http.get("/song/detail", {
    params: {
      ids,
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

//
export const getSongLyc = (id: string | number) =>
  http.get("/lyric", {
    params: {
      id,
    },
  });
export const getSongUrl = (id: string | number, br: number = 999000) =>
  http.get("/song/url", {
    params: {
      id,
      br,
    },
  });
export const getSongUrlNew = (
  id: string | number,
  level: string = "standard "
) => http.get("/song/url/v1", { params: { id, level } });
export const getSearchHot = () => http.get("/search/hot");
export const getSearchHotDetaile = () => http.get("/search/hot/detail");
export const getSearchDefault = () => http.get("/search/default");
export const getSearch = (
  keywords: string,
  limit: number = 30,
  type: number = 1
) =>
  http.get("/search", {
    params: {
      keywords,
      limit,
      type,
    },
  });
export const getCloudSearch = (
  keywords: string,
  limit: number = 30,
  type: number = 1
) =>
  http.get("/cloudsearch", {
    params: {
      keywords,
      limit,
      type,
    },
  });
export const getSearchMultimatch = (keywords: string) =>
  http.get("/search/multimatch", {
    params: {
      keywords,
    },
  });
