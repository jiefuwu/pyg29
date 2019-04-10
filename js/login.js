$(function () {

  $('.btnlog').on('tap',function () {
    var data={}
    console.log(111);
  data.username = $('#username').val()
  data.password = $('#password').val()
    if (!/^1[3-9]\d{9}$/.test(data.username)) {
      mui.toast('手机号码输入不正确')
      return false;
  }else if (data.password.length<6) {
      mui.toast('密码输入不正确')
      return false;
  }
  $.ajax({
    type:'post',
    url:'login',
    data:data,
    dataType:'json',
    success:function (result) {
      if (result.meta.status==200) {
        sessionStorage.setItem('pyg_token',result.data.token)
        var re=sessionStorage.getItem('urlname')
        if (re) {
          location.href=re;
        }else{
          location.href='/my_index.html'
        }
      }
      
    }
  })
  })
  
})