import request from "../../utils/request";
export function getLeFile(query){
  return request({
    url: '/studentsinfo/v1/leFile/',
    method: 'get',
    params: query
  })
}
