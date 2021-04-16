import request from "../../utils/request";
//查询
export function listRsjInfo(query){
  return request({
    url: '/companys/v1/rsj_info/',
    method: 'get',
    params: query
  })
}
//获取详细信息
export function getRsjInfo(id) {
  return request({
    url: '/companys/v1/rsj_info/' + id + '/',
    method: 'get'
  })
}
//增加
export function addRsjInfo(data) {
  return request({
    url: '/companys/v1/rsj_info/',
    method: 'post',
    data: data
  })
}
//修改
export function editRsjInfo(data) {
  return request({
    url: '/companys/v1/rsj_info/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteRsjInfo(id) {
  return request({
    url: '/companys/v1/rsj_info/' + id + '/',
    method: 'delete'
  })
}
