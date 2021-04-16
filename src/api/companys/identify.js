import request from "../../utils/request";
//查询
export function listIdentify(query){
  return request({
    url: '/companys/v1/identify/',
    method: 'get',
    params: query
  })
}
//获取详细信息
export function getIdentify(id) {
  return request({
    url: '/companys/v1/identify/' + id + '/',
    method: 'get'
  })
}
//增加
export function addIdentify(data) {
  return request({
    url: '/companys/v1/identify/',
    method: 'post',
    data: data
  })
}
//修改
export function editIdentify(data) {
  return request({
    url: '/companys/v1/identify/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteIdentify(id) {
  return request({
    url: '/companys/v1/identify/' + id + '/',
    method: 'delete'
  })
}
