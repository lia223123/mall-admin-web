import request from "../../utils/request";

export function listFileCompany(query){
  return request({
    url: '/filemanage/v1/fileCompany/',
    method: 'get',
    params: query
  })
}
export function getFileCompany(id){
  return request({
    url: '/filemanage/v1/fileCompany/'+ id + '/',
    method: 'get',
  })
}
export function addFileCompany(data){
  return request({
    url: '/filemanage/v1/fileCompany/',
    method: 'post',
    data: data
  })
}
export function editFileCompany(data){
  return request({
    url: '/filemanage/v1/fileCompany/'+ data.id +'/',
    method: 'put',
    data: data
  })
}
export function deleteFileCompany(id){
  return request({
    url: '/filemanage/v1/fileCompany/'+ id +'/',
    method: 'delete',
  })
}
