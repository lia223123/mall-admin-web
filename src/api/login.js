import request from "@/utils/request"

export function login(username, password){
  const data = new FormData()
  data.append("username", username);
  data.append("password", password)
   return request({
     url: '/employeeinfo/v1/loginUser/',
     method: 'post',
     data: data
   })
}
export function getInfo(id){
  return request({
    url: '/employeeinfo/v1/userInfo/' + id +'/',
    method: 'get',
  })
}
