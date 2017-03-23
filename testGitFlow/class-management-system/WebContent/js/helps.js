var  app;
var  event;
var  menuData ={};
var remarkData = new Map();
//初始化
$(function(){
	app.loadHelpTitle();
	var type = parseInt(($("#type").val()));
	switch(type){
       	case 5:$("#chanpintaojiananzhuangzhinan").click();break;//产品安装套件指南
       	case 10:$("#changjianwenti").click();break;//常见问题
       	case 20:$("#weixinqiyehaozhishi").click;break;//微信企业号知识
       	case 31:$("#tongxunlu").click();break;//通讯录
    	case 41:$("#tongxunlu").click();break;//通讯录
    	case 51:$("#tongxunlu").click();break;//通讯录
    	case 32:$("#kaoqin").click();break;//考勤
    	case 33:$("#gonggaolan").click();break;//公告栏
    	case 34:$("#shenpi").click();break;//审批
    	case 35:$("#baoxiao").click();break;//报销
    	case 36:$("#toupiaodiaoyan").click();break;//投票调研
    	case 42:$("#liaogongzuo").click();break;//聊工作
    	case 43:$("#dianhuahuiyi").click();break;//电话会议
    	case 44:$("#qiyeyouxiang").click();break;//企业邮箱
    	case 45:$("#wodemingpian").click();break;//我的名片
    	case 46:$("#weishequ").click();break;//微社区
    	case 52:$("#qiyexiangce").click();break;//企业相册
    	case 53:$("#qiyepeixun").click();break;//企业培训
    	case 54:$("#qiyeneikan").click();break;//企业内刊
    	case 55:$("#yuangongguanhuai").click();break;//员工关怀
    	case 56:$("#hudongshangqiang").click();break;//互动上墙
    	default:$("#chanpintaojiananzhuangzhinan").click();break;//产品安装套件指南
	}

	

});
app={
	//加载一级菜单
    loadHelpTitle:function(){
    	 var url = "/about/getHelpsListMenu";
    	 var in_data = {};
    	 ajaxComon(url,in_data,errorAjax_loadHelpTitle,successAjax_loadHelpTitle);
    	 app.addMenuHtml();
    },
    
    
    //根据ID获取子菜单数据
    loadHelpChildTitleById:function(id){
   	      var url = "/about/getHelpsListMenu";
	      var in_data = {parent_id:id};
	      ajaxComon(url,in_data,errorAjax_loadHelpChildTitleById,successAjax_loadHelpChildTitleById);
	      var data =  menuData.level_2;
	      var html =  app.addMenuChildHtml(data);
	    return html;
    },
    //拼接菜单
    addMenuHtml:function(){
      var data = 	menuData.level_1;
      var html = "";
      $.each(data,function(i){
    	    var is_menuChild =  data[i].is_menuChild;
    	    var name =  data[i].name;
    	    var id = data[i].id;
    	    var v_remark = data[i].v_remark;
    	    var h_remark = data[i].h_remark;
    	    var name_qp = data[i].name_qp;
    	    var show_type = data[i].show_type;
    	    switch(is_menuChild){
    	           case  0:
    	        	    html += "<h2 style='border-top: none' ><a href='javascript:void(0)'onclick='app.clickMenu("+show_type+","+id+")' id="+name_qp+">"+name+"</a><span class='tubiao'></span></h2>";
    	        	   //存储标题的备注信息
    	        	   if(h_remark.length>0){
    	        	   remarkData.put("h_"+id, " <div class='guidetit'><h2>"+h_remark+"</h2></div>");
    	                }
    	        	   if(h_remark.length>0){
    	        	   remarkData.put("v_"+id, " <div class='guidetit'><h2>"+v_remark+"</h2></div>");
    	        	   }
    	        	   break;
    	           case  1: 
    	        	   html += "<h2 class='guide'style='border-top: none'  onclick='navClick(this)'><a href='javascript:void(0)'>"+name+"</a><span class='tubiao2'></span></h2>";
    	        	  var html_2 =   app.loadHelpChildTitleById(id);
    	        	      html +=  html_2;
    	        	   break;   
    	    }
    	   //加载子菜单信息
    	
      }
    );
      $("#title_menu").append(html);
    },
    //拼接子菜单
    addMenuChildHtml:function(data){
        var html = "  <ul class='newnav'>";
        $.each(data,function(i){
    	    var name =  data[i].name;
    	    var id = data[i].id;
    	    var v_remark = data[i].v_remark;
    	    var h_remark = data[i].h_remark;
    	    var title_qp = data[i].title_qp;
    	    var show_type = data[i].show_type;
    	    html +="<li><a  href='javascript:void(0)'onclick='app.clickMenu("+show_type+","+id+")'  id="+title_qp+">"+name+"</a></li>";
    	    if(h_remark.length>0){
	        	   remarkData.put("h_"+id, " <div class='guidetit'><h2>"+h_remark+"</h2></div>");
	            }
	        if(h_remark.length>0){
	              remarkData.put("v_"+id, " <div class='guidetit'><h2>"+v_remark+"</h2></div>");
	          }
      }
    );
        html +="</ul>";
	   return html;
   },
   //加载内容信息
   loadContentTitle:function(id,type){
	    var url = "/about/getHelpsListTC";
	      var in_data = {menu_id:id,type:type};
	      ajaxComon(url,in_data,errorAjax_loadContentTitle,successAjax_loadContentTitle);
	      var data =  menuData.content;
	      var html =  app.addContentTitleHtml(data);
	    return html;
	      
       },  
       //拼接内容
       addContentTitleHtml:function(data){
    	   var html = "";
           $.each(data,function(i){
       	    var title =  data[i].title;
       	    var content = data[i].content;
       	    html += "<div class='qa'>";
       	    html +="<h2 class='question' > <a href='javascript:void(0)' onclick = 'questionClick(this)'><span class='qs'></span>"+title+"</a></h2>";//主题
       	    html +="<div class='answer'><span class='as'></span>"+content+"</div>";
            html +="</div>";
             }
           );
           return  html;
       },
       
   //加载标题信息
      loadTitleInfo:function(id){
   	    var url = "/about/getHelpsListTC";
   	      var in_data = {menu_id:id};
   	      ajaxComon(url,in_data,errorAjax_loadContentTitle,successAjax_loadContentTitle);
   	      var data =  menuData.content;
   	      var html =  app.addTitleInfoHtml(data);
   	     return html;
          },   
   //拼接标题内容     
       addTitleInfoHtml:function(data){
       	   var html = "";
              $.each(data,function(i){
          	    var content = data[i].content;
          	      html += content;
                }
              );
              return  html;
          },      
          
   //点击菜单事件
   clickMenu:function(show_type,id){
	   switch(show_type){
	   case 1:
		     var html ="";
			 //加载后台管理标题
	    	  h_html = app.loadContentTitle(id,1);
	    	 //加载微信标题
	    	  v_html = app.loadContentTitle(id,2);
	    	   var hremarkId = "h_"+id;
	 		   var h_remark = remarkData.get(hremarkId);
		 	   var vremarkId = "v_"+id;
		 	   var v_remark = remarkData.get(vremarkId);
		 	   if(typeof(h_remark) != "undefined") { html +=h_remark;}
		 	   html += h_html;
		 	   if(typeof(v_remark) != "undefined"){html +=v_remark;}
		 	    html += v_html;
		 	    $("#title_content").html(html); 
		 	   break;
		case 2:
		   var html = app.loadTitleInfo(id);
		   var hremarkId = "h_"+id;
		   var h_remark = remarkData.get(hremarkId);
		   if(typeof(h_remark) == "undefined"){ h_remark = "";}
	       $("#title_content").html(h_remark+html); 
	       break;
		
	   }
	 
	
    }
};
//公共ajax 请求
function  ajaxComon(url,in_data,errorAjax,successAjax){
$.ajax({
	url : url,
	type : 'POST',
	data : in_data,
	async : false,
	dataType : 'json',
	error : errorAjax,
	success :successAjax
});
}



