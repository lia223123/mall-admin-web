import request from "../../utils/request";

//获取员工信息
export function listEmployee(query){
  return request({
    url: "/employeeinfo/v1/userInfo/",
    method: 'get',
    params: query
  })
}
//获取员工详细信息
export function getEmployee(id){
  return request({
    url: "/employeeinfo/v1/userInfo/" + id + "/",
    method: 'get'
  })
}

//新增员工列表
export function addEmployee(data){
  return request({
    url: "/employeeinfo/v1/userInfo/",
    method: 'post',
    data: data
  })
}

//修改员工信息
export function editEmployee(data){
  return request({
    url: "/employeeinfo/v1/userInfo/"+ data.id + '/',
    method: 'put',
    data: data
  })
}

//删除员工信息
export function deleteEmployee(id){
  return request({
    url: "/employeeinfo/v1/userInfo/"+ id + '/' ,
    method: 'delete'
  })
}
