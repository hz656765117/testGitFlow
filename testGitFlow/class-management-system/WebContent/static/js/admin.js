$(document).ready(function() {
  
  // 顶部帐号设置
  $('.hnav .dropdown').hover(function() {
    $(this).addClass('open');
  }, function() {
    $(this).removeClass('open');
  })
  // 热线
  $('.rexian').hover(function() {
    $(this).find('.rexian-menu').fadeIn();
  }, function() {
    $(this).find('.rexian-menu').stop().fadeOut();
  })
  // table中的操作隐藏和显示
  $('.table tr').hover(function() {
    $(this).find('.operate').show();
  }, function() {
    $(this).find('.operate').hide();
  });

});
// 全选
function checkbox(e) {
  if (e.checked) {
    $('table').find('input').each(function() {
      this.checked = true;
    });
  } else {
    $('table').find('input').each(function() {
      this.checked = false;
    });
  }
  ;
};
// 排序
function paixu(e) {
  var cont = $(e).parent().parent().parent();
  $('tbody').prepend(cont.clone(true));
  cont.detach();
};
