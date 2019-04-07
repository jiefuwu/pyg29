$(function () {
  $('.mui-pull-right').on('tap', function () {
    mui('.mui-off-canvas-wrap').offCanvas('show');
  })
  // mui('.mui-scroll-wrapper').scroll({
  //   deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  // });
  var data = {
    cid: getParameter(location.search).cid,
    pagenum: 1,
    pagesize: 10
  }
  // 拆分url地址拼接信息
  function getParameter(url) {
    var obj = {}
    url = url.substring(1)
    var arr = url.split('&')
    for (var i = 0; i < arr.length; i++) {
      var temp = arr[i].split('=')
      obj[temp[0]] = temp[1]
    }
    return obj
  }
  
  function request(callback,obj) {
    $.ajax({
      type: 'get',
      url: 'goods/search',
      data: data,
      dataType: 'json',
      success: callback
    })
  }

  mui.init({
    swipeBack: false,
    pullRefresh: {
      container: "#refreshContainer",
      //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
      up: {
        height: 50, //可选.默认50.触发上拉加载拖动距离
        auto: false, //可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          data.pagenum++
          request(function (result) {
            if (result.data.goods.length > 0) {
              var html = template('goodslits', result.data)
              $('.mui-table-view-chevron').append(html)
              mui('#refreshContainer').pullRefresh().endPullupToRefresh();
            } else {
              mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
            }
          })

        }
      },
      down: {
        height: 50, //可选.默认50.触发上拉加载拖动距离
        auto: true, //可选,默认false.自动上拉加载一次
        contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        // 下面这个回调函数在下拉松开手指之后会触发
        callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          data.pagenum = 1;
          request(function (result) {
            var html = template('goodslits', result.data)
            $('.mui-table-view-chevron').html(html)
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            mui('#refreshContainer').pullRefresh().refresh(true)
          })
        }
      }
    }
  })

  $('.btn_sbm').on('tap',function () {
    var obj={}
    obj.query = $('.text_sbm').val()
    request(function (result) {
      console.log(result.data);
      var html = template('searchitem', result.data)
      $('.search').html(html)
    },obj)
  })
})