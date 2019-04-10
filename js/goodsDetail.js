$(function () {
  var info = {
    cat_id: '',
    goods_id: '',
    goods_name: '',
    goods_number: '',
    goods_price: '',
    goods_small_logo: '',
    goods_weight: ''
  }

  var data = {}
  // 获取地址栏中的gid值，然后进行条件获取数据
  var url = location.search.substring(1).split('=')
  data.goods_id = url[1]
mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
  // 请求数据进行页面渲染
  $.ajax({
    type: 'get',
    url: 'goods/detail',
    data: data,
    dataType: 'json',
    success: function (result) {
      info.cat_id = result.data.cat_id
      info.goods_id = result.data.goods_id
      info.goods_name = result.data.goods_name
      info.goods_number = result.data.goods_number
      info.goods_price = result.data.goods_price
      info.goods_small_logo = result.data.goods_small_logo
      info.goods_weight = result.data.goods_weight
      var html = template('csitem', result.data)
      $('#item2 ul').html(html)
      var html2 = template('xqtpitem', result.data)
      $('#item1').html(html2)

      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      
    }
  })



  $('.btn_gwc').on('tap', function () {
    var mytoken = sessionStorage.getItem('pyg_token')
    var obj = JSON.stringify(info)
    // console.log(mytoken);
    // info.token=mytoken;
    // var obj={}
    if (!mytoken) {
      mui.toast('添加失败，需要登陆，正在跳转', { duration: 'long', type: 'div' })
      location.href = "/views/login.html"
      sessionStorage.setItem('urlname', location.href)
    } else {
      $.ajax({
        type: 'post',
        url: 'my/cart/add',
        data: {'info':obj},
        dataType: 'json',
        success: function (result) {
          console.log(result);
          if (result.meta.status == 401) {
            location.href="/views/login.html"
          } else {
              var btnArray = ['是', '否'];
              mui.confirm('是否跳转到购物车页面', '温馨提示', btnArray, function (e) {
                if (e.index == 0) {
                  location.href ="/views/cart.html"
                }
              })

          }
        }
      })
    }
  })

})