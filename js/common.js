$(function () {
  // 定义一个不可变变量。用来储存拼接路径的前部分
  const baseURL = 'http://157.122.54.189:9094/api/public/v1/'
  // 添加zepto拦截器，每个ajax请求都要经过拦截器
  // beforeSend是请求发送时处理事件
  $.ajaxSettings.beforeSend=function (xhr,obj) {
    // xhr是异步对象
    // console.log(xhr);
    // obj是请求对象.内包含发送到服务器的请求的数据
    // console.log(obj);
    // 把请求对象中的路径进行拼接后重新赋值
    obj.url=baseURL+obj.url
  }
  $.ajaxSettings.complete=function () {
    
  }
})