function errorAjax_loadHelpTitle(){//加载一级菜单失败
	alert("加载一级菜单失败");
}
function successAjax_loadHelpTitle(data){//加载一级菜单成功
	menuData['level_1'] = data.obj;
}

function errorAjax_loadHelpChildTitleById(){
	alert("加载子菜单失败");
}
function successAjax_loadHelpChildTitleById(data){
	menuData['level_2'] = data.obj;
}

function errorAjax_loadContentTitle(){
	alert("加载标题失败");
}
function successAjax_loadContentTitle(data){
	menuData['content'] = data.obj;
}

//问答区开关
 function questionClick(obj){
	     $(obj).parent().parent().siblings().find(".question a").removeClass('lvse');
	     $(obj).parent().parent().siblings().find(".answer").hide();
	     $(obj).parent().parent().siblings().find(".guidepic").hide();
	     $(obj).parent().find("a").toggleClass('lvse');
	     $(obj).parent().nextAll("div").toggle();
	     $(obj).parent().parent().find(".guidepic").toggle();
 };
//导航栏开关
function navClick(obj){
  var cname = $(obj).attr("class");
    if(cname == "guide"){
        $(".guide").find("span").attr("class",'').addClass("tubiao2");
        $(".newnav").hide();
        $(obj).find("span").attr("class",'').addClass("tubiao3");
        $(obj).next('ul').show();
    }else{
        $(".guide").find("span").attr("class",'').addClass("tubiao2");
        $(".newnav").hide();
    }
}
