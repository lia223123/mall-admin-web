import request from "@/utils/request"


export function login(username, password){
  const data = new FormData()
  data.append("username", username);
  data.append("password", password)
   return request({
     url: '/employeeinfo/v1/login/',
     method: 'post',
     data: data
   })
}
//获取用户信息
export function getInfo(){
  return request({
    url: '/employeeinfo/v1/user_roles/' ,
    method: 'get',
  })
}
//获取用户角权限信息
export function getUserPerms(){
  return request({
    url: '/employeeinfo/v1/user_info/',
    method: 'get'
  })
}
//获取用户菜单
export function buildMenu(){
  return request({
    url: '/employeeinfo/v1/build_menus/' ,
    method: 'get',
  })
}
//修改密码
export function setPassword(data) {
  return request({
    url: '/employeeinfo/v1/users/'+ data.id + '/change-passwd/',
    method: 'post',
    data: data
  })
}
