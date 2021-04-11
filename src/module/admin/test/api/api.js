import http from '@/utils/httpUtil'
const qs = require('qs');



export const javaLearnMap = () => {
  return http.requestQuickGet(`/api/fastinjava-application-base/v/vv/java_learn_map`)
}
export const listBlog = (reload) => {
  return http.requestPost(`/api/fastdevelopinjava-service-blog/blog/list`,reload)
}
export const saveBlog = (reload) => {
  return http.requestPost(`/api/fastdevelopinjava-service-blog/blog/save`,reload)
}
