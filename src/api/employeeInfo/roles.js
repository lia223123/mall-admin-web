import request from "../../utils/request";

//获取角色信息
export function listRoles(query){
  return request({
    url: "/employeeinfo/v1/roles/",
    method: 'get',
    params: query
  })
}
//获取角色详细信息
export function getRoles(id){
  return request({
    url: "/employeeinfo/v1/roles/" + id + "/",
    method: 'get'
  })
}

//新增角色列表
export function addRoles(data){
  return request({
    url: "/employeeinfo/v1/roles/",
    method: 'post',
    data: data
  })
}

//修改角色信息
export function editRoles(data){
  return request({
    url: "/employeeinfo/v1/roles/"+ data.id + '/',
    method: 'put',
    data: data
  })
}

//删除角色信息
export function deleteRoles(id){
  return request({
    url: "/employeeinfo/v1/roles/"+ id + '/' ,
    method: 'delete'
  })
}
