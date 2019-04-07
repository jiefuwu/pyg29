$(function () {
pyg_lbt()
pyg_cpk()
 
})
function pyg_lbt() {
   $.ajax({
     type: 'get',
     url: 'home/swiperdata',
     dataType: 'json',
     success: function (result) {
       if (result.meta.status == 200) {
         var html = template('pyg_bannerTemp', result)
         $('.pyg_tu').html(html);
         var indexhtml = template('pyg_bannerIndex', result)
         $('.pyg_dian').html(indexhtml)
         mui('.mui-slider').slider({
           interval: 2000
         });
       }
     }
   })
}
function pyg_cpk() {
  $.ajax({
    type:'get',
    url:'home/goodslist',
    dataType:"json",
    success:function (result) {
      var html = template('pyg_cpks', result)
      $('.pyg_cp').html(html)
    }
  })
}