$(function () {
  mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  
  $.ajax({
    type:'get',
    url:'my/cart/all',
    dataType:'json',
    success:function (result) {
      var html=template('spid_item',{list:JSON.parse(result.data.cart_info)}) 
      $('.pyg_order').html(html)
      mui('.pyg_userNum').numbox()
      jgjs()
    }
  })
  // 点击编辑事件
  $('.btn_bj').on('tap',function () {
    $('body').toggleClass('classes')
    
    if ($(this).text()=='编辑') {
      $(this).text('完成')
    }else{
      $(this).text('编辑')
      // 进行数据库的更新
      getzjg($('.wsdl'))
    }
    
  })
  // 封装函数实现编辑功能
  function getzjg(allList) {
    // 创建一个变量用来储存所有的商品信息
    var list_obj={}
    // 循环所有类名是wsdl的元素
    for(var i=0;i<allList.length;i++){
      // 创建变量储存每个类是wsdl的自定义属性的值
      var data = $(allList[i]).data('orve')
      // 获取当前循环的后代元素id是text的value值（商品的数量）
      data.amount = $(allList[i]).find('#test').val()
      // 将循环的数据以键 = 值得形式储存到list_obj中
      list_obj[data.goods_id]=data
    }
    // 发送ajax请求进行数据的更新（同步）
    $.ajax({
      type:'post',
      url:'my/cart/sync',
      data: { 'infos': JSON.stringify(list_obj)},
      dataType:'json',
      success:function (result) {
        mui.toast('编辑成功')
      }
    })
  }
  // 封装实现计算购物车商品总价格
  function jgjs() {
    // 创建一个变量
    var num=0;
    var arr = $('.wsdl')
    // 循环所有的类是wsdl的元素
    arr.each(function (index,value) {
      // 获取储存在自定义属性中的商品价格
      var price = $(value).data('orve').goods_price
      // 获取当前循环的后代元素id是text的value值（商品的数量）
      var am = $(value).find('#test').val()
      // 进行计算总价格
      num += price * am
    })
    // 进行赋值
    $('.pyg_ygczj').text(num)
  }
  // 添加商品数量加减按钮的事件
  $('.pyg_order').on('tap','.pyg_userNum .mui-btn',function () {
    // 进行重新计算总价格
    jgjs()
  })

  $('.btn_sc').on('tap',function () {
    var arrs=$('#swa:checked').parents('.wsdl')
    var allList=$('.wsdl')
    var nnu={}
    for (var i = 0; i < allList.length; i++) {
      data = $(allList[i]).data('orve')
      data.amount = $(allList[i]).find('#test').val()
      nnu[data.goods_id] = data
    }
    console.log(nnu);
    arrs.each(function (index,value) {
      console.log($(value).data('orve').goods_id);
      delete nnu[$(value).data('orve').goods_id]
    })
    $.ajax({
      type: 'post',
      url: 'my/cart/sync',
      data: { 'infos': JSON.stringify(nnu) },
      dataType: 'json',
      success: function (result) {
        mui.toast('编辑成功')
        $.ajax({
          type: 'get',
          url: 'my/cart/all',
          dataType: 'json',
          success: function (result) {
            var html = template('spid_item', { list: JSON.parse(result.data.cart_info) })
            $('.pyg_order').html(html)
            mui('.pyg_userNum').numbox()
            jgjs()
          }
        })
      }
    })
  })
})