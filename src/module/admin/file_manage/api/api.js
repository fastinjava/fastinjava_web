import http from '@/utils/httpUtil'
const qs = require('qs');

export const listAllFileGroup  = (reload) =>{
  return http.requestPost(`/api/fastdevelopinjava-service-filesystem/file_group/listall`,reload);
}
export const saveFileGroup  = (reload) =>{
  return http.requestPost(`/api/fastdevelopinjava-service-filesystem/file_group/save`,reload);
}
export const listallfileinfo  = (reload) =>{
  return http.requestQuickGet(`/api/fastdevelopinjava-service-filesystem/file_info/listall`,reload);
}
export const detailFileinfo  = (fileId) =>{
  return http.requestQuickGet(`/api/fastdevelopinjava-service-filesystem/file_info/detail?fileId=${fileId}`);
}
