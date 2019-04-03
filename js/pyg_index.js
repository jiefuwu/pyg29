$(function () {
  $.ajax({
    type: 'get',
    url: 'http://157.122.54.189:9094/api/public/v1/home/swiperdata',
    dataType: 'json',
    success: function (result) {
      console.log(result);
      if (result.meta.status == 200) {
        var html = template('pyg_bannerTemp', result)
        $('.pyg_tu').html(html);
        var indexhtml=template('pyg_bannerIndex',result)
        $('.pyg_dian').html(indexhtml)
        mui('.mui-slider').slider({
          interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
      }
    }
  })
 



})