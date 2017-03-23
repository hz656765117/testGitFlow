jQuery.wjtab =function(tabBar,tabCon,class_name,tabEvent,i){
  // 初始化操作
/*  $tab_menu.removeClass(class_name);
  $(tabBar).eq(i).addClass(class_name);
  $(tabCon).hide();
  $(tabCon).eq(i).show();*/
  
  $(document).on(tabEvent,tabBar, function(){
  	$(tabBar).removeClass(class_name);
      $(this).addClass(class_name);
      var index=$(tabBar).index(this);
      $(tabCon).hide();
      $(tabCon).eq(index).show();
  });
}
$.wjtab("#tab_demo .tabs a","#tab_demo .tab-con","cur","click","0");
$.wjtab("#tab_demo1 .tabs a","#tab_demo1 .tab-con","cur","click","0");
$.wjtab("#tab_demo2 .tabs a","#tab_demo2 .tab-con","cur","click","0");
$.wjtab("#tab_demo3 .tabs a","#tab_demo3 .tab-con","cur","click","0");

/*jQuery.wjtab =function(tabBar,tabCon,class_name,tabEvent,i){
var $tab_menu=$(tabBar);
  // 初始化操作
  $tab_menu.removeClass(class_name);
  $(tabBar).eq(i).addClass(class_name);
  $(tabCon).hide();
  $(tabCon).eq(i).show();
  
  $tab_menu.bind(tabEvent,function(){
  	$tab_menu.removeClass(class_name);
      $(this).addClass(class_name);
      var index=$tab_menu.index(this);
      $(tabCon).hide();
      $(tabCon).eq(index).show();
  });
}
$.wjtab("#tab_demo .tabs a","#tab_demo .tab-con","cur","click","0");
$.wjtab("#tab_demo1 .tabs a","#tab_demo1 .tab-con","cur","click","0");
$.wjtab("#tab_demo2 .tabs a","#tab_demo2 .tab-con","cur","click","0");
$.wjtab("#tab_demo3 .tabs a","#tab_demo3 .tab-con","cur","click","0");*/
// #tab_demo 父级id
// #tab_demo .tabs a 控制条
// #tab_demo .tabCon 内容区
// click 事件 点击切换，可以换成mousemove 移动鼠标切换
// 1	默认第2个tab为当前状态（从0开始）