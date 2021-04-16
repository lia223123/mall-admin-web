export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

//性别转换
export function formatSex(num){
  switch (num){
    case 1: return '男'
    case 2: return '女'
  }
}
//员工类型
export function formatUserType(num) {
  switch (num) {
    case 1: return '普通员工'
    case 2: return '财务'
    case 3: return '管理员'
    case 4: return '超级管理员'
  }
}
//学生学历
export function stu_educations(num) {
  switch (num){
    case 1: return '无'
    case 2: return '小学'
    case 3: return '初中'
    case 4: return '高中'
    case 5: return '专科'
    case 6: return '本科'
    case 7: return '硕士'
    case 8: return '博士'
    default: return '无'
  }
}
//人员类别
export function stu_personnel(num){
  switch (num){
    case 1: return "贫困家庭子女"
    case 2: return "贫困劳动力"
    case 3: return "失业人员"
    case 4: return "城乡未继续升学初高中毕业生"
    case 5: return "农村转移就业劳动力"
    case 6: return "转岗职工"
    case 7: return "残疾人"
    case 8: return "退役军人"
    default: return "无"
  }
}
//医疗信息
export function InsureType(num){
  switch (num) {
    case 1: return "无"
    case 2: return "养老"
    case 3: return "失业人员"
    case 4: return "医疗"
    case 5: return "失业"
    case 6: return "工伤"
    default: return "无"
  }
}
//是否
export function isNot(num){
  switch (num) {
    case 1: return "是"
    case 2: return "否"
  }
}
//班级性质
export function banjiType(num){
  switch (num) {
    case 1: return "政府补贴班"
    case 2: return "社招班"
  }
}
