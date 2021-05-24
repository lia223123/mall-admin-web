import request from "../../utils/request";



//获取菜单树结构
export function getMenusTree(){
  return request({
    url: "/employeeinfo/v1/menus_tree/",
    method: 'get'
  })
}
//获取菜单信息
export function listMenus(query){
  return request({
    url: "/employeeinfo/v1/menus/",
    method: 'get',
    params: query
  })
}
//获取菜单详细信息
export function getMenus(id){
  return request({
    url: "/employeeinfo/v1/menus/" + id + "/",
    method: 'get'
  })
}

//新增菜单列表
export function addMenus(data){
  return request({
    url: "/employeeinfo/v1/menus/",
    method: 'post',
    data: data
  })
}

//修改菜单信息
export function editMenus(data){
  return request({
    url: "/employeeinfo/v1/menus/"+ data.id + '/',
    method: 'put',
    data: data
  })
}

//删除菜单信息
export function deleteMenus(id){
  return request({
    url: "/employeeinfo/v1/menus/"+ id + '/' ,
    method: 'delete'
  })
}
