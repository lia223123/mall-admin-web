import request from "@/utils/request";
export function getStuFile(query){
  return request({
    url: '/studentsinfo/v1/stuFile/',
    method: 'get',
    params: query
  })
}
