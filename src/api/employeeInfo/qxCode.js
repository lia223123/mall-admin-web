import request from "../../utils/request";

//获取权限Code信息
export function listQXCode(){
  return request({
    url: "/employeeinfo/v1/permission_list/",
    method: 'get',
  })
}
