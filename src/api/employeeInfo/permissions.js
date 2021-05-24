import request from "../../utils/request";


//获取权限树结构
export function getpermissionsTree(){
  return request({
    url: "/employeeinfo/v1/permissions_tree/",
    method: 'get'
  })
}
//获取权限信息
export function listpermissions(query){
  return request({
    url: "/employeeinfo/v1/permissions/",
    method: 'get',
    params: query
  })
}
//获取权限详细信息
export function getpermissions(id){
  return request({
    url: "/employeeinfo/v1/permissions/" + id + "/",
    method: 'get'
  })
}

//新增权限列表
export function addpermissions(data){
  return request({
    url: "/employeeinfo/v1/permissions/",
    method: 'post',
    data: data
  })
}

//修改权限信息
export function editpermissions(data){
  return request({
    url: "/employeeinfo/v1/permissions/"+ data.id + '/',
    method: 'put',
    data: data
  })
}

//删除权限信息
export function deletepermissions(id){
  return request({
    url: "/employeeinfo/v1/permissions/"+ id + '/' ,
    method: 'delete'
  })
}
