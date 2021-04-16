import request from "../../utils/request";
//查询
export function listFileManage(query){
  return request({
    url: '/filemanage/v1/get_file_resource/',
    method: 'get',
    params: query
  })
}
//获取详细信息
export function getFileManage(id) {
  return request({
    url: '/filemanage/v1/get_file_resource/' + id + '/',
    method: 'get'
  })
}
//增加
export function addFileManage(data) {
  return request({
    url: '/filemanage/v1/get_file_resource/',
    method: 'post',
    data: data
  })
}
//修改
export function editFileManage(data) {
  return request({
    url: '/filemanage/v1/get_file_resource/' + data.id + '/',
    method: 'put',
    data: data
  })
}
//删除
export function deleteFileManage(id) {
  return request({
    url: '/filemanage/v1/get_file_resource/' + id + '/',
    method: 'delete'
  })
}
