import http from '@/utils/httpUtil'
const qs = require('qs');

export const list = (reload) => {
  return http.requestPost(`/api/fastinjava-application-base/oauth/info/list`,reload)
}

export const insert = (reload) => {
  return http.requestPost(`/api/fastinjava-application-base/oauth/info/insert`,reload)
}
export const grantClientApi = (reload) => {
  return http.requestPost(`/api/fastinjava-application-base/oauth/info/grantClientApi`,reload)
}



// export const update = (reload) => {
//   return http.requestPost(`/api/fastinjava-application-base/org/update`,reload)
// }
//
export const insertSelective = (reload) => {
  return http.requestPost(`/api/fastinjava-application-base/apiinfo/insertSelective`,reload)
}

export const listAllApplication = (reload) => {
  return http.requestPost(`/api/fastinjava-application-base/app/list`,reload)
}

//
export const listAllApiBaseInfo = (reload) => {
  return http.requestPost(`/api/fastinjava-application-base/v/vv/listApi`,reload)
}
// export const album_deleteOne = (albumId) => {
//   return http.requestPost(`/api/album_manage/album/deleteOne/` + albumId,{})
// }
// export const album_findOne = (albumId) => {
//   return http.requestQuickGet(`/api/album_manage/album/findOne/` + albumId)
// }
// export const album_saveAlbumContent = (reload) => {
//   return http.requestPost(`/api/album_manage/album/saveAlbumContent`,reload)
// }
//
// export const album_chapterSaveOne = (reload) => {
//   return http.requestPost(`/api/album_manage/chapter/saveOne`,reload)
// }
// export const album_chapterTree = (id) => {
//   return http.requestQuickGet(`/api/album_manage/chapter/findChapterTree/${id}`)
// }
// export const album_chapterSaveContent = (reload) => {
//   return http.requestPost(`/api/album_manage/chapter/saveContent`,reload)
// }
// export const album_chapterContent = (id) => {
//   return http.requestQuickGet(`/api/album_manage/chapter/content/${id}`)
// }
// export const album_chapterFindOne = (id) => {
//   return http.requestQuickGet(`/api/album_manage/chapter/findOne/${id}`)
// }
