import request from "../../utils/request";
//查询
export function listComApi(query){
  return request({
    url: '/companys/v1/comapi/',
    method: 'get',
    params: query
  })
}
//获取详细信息
export function getComApi(id){
  return request({
    url: '/companys/v1/comapi/'+ id + '/',
    method: 'get',
  })
}
//增加
export function addComApi(data){
  return request({
    url: '/companys/v1/comapi/',
    method: 'post',
    data: data
  })
}
//修改
export function editComApi(data){
  return request({
    url: '/companys/v1/comapi/'+ data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteComApi(id){
  return request({
    url: '/companys/v1/comapi/' + id + '/',
    method: 'delete'
  })
}
