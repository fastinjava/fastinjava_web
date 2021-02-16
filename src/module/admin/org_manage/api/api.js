import http from '@/utils/httpUtil'
const qs = require('qs');

export const listTree = (reload) => {
  return http.requestPost(`/api/fastinjava-application-base/org/tree`,reload)
}
export const album_saveOne = (reload) => {
  return http.requestPost(`/api/album_manage/album/saveOne`,reload)
}
export const album_deleteOne = (albumId) => {
  return http.requestPost(`/api/album_manage/album/deleteOne/` + albumId,{})
}
export const album_findOne = (albumId) => {
  return http.requestQuickGet(`/api/album_manage/album/findOne/` + albumId)
}
export const album_saveAlbumContent = (reload) => {
  return http.requestPost(`/api/album_manage/album/saveAlbumContent`,reload)
}

export const album_chapterSaveOne = (reload) => {
  return http.requestPost(`/api/album_manage/chapter/saveOne`,reload)
}
export const album_chapterTree = (id) => {
  return http.requestQuickGet(`/api/album_manage/chapter/findChapterTree/${id}`)
}
export const album_chapterSaveContent = (reload) => {
  return http.requestPost(`/api/album_manage/chapter/saveContent`,reload)
}
export const album_chapterContent = (id) => {
  return http.requestQuickGet(`/api/album_manage/chapter/content/${id}`)
}
export const album_chapterFindOne = (id) => {
  return http.requestQuickGet(`/api/album_manage/chapter/findOne/${id}`)
}
