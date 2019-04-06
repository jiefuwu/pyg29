$(function () {
  var cateData
  mui('body').on('tap', 'a', function () {
    window.top.location.href = this.href
  })
  render()
  // 进行页面加载渲染
  function render () {
    cateData = JSON.parse(localStorage.getItem('pyg_cate'))
    if (cateData && Date.now() - cateData.time < 60 * 60 * 1000) {
      leftList()
      rightList(0)
    }else {
      getcate()
    }
  }
  // 发送ajax请求获取数据
  function getcate () {
    $.get('categories', function (result) {
      // 判断请求状态码是否正确
      if (result.meta.status == 200) {
        // 给自定义的全局变量赋值
        // 获取数据的data内容
        // 当前时间
        cateData = {
          'data': result.data,
          time: Date.now()
        }
        // 进行本地储存数据
        localStorage.setItem('pyg_cate', JSON.stringify(cateData))
        // 进行页面的内容模块渲染
        // leftList()
        // rightList(0)
        render()
      }
    }, 'json')
  }

  // 渲染左边分类
  function leftList () {
    var html = template('fication', cateData)
    $('.leftlist').html(html)
    // 元素滚动初始化
    var myScroll = new IScroll('.left')
    tapceta(myScroll)
  }

  // 左边单击事件
  function tapceta (myScroll) {
    // 移动端单击事件。给a进行事件委托给类名leftlist
    $('.left .leftlist').on('tap', 'a', function () {
      // 给当前元素添加类名active，其他兄弟元素移除
      $(this).addClass('active').siblings().removeClass('active')
      // 进行元素置顶 iscroll中指示器里面的
      myScroll.scrollToElement(this)
      rightList($(this).index())
    })
  }

  // 渲染右边分类
  function rightList (index) {
    // 进行动态渲染页面
    var html = template('rightdata', cateData.data[index])
    $('.rightda').html(html)
    // 判断图片是否加载完毕。加载完毕后再进行滚动事件初始化
    var imgs = $('.rightda img').length
    $('.rightda img').on('load', function () {
      imgs--
      if (imgs == 0) {
        var myScroll = new IScroll('.right')
      }
    })
  }
})
