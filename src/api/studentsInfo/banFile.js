import request from "../../utils/request";
export function getAdFile(query){
  return request({
    url: '/studentsinfo/v1/banFile/',
    method: 'get',
    params: query
  })
}
