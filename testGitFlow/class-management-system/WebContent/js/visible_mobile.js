var tipHtml="您未选择任何成员，确认不发送推送提醒？";
// JavaScript Document 
jQuery(document).ready(function () {
/*表格移上去变色和高亮*/
if(jQuery('.mytable')!=null&&jQuery('.mytable')!=undefined){
	jQuery('.mytable tr').hover(function(){
		jQuery(this).addClass('bg-blue');
		jQuery(this).find('.ell a').addClass('hei01');
		jQuery(this).find('.txl-list .hui').addClass('hei01').removeClass('hui');
		jQuery(this).find('.txl-list .hui04').css('color','#333');
	 },function(){
		 jQuery(this).removeClass('bg-blue');
		 	jQuery(this).find('.ell a').removeClass('hei01');
			jQuery(this).find('.txl-list .hei01').removeClass('hei01').addClass('hui');
			jQuery(this).find('.txl-list .hui04').css('color','#666');
		});
	/*隔行变色*/
	jQuery('.mytable tr:even,.card-list li:odd').addClass('bg-hui04');
}
/*后台导航*/
jQuery('.mymenu h3').click(function(){
	jQuery(this).parent().find('.menu01').toggle().parent().siblings().find('.menu01').hide();
  });
/*编辑和删除*/ 
jQuery('.caozuo tr').hover(function(){
	jQuery(this).find('.operate').show();
  },function(){
	jQuery(this).find('.operate').hide();  
});
jQuery("input[class*=graytips]") //所有样式名中含有graytips的input默认为灰输入时为黑色  
.each(function(){   
   var oldVal=jQuery(this).val();   //默认的提示性文本   
   jQuery(this)   
   .css({"color":"#ccc"}) //灰色   
   .focus(function(){   
    if(jQuery(this).val()!=oldVal){jQuery(this).css({"color":"#333"});}else{jQuery(this).val("").css({"color":"#ccc"});}   
   }) 
   .blur(function(){   
    if(jQuery(this).val()==""){jQuery(this).val(oldVal).css({"color":"#ccc"});}   
   })   
   .keydown(function(){jQuery(this).css({"color":"#333"});});
  }); 		
});
var timeI = 60;
function timedown() {
	timeI = timeI - 1;
	if (timeI==0) {
		jQuery("#fasong-yzm").val("重新获取");
		jQuery("#fasong-yzm").css({ color: "#cb3932", background:"#ccc url(images/btn-bg.gif) repeat-x", border: "1px #ddd solid"});
		jQuery("#fasong-yzm").attr("disabled",false);
		clearInterval(intervalId);
	} else {
		jQuery("#fasong-yzm").val(timeI+"秒后重新获取");
	}
} 
//发送验证码
var intervalId;
function send(){
timeI=60;
	jQuery("#fasong-yzm").val(timeI+"秒后重新获取");
	jQuery("#fasong-yzm").css({ color: "#999", background: "#eee", border: "1px #ddd solid"});
	jQuery("#fasong-yzm").attr("disabled", true);
	intervalId=setInterval(timedown, 1000);
}

//弹出层
function openDiv(showid) { 
jQuery("#alertdiv"+showid).OpenDiv(); 
} 
function closeDiv(showid) {
	jQuery("#alertdiv"+showid).CloseDiv();
} 
function visiableCloseDiv(showid) {
	//if(upPageHtml!=''&&upPageHtml!=null){
	 upPageHtml=upPageHtml+'<li class="moreninput1"><input type="text" class="defaultinput" autocomplete="off" autocapitalize="off" placeholder="请输入搜索条件"></li>';
	//}
	jQuery("#detpId_id_str_x").val(upPageHtml);
	 visible();
	jQuery("#alertdiv"+showid).CloseDiv();
	$('.inputmatch1').hide();
    $('.inputmatch').hide();
}


function visiableCloseDivMobile(showid) {
	jQuery("#alertdiv"+showid).CloseDiv();
}
function AnnouncementcloseDiv(showid){
		jQuery("#alertdiv"+showid).CloseDiv();
		html="";
		html+='<li class="moreninput1"><input id="searchtxt" type="text" class="defaultinput" autocomplete="off" autocapitalize="off" placeholder="请输入搜索条件"></li>';
		$('#visiableTwo').html(html);
		$("#selectType").val("0");
		$('.xinjian').hide();
		$('.duixiang span').removeClass('now');
		$('.range').addClass('now');
		$('.inputmatch1').hide();
        $('.inputmatch').hide();
        $("#title").val("");
		onload();
}
function closeMeetDiv(showid) {
	if (jQuery("#alertdiv"+showid).data('flag')) {
		jQuery("#alertdiv"+showid).data('flag', false);
	}
jQuery("#alertdiv"+showid).CloseDiv();
} 

	
//弹出层01
function openDiv2(showid) { 
jQuery(".user-pop").hide(); 
 windowHeight = jQuery(".parents").height(),//获取相对定位元素高度 
 windowWidth = jQuery(".parents").width(),//获取相对定位元素宽度 
 popupHeight = jQuery("#alertdiv"+showid).height(),//获取弹出层高度 
 popupWeight = jQuery("#alertdiv"+showid).width();//获取弹出层宽度 
 posiTop = (windowHeight-popupHeight)/2; 
 posiLeft = window.screen.availHeight/3; 
 jQuery("#alertdiv"+showid).css({
    "left":posiLeft + "px","top":document.body.scrollTop + "px"
    });
 jQuery("#alertdiv"+showid).show();
} 

/**************可见范围**************/
function getPermissDepartIds(){
	var selectType=$("#selectType").val();
	var departmentStr="";
	if(selectType==0){
		return "-9";
	}else{
		//type 1是人，0是部门
	$('#visiableTwo li').each(function(){
		   var id = $(this).find('p').attr('class');
		   var type = $(this).find('p').attr('id');
		    if(type==0&&id!=null){
		    	departmentStr+=","+id+",";
		     }
	  });
	 if(departmentStr!=null){
		 return departmentStr;
	 }else{
		 return departmentStr.replaceAll_(",,",",");
	 }
	}
}
function getPermissPersonIds(){
	var selectType=$("#selectType").val();
	var personStr="";
	if(selectType==0){
		return "-9";
	}else{
		//type 1是人，0是部门
	$('#visiableTwo li').each(function(){
     var id = $(this).find('p').attr('class');
     var type = $(this).find('p').attr('id');
     if(type==1&&id!=null){
    	 personStr+=","+id+",";
        }
	   });
	  return personStr.replaceAll_(",,",",");
	}
}
var webPath;
var imgPath;
//群发提醒的入口
function setPermiss_setHtml_GroupRemind(webPathInit,imgPathInit){
	webPath=webPathInit;
	imgPath=imgPathInit;
	setHtml_GroupRemind(webPath,imgPath);
	openDiv("_x210x");
	/*if(jQuery("#detpId_id_str_x").val()==undefined||jQuery("#detpId_id_str_x").val()==null||jQuery("#detpId_id_str_x").val()==""){
		jQuery("#detpId_id_str_x").val(permissStr);
	} */ 
	if(jQuery.fn.zTree.getZTreeObj("departmentTree_x210x")==null||jQuery.fn.zTree.getZTreeObj("departmentTree_x210x")==undefined){
		initTree_dept(webPath);
	}
	if(jQuery.fn.zTree.getZTreeObj("departmentTree_x210x_person")==null||jQuery.fn.zTree.getZTreeObj("departmentTree_x210x_person")==undefined){
		initTree_person(webPath);
	}
	 checkNode_visiable();
	 checkNode_visiable_person();
	// onload();
}
//可见范围入口
function setPermiss_depart_visiable(webPathInit,imgPathInit){
	webPath=webPathInit;
	imgPath=imgPathInit;
	setHtml_visiable(webPath,imgPath);
	openDiv("_x210x");
	/*if(jQuery("#detpId_id_str_x").val()==undefined||jQuery("#detpId_id_str_x").val()==null||jQuery("#detpId_id_str_x").val()==""){
		jQuery("#detpId_id_str_x").val(permissStr);
	}  */
	if(jQuery.fn.zTree.getZTreeObj("departmentTree_x210x")==null||jQuery.fn.zTree.getZTreeObj("departmentTree_x210x")==undefined){
		initTree_dept(webPath);
	}
	if(jQuery.fn.zTree.getZTreeObj("departmentTree_x210x_person")==null||jQuery.fn.zTree.getZTreeObj("departmentTree_x210x_person")==undefined){
		initTree_person(webPath);
	}
	 checkNode_visiable();
	 checkNode_visiable_person();
	// onload();
}

//可见范围入口
function setPermiss_visiable(elm,webPathInit,imgPathInit,type){
	webPath=webPathInit;
	imgPath=imgPathInit;
	setHtml_visiableBytype(elm,webPath,imgPath,type);
	openDiv("_x210x");
    if(jQuery.fn.zTree.getZTreeObj("departmentTree_x210x")==null||jQuery.fn.zTree.getZTreeObj("departmentTree_x210x")==undefined){
		initTree_dept(webPath);
	}
	if(jQuery.fn.zTree.getZTreeObj("departmentTree_x210x_person")==null||jQuery.fn.zTree.getZTreeObj("departmentTree_x210x_person")==undefined){
		initTree_person_mobile(webPath);
	}
	 checkNode_visiable();
	 checkNode_visiable_person();
	// onload();
}


var upPageHtml="";
function checkNode_visiable(){
	var ztree=jQuery.fn.zTree.getZTreeObj("departmentTree_x210x");
	var html="";
	checkAll_base_visiable(false);
	$('#visiableTwo li').each(function(){
		var moreninputClassName = $(this)[0].className;
		if(moreninputClassName!="moreninput1"){
		    html+=$(this)[0].outerHTML;
		}
		 var id = $(this).find('p').attr('class');
	     var type = $(this).find('p').attr('id');
	     if(type==0&&id!=null){
	        ztree.checkNode(ztree.getNodesByParam("id", id, null)[0],true,false);	
	      }
    });
//	 if(html!=""){
		 upPageHtml=html;
		 html+='<li class="moreninput"><input id="searchtxt" type="text" class="defaultinput" autocomplete="off" autocapitalize="off" placeholder="请输入搜索条件"></li>';
		 $("#visiableOne").html(html);
//	 }
	 onload();
}
function checkNode_visiable_person(){
	$('.tab_box2 li').find('input').prop('checked',false);
	$('#visiableTwo li').each(function(){
		 var liId = $(this).find('p').attr('class');
	     var selectType = $(this).find('p').attr('id');
	     if(selectType==1&&liId!=null){
	    	 $('.tab_box2 li').each(function(){
	             var moreninputClassName = $(this).find('span').attr('id');
	             if(liId == moreninputClassName){
	            	 $(this).find('input').prop('checked',true);
	             }
	         });
	      }
    });
}
/*
 * 初始化整个树，获取数据（部门）
*/
function initTree_dept(webPath){
	var setting_visiable = {
		check : {
			enable : true,
			chkStyle : "checkbox",
			chkboxType : {
				"Y" : "",
				"N" : ""
			}
		},
		async : {
			enable : true,
			url : webPath+"contact/plugin/listDepartment?appid=TXL",
			autoParam : [ "id=pid" ],
			dataFilter : filter_visiable
		},
		view : {
			showIcon : false,
			showLine : false
		},
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId",
				rootPId : 0
			}
		},
		callback : {
			onCheck : checkDept_visiable,
			onAsyncSuccess : onAsyncSuccess_visiable
			//onClick:zTreeOnClick
		}
	};
   jQuery.fn.zTree.init(jQuery("#departmentTree_x210x"), setting_visiable);
}
/*
 * 初始化整个树，获取数据（人员部门）
*/
function initTree_person(webPath){
	var setting_visiable_person = {
		check : {
			enable : false
		},
		async : {
			enable : true,
			url : webPath+"contact/plugin/listDepartment?appid=TXL",
			autoParam : [ "id=pid" ],
			dataFilter : filter_visiable
		},
		view : {
			showIcon : false,
			showLine : false
		},
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId",
				rootPId : 0
			}
		},
		callback : {
			onAsyncSuccess : onAsyncSuccess_visiable_person,
			onClick:zTreeOnClick_visible
		}
	};
   jQuery.fn.zTree.init(jQuery("#departmentTree_x210x_person"), setting_visiable_person);
}


/*
 * 初始化整个树，获取数据（人员部门）
*/
function initTree_person_mobile(webPath){
	var setting_visiable_person = {
		check : {
			enable : false
		},
		async : {
			enable : true,
			url : webPath+"contact/plugin/listDepartment?appid=TXL",
			autoParam : [ "id=pid" ],
			dataFilter : filter_visiable
		},
		view : {
			showIcon : false,
			showLine : false
		},
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId",
				rootPId : 0
			}
		},
		callback : {
			onAsyncSuccess : onAsyncSuccess_visiable_person,
			onClick:zTreeOnClick_visible_mobile
		}
	};
   jQuery.fn.zTree.init(jQuery("#departmentTree_x210x_person"), setting_visiable_person);
}
/*
 * 选中部门的时候加进搜索框中
*/
function checkDept_visiable(e, treeId, treeNode) {
	 var html = "<li><p class='"+treeNode.id+"' id='0'>"+treeNode.name+"</p><span class='closeicon'>X</span></li>";
     if(treeNode.checked){
         $('.moreninput').before(html);
     }else{
         $('.match li').each(function(){
             var value2 = $(this).find('p').attr('class');
             if(treeNode.id == value2){
                 $(this).remove();
             }
         });
     }
}
//判断是否思叶子节点
function filter_visiable(treeId, parentNode, childNodes) {
  if (!childNodes.obj)
    return null;
  for (var i = 0, l = childNodes.obj.length; i < l; i++) {
    
    childNodes.obj[i].isParent = !childNodes.obj[i].isLeaf;
    var name = childNodes.obj[i].name.replace(/\.n/g, '.');
    childNodes.obj[i].title = name;
    
    var subname = name.length > 8 ? name.substring(0, 8) + '...' : name;
    childNodes.obj[i].name = subname;
  }
  return childNodes.obj;
};
var tree_visiable_Status="init";
var tree_visiable__person_Status="init";
/*
 * 将初始化的数据显示在页面(部门)
*/
function onAsyncSuccess_visiable(event, treeId, treeNode, msg) {
	var treeObj = jQuery.fn.zTree.getZTreeObj(treeId);
	var nodes = treeObj.getNodes();
	if(tree_visiable_Status=="init"){
		treeObj.expandNode(nodes[0]);
		//zTreeOnNodeCreated_x210x();
		tree_visiable_Status="";
	} 
	asyncNodes_visible(treeObj.getNodes(),"departmentTree_x210x");
	//zTreeOnNodeCreated_x210x();
	checkNode_visiable();
}
/*
 * 将初始化的数据显示在页面(人员部门)
*/
function onAsyncSuccess_visiable_person(event, treeId, treeNode, msg) {
	var treeObj = jQuery.fn.zTree.getZTreeObj(treeId);
	var nodes = treeObj.getNodes();
	if(tree_visiable__person_Status=="init"){
		treeObj.expandNode(nodes[0],true);
		//zTreeOnNodeCreated_x210x();
		tree_visiable__person_Status="";
	} 
	asyncNodes_visible(treeObj.getNodes(),"departmentTree_x210x_person");
}
//点击节点事件
function zTreeOnClick_visible(event, treeId, treeNode, msg){
	/*$('.tab_box2 div ').addClass("hide");
	$('#'+treeNode.id).removeClass("hide");*/
	sycPerson(treeNode.id);
}
//点击节点事件
function zTreeOnClick_visible_mobile(event, treeId, treeNode, msg){
	/*$('.tab_box2 div ').addClass("hide");
	$('#'+treeNode.id).removeClass("hide");*/
	sycPerson_mobile(treeNode.id);
}
/**
 * 递归加载所有节点
 * @param nodes
 */
function asyncNodes_visible(nodes,tree) {
	if (!nodes) return;
	var zTree = $.fn.zTree.getZTreeObj(tree);
	for (var i=0, l=nodes.length; i<l; i++) {
		if (nodes[i].isParent && nodes[i].zAsync) {
			asyncNodes_visible(nodes[i].children,tree);
		} else {
			zTree.reAsyncChildNodes(nodes[i], "refresh", true);
		}
	}
}



/*标签事件*/
$(document).on('click','.closeicon',function(event){
	$(this).parent().remove();
    event.stopPropagation();
    var value3 = $(this).prev().attr('class');
    $('.tab_box li').each(function(){
        var value4 = $(this).find('span').attr('id');
        if(value3 === value4){
            $(this).find('input').prop('checked',false);
        }
    });
    $('.tab_box2 li').each(function(){
    	$('.'+value3).parent().remove();
    });
    var ztree=jQuery.fn.zTree.getZTreeObj("departmentTree_x210x");
    ztree.checkNode(ztree.getNodesByParam("id", value3, null)[0],false,false);
});
/*输入匹配框*/
function clickLi(e,id,type){
	var value = $(e).find('.matchname').text();
	var html = "<li><p class='"+id+"' id='"+type+"'>"+value+"</p><span class='closeicon'>X</span></li>";
	$('.tab_box2 li').each(function(){
        var value4 = $(this).find('span').attr('id');
        if(id===parseInt(value4)){
            $(this).find('input').prop('checked',true);
        }
    });
    $('.moreninput').before(html);
    $('.defaultinput').attr('value','');
    $('.defaultinput').attr('placeholder','');
    $('.inputmatch').hide();
    var ztree=jQuery.fn.zTree.getZTreeObj("departmentTree_x210x");
	ztree.checkNode(ztree.getNodesByParam("id", id, null)[0],true,false);
}

/*输入匹配框*/
function clickLiTwo(e,id,type){
	var value = $(e).find('.matchname').text();
	var parentClass=$(e).parent()[0].className;
	var html = "<li><p class='"+id+"' id='"+type+"'>"+value+"</p><span class='closeicon'>X</span></li>";
	
    if(parentClass=="inputmatch1"){
		$('.moreninput1').before(html);
		$('.defaultinput').attr('value','');
		$('.inputmatch1').hide();
	}else{
		$('.moreninput').before(html);
		$('.defaultinput').attr('value','');
		$('.inputmatch').hide();
		$('.tab_box2 li').each(function(){
	        var value4 = $(this).find('span').attr('id');
	       
	        if(id===parseInt(value4)){
	            $(this).find('input').prop('checked',true);
	        }
	    });
		var ztree=jQuery.fn.zTree.getZTreeObj("departmentTree_x210x");
		ztree.checkNode(ztree.getNodesByParam("id", id, null)[0],true,false);
	}
	$('.defaultinput').attr('placeholder','');
}
/*选项卡右侧复选框*/
function selectPerson(e){
	var checked = $(e).prop('checked');
    var value = $(e).parent().find('span').text();
    var id = $(e).parent().find('span').attr('id');
    if(id=="null"){
    	layer.alert("该人员没有手机号");
    	$(e).attr("checked", false);
    	return;
    }
    var html = "<li><p class='"+id+"' id='1'>"+value+"</p><span class='closeicon'>X</span></li>";
    if(checked){
        $('.moreninput').before(html);
    }else{
        $('.match li').each(function(){
            var value2 = $(this).find('p').attr('class');
            if(id == value2){
                $(this).remove();
            }
        });
    }
}

function editvisiable_visiable(list){
	var html="";
	if(list!=null&&list.length>0){
		for(var i=0;i<list.length;i++){
			var personDept=list[i];
			if(personDept!=null&&personDept.id<0){
				html+= "<li><p class='"+personDept.departmentId+"' id='0'>"+personDept.departmentName+"</p><span class='closeicon'>X</span></li>";
			}
			if(personDept!=null&&personDept.id>0){
				html+= "<li><p class='"+personDept.id+"' id='1'>"+personDept.name+"</p><span class='closeicon'>X</span></li>";
			}
		}
	}
	return html;
}
/*
 * 判断可见范围
*/
function zhiding(){
	$("#selectType").val("1");
    $('.xinjian').show();
    $('.duixiang span').removeClass('now');
    $('.zhiding').addClass('now');
}
pMap = {
		departmentId: 'departmentId',
		companyId:'companyId',
    id: 'id',
    headImage: 'headImage',
    name:'name',
    personList:'personList',
    depList:'depList'
};
/*
 * 写一个人员递归
*/
function sycPerson(id){
	$.ajax({
		type : 'POST',
		url : webPath + 'contact/plugin/listPersonByDepartment',
		data : {department: id, pageSize: 10000},
		success : function(msg) {
			 personInfo = eval(msg).obj.items;
			 var html ="" ;
	      if(personInfo!=null){
	       html+="<div id='"+id+"' style='height:270px;overflow:auto' >";
			 if(personInfo!=null){
	    		 for(var i=0;i<personInfo.length;i++){
					  var personInfoDTO=personInfo[i];
					  if(personInfoDTO[pMap.headImage]!=null){
						  html+="<li><img src='"+personInfoDTO[pMap.headImage]+"'/><span id='"+personInfoDTO[pMap.id]+"'>"+personInfoDTO[pMap.name]+"</span><input id='"+personInfoDTO[pMap.id]+"' onclick='selectPerson(this)' type='checkbox'/></li>";
					  }else{
						  html+="<li><img src='"+imgPath+"headImg/logo.png'/><span id='"+personInfoDTO[pMap.id]+"'>"+personInfoDTO[pMap.name]+"</span><input id='"+personInfoDTO[pMap.id]+"' onclick='selectPerson(this)' type='checkbox'/></li>";
					  }
				}
			 }
			 html+="</div>";
			 if(html!=''){
				 $('#personbox').html(html);
				 checkNode_visiable_person();
			 }
	     }
		}
	});
}


/*
 * 写一个人员递归
*/
function sycPerson_mobile(id){
	
	$.ajax({
		type : 'POST',
		url : webPath + 'contact/plugin/listPersonByDepartment',
    data : {department: id, pageSize: 10000},
    success : function(msg) {
       personInfo = eval(msg).obj.items;
			 var html ="" ;
	      if(personInfo!=null){
	       html+="<div id='"+id+"' style='height:270px;overflow:auto'>";
			 if(personInfo!=null){
	    		 for(var i=0;i<personInfo.length;i++){
					  var personInfoDTO=personInfo[i];
					  if(personInfoDTO[pMap.headImage]!=null){
						  html+="<li><img src='"+personInfoDTO[pMap.headImage]+"'/><span id='"+personInfoDTO.mobile+"'>"+personInfoDTO[pMap.name]+"</span><input id='"+personInfoDTO.mobile+"' onclick='selectPerson(this)' type='checkbox'/></li>";
					  }else{
						  html+="<li><img src='"+imgPath+"headImg/logo.png'/><span id='"+personInfoDTO.mobile+"'>"+personInfoDTO[pMap.name]+"</span><input id='"+personInfoDTO.mobile+"' onclick='selectPerson(this)' type='checkbox'/></li>";
					  }
				}
			 }
			 html+="</div>";
			 if(html!=''){
				 $('#personbox').html(html);
				 checkNode_visiable_person();
			 }
	     }
		}
	});
}

function setHtml_visiableBytype(elmId,webPath,imgPath,type){
	if(jQuery("#detpId_name_str_x").val()!=undefined){
		return false;
	}
	var li;
	var dept_css = "";
	var per_css ="hide";
	 switch(type){
	    case 1:
	    	li = '<li class="current">部门</li>'; break;
	    case 2:
	    	li = '<li class="current">人员</li>'; per_css = "" ; dept_css ="hide";break;
	    default :
	    	li = '<li class="current">部门</li><li>成员</li>'; break;
	    }
	jQuery(document.body).append(
			 '<div id="alertdiv_x210x" class="neirong-pop user-pop pos-abs bg-bai display-no" style="" >'
			+'<div class="user-poppd1 notice-layer">'
			+'<div class="clearfix ">'
			+'<a href="javascript:void(0)"  onclick="visiableCloseDivMobile(\'_x210x\')" class="fr f14 blue gbbtn">关闭</a>'
			+'</div>'
			+'<input type="hidden" id="detpId_name_str_x" value="" />'
			+'<input type="hidden" id="detpId_id_str_x" value="" />'
			+'<div class="fl viewrange pos-rel " style="width: 540px;position: relative;">'
			+'<p class="f14 lh30  hei01  fl" style="width: 60px;height: 30px;line-height: 30px;position:relative;top:10px">接收人员:</p>'
			+'<div class="mod-tree-people__input pos-rel;width:520px">'
			+'<ul id="visiableOne" class="match" style="padding-right: 0;">'
			+'<li class="moreninput"><input id="searchtxt" type="text" class="defaultinput" autocomplete="off" autocapitalize="off" placeholder="请输入搜索条件">'
			+'</li></ul></div>'
			+'<ul class="inputmatch" style="height:400px;overflow:auto;position:absolute;left:60px;width:478px"></ul>'
			+'<div class="box demo2" style="width:538px;margin-top:20px"><ul class="tab_menu">'+li+'</ul>'
			+'<div class="tab_box" style="bd-xu-hui01 over-auto h395 bg-hui"><div class="bumen '+dept_css+'"  style="height:270px;overflow:auto">'
			+'<ul id="departmentTree_x210x" class="ztree">'
			+'</ul></div>'
			+'<div class="'+per_css+'" style="padding: 0"><div class="box box2 demo3 clearfix"><ul id="departmentTree_x210x_person" class=" ztree  tab_menu2" style="height:270px;">'
			+'</ul>'
			+'<div id="personbox" class="tab_box tab_box2" style="height:260px;" >'
			+'</div></div></div>'
			+'</div></div></div>'
			+'<div class="text-center"">'
			+'<a href="javascript:void(0);" onclick="saveDept_visible_elm('+elmId+')" class="f20 bai bg-huang-cur display-ib lh38 h38 bd-huang01 br4 text-center w158 mt15 mb20">确 定</a>'
			+'<a href="javascript:void(0);" onclick="visiableCloseDivMobile(\'_x210x\')"  class="f20 hui display-ib lh38 h38  br4 text-center w158 ml4 cancelbtn mt15 mb20">取消</a>'
			+'</div></div></div>;'
	);
		/*选项卡事件*/
	    $('.demo2').Tabs({
	        event:'click'
	    });
	    $('.demo3').Tabs({
	        event:'click'
	    });
	    onload();
	    sycPerson_mobile(0);
   }


/*
 * 可见范围打开新界面
*/
function setHtml_visiable(webPath,imgPath){
	if(jQuery("#detpId_name_str_x").val()!=undefined){
		return false;
	}
	jQuery(document.body).append(
			 '<div id="alertdiv_x210x" class="neirong-pop user-pop pos-abs bg-bai display-no" style="" >'
			+'<div class="user-poppd1 notice-layer">'
			+'<div class="clearfix ">'
			+'<a href="javascript:void(0)"  onclick="visiableCloseDiv(\'_x210x\')" class="fr f14 blue gbbtn">关闭</a>'
			+'</div>'
			+'<input type="hidden" id="detpId_name_str_x" value="" />'
			+'<input type="hidden" id="detpId_id_str_x" value="" />'
			+'<div class="fl viewrange pos-rel " style="width: 540px;position: relative;">'
			+'<p class="f14 lh30  hei01  fl" style="width: 60px;height: 30px;line-height: 30px;position:relative;top:10px">可见范围:</p>'
			+'<div class="mod-tree-people__input pos-rel;width:520px">'
			+'<ul id="visiableOne" class="match" style="padding-right: 0;">'
			+'<li class="moreninput"><input id="searchtxt" type="text" class="defaultinput" autocomplete="off" autocapitalize="off" placeholder="请输入搜索条件">'
			+'</li></ul></div>'
			+'<ul class="inputmatch" style="height:400px;overflow:auto;position:absolute;left:60px;width:478px"></ul>'
			+'<div class="box demo2" style="width:538px;margin-top:20px"><ul class="tab_menu"><li class="current">部门</li><li>成员</li></ul>'
			+'<div class="tab_box" style="bd-xu-hui01 over-auto h395 bg-hui"><div class="bumen"  style="height:270px;overflow:auto">'
			+'<ul id="departmentTree_x210x" class="ztree">'
			+'</ul></div>'
			+'<div class="hide" style="padding: 0"><div class="box box2 demo3 clearfix"><ul id="departmentTree_x210x_person" class=" ztree  tab_menu2" style="height:270px;">'
			+'</ul>'
			+'<div id="personbox" class="tab_box tab_box2" style="height:260px;" >'
			+'</div></div></div>'
			+'</div></div></div>'
			+'<div class="text-center"">'
			+'<a href="javascript:void(0);" onclick="saveDept_visible()" class="f20 bai bg-huang-cur display-ib lh38 h38 bd-huang01 br4 text-center w158 mt15 mb20">确 定</a>'
			+'<a href="javascript:void(0);" onclick="visiableCloseDiv(\'_x210x\')"  class="f20 hui display-ib lh38 h38  br4 text-center w158 ml4 cancelbtn mt15 mb20">取消</a>'
			+'</div></div></div>;'
	);
		/*选项卡事件*/
	    $('.demo2').Tabs({
	        event:'click'
	    });
	    $('.demo3').Tabs({
	        event:'click'
	    });
	    onload();
	    sycPerson(0);
   }
	$(function(){
		onload();
	});
	
	/*
	 * 群发提醒打开新界面
	*/
	function setHtml_GroupRemind(webPath,imgPath){
		if(jQuery("#detpId_name_str_x").val()!=undefined){
			return false;
		}
		jQuery(document.body).append(
				 '<div id="alertdiv_x210x" class="neirong-pop user-pop pos-abs bg-bai display-no" style="" >'
				+'<div class="user-poppd1 notice-layer">'
				+'<div class="clearfix ">'
				+'<a href="javascript:void(0)"  onclick="visiableCloseDiv(\'_x210x\')" class="fr f14 blue gbbtn">关闭</a>'
				+'</div>'
				+'<input type="hidden" id="detpId_name_str_x" value="" />'
				+'<input type="hidden" id="detpId_id_str_x" value="" />'
				+'<div class="fl viewrange pos-rel " style="width: 540px;position: relative;">'
				+'<p class="f14 lh30  hei01  fl" style="width: 60px;height: 30px;line-height: 30px;position:relative;top:10px">群发提醒:</p>'
				+'<div class="mod-tree-people__input pos-rel;width:520px">'
				+'<ul id="visiableOne" class="match" style="padding-right: 0;">'
				+'<li class="moreninput"><input id="searchtxt" type="text" class="defaultinput" autocomplete="off" autocapitalize="off" placeholder="请输入搜索条件">'
				+'</li></ul></div>'
				+'<ul class="inputmatch" style="height:400px;overflow:auto;position:absolute;left:60px;width:478px"></ul>'
				+'<div class="box demo2" style="width:538px;margin-top:20px"><ul class="tab_menu"><li class="current">部门</li><li>成员</li></ul>'
				+'<div class="tab_box" style="bd-xu-hui01 over-auto h395 bg-hui"><div class="bumen"  style="height:270px;overflow:auto">'
				+'<ul id="departmentTree_x210x" class="ztree">'
				+'</ul></div>'
				+'<div class="hide" style="padding: 0"><div class="box box2 demo3 clearfix"><ul id="departmentTree_x210x_person" class=" ztree  tab_menu2" style="height:270px;">'
				+'</ul>'
				+'<div id="personbox" class="tab_box tab_box2" style="height:260px;" >'
				+'</div></div></div>'
				+'</div></div></div>'
				+'<div class="text-center"">'
				+'<a href="javascript:void(0);" onclick="saveDept_visible()" class="f20 bai bg-huang-cur display-ib lh38 h38 bd-huang01 br4 text-center w158 mt15 mb20">确 定</a>'
				+'<a href="javascript:void(0);" onclick="visiableCloseDiv(\'_x210x\')"  class="f20 hui display-ib lh38 h38  br4 text-center w158 ml4 cancelbtn mt15 mb20">取消</a>'
				+'</div></div></div>;'
		);
			/*选项卡事件*/
		    $('.demo2').Tabs({
		        event:'click'
		    });
		    $('.demo3').Tabs({
		        event:'click'
		    });
		    onload();
		    sycPerson(0);
	   }
	function onload(){
		/*输入框事件*/
	    $('.defaultinput').focus(function(){

	    }).blur(function(){
	        var list = $('.match').find('li');
	        if(list.length == 2){
	            $(this).attr('placeholder', '请输入搜索条件');
	        }else{
	            $(this).attr('placeholder','');
	        }
	    }).keyup(function(event){
	        /*添加标签*/
	        var value = $(this).attr('value');
	        var parentClass=$(this).parent().parent()[0].id;
	        var personids="";
	        var departids="";
	        if(parentClass=="visiableTwo"){
	        	$('#visiableTwo li').each(function(){
					   var selectVisiavleid = $(this).find('p').attr('class');
					   var type = $(this).find('p').attr('id');
					    if(type==1&&selectVisiavleid!=null){
					    	personids+=selectVisiavleid+",";
					     }else if(type==0&&selectVisiavleid!=null){
					       departids+=selectVisiavleid+",";
					     }
				  });
	        }else if(parentClass=="visiableOne"){
	        	$('#visiableOne li').each(function(){
					   var selectVisiavleid = $(this).find('p').attr('class');
					   var type = $(this).find('p').attr('id');
					    if(type==1&&selectVisiavleid!=null){
					    	personids+=selectVisiavleid+",";
					     }else if(type==0&&selectVisiavleid!=null){
					       departids+=selectVisiavleid+",";
					     }
				  });
	        }
	    	$.ajax({
	    		type : 'POST',
	    		url : '/contact/plugin/search/group',
	    		data : {
	    		  appid: 'TXL',
	    		  search: value.trim(),
	    		  pageSize: 500,
  			    personids:personids,
  			    departids:departids
  			  },
	    		success : function(data) {
	    		  var personPage = data.obj.personPage;
	    		  var departments = data.obj.departments
	    		  
	    		  var html = "";
	    		  if(personPage != null && personPage.items.length > 0) {
	    		    for(var i in personPage.items) {
	    		      var person = personPage.items[i];
	    		      html += '<li  onclick="clickLiTwo(this,'+person.mobile+',1)"><span class="matchname" >'+person.name+'</span><span class="info cel">'+person.mobile+'</span><span class="info depart"></span></li>';
	    		    }
	    		  }
	    		  
	    		  if(departments != null && departments.length > 0) {
	    		    for (var i in departments) {
	    		      var depart = departments[i];
	    		      html+='<li onclick="clickLiTwo(this,'+depart.id+',0)"><span class="matchname" >'+depart.name+'</span></li>';
	    		    }
	    		  }
	    		  
	    		  console.log(html);

	    		  if (html != '') {
              if (parentClass == "visiableTwo") {
                $('.inputmatch1').html(html);
              } else {
                $('.inputmatch').html(html);
              }
            }
          }
	    	});
	        
	        if(event.which == 13){
	        	if(parentClass=="visiableTwo"){
	        		$('.moreninput1').before(html);
		            $(this).attr('value','');
		            $('.inputmatch1').hide();
		        }else{
		        	$('.moreninput').before(html);
		            $(this).attr('value','');
		            $('.inputmatch').hide();
		        }
	            
	        }else{
	        	if(parentClass=="visiableTwo"){
		            $('.inputmatch1').show();
		        }else{
		        	$('.inputmatch').show();
		        }
	        }
	        if(value == ''){
		           if(parentClass=="visiableTwo"){
		            $('.inputmatch1').hide();
					}else{
					$('.inputmatch').hide();	
					}
		        }
	        	
	        /*删除标签*/
	    }).keypress(function(event){
	        /*添加标签*/
	        $(this).parent().prev().removeClass('deleted');
	        /*删除标签*/
	    }).keydown(function(event){
	        var value = $(this).attr('value');
	        var $delelement = $(this).parent().prev();
	        if(event.keyCode == 8 && value ==''){
	            $('.inputmatch1').hide();
	            $('.inputmatch').hide();
	            if($delelement.hasClass('deleted')){
	                var value3 = $delelement.find('p').attr('class');
	                $('.tab_box li').each(function(){
	                    var value4 = $(this).find('span').attr('id');
	                    if(value3 === value4){
	                        $(this).find('input').prop('checked',false);
	                    }
	                });
	                $('.match li').each(function(){
	                	$('.'+value3).parent().remove();
	                });
	                $delelement.remove();
	                var ztree=jQuery.fn.zTree.getZTreeObj("departmentTree_x210x");
	                ztree.checkNode(ztree.getNodesByParam("id", value3, null)[0],false,false);
	            }else{
	                $delelement.addClass('deleted');
	            }
	        }
	    });
	}

function xuanzhong_(){
	jQuery("#permiss_depart_x220x_div").css("display","none");
	try {
		if(jQuery("#time_msgDIV")!=null&&jQuery("#time_msgDIV")!=undefined&&jQuery("#time_msgDIV")!="undefiend"){
			jQuery("#time_msgDIV").css("display","none");
		}
	} catch (e) {
	}
	if(jQuery("#qunfacheckbox").attr("checked")=="checked"){
		    jQuery("#groupRemind").css("display","block");
		try {
			if(jQuery("#time_msgDIV")!=null&&jQuery("#time_msgDIV")!=undefined&&jQuery("#time_msgDIV")!="undefiend"){
				jQuery("#time_msgDIV").css("display","block");
			}
		} catch (e) {
		}
	}else{
		jQuery("#groupRemind").css("display","none");
	}
}
var isOK=false;
function saveDept_visible_elm(elementId) {
	isOK=true;
	setCheckNodeValue_visible_elm(elementId);
	closeDiv("_x210x");
}
function setCheckNodeValue_visible(){
	var html="";
	$('#visiableOne li').each(function(){
		var value2 = $(this)[0].className;
		if(value2!="moreninput"){
		    html+=$(this)[0].outerHTML;
		}
    });
	html+='<li class="moreninput1"><input type="text" class="defaultinput" autocomplete="off" autocapitalize="off" placeholder="请输入搜索条件"></li>';
	jQuery("#detpId_id_str_x").val(html);
}

function setCheckNodeValue_visible_elm(elementId){
	
	var html="";
	$('#visiableOne li').each(function(){
		var value2 = $(this)[0].className;
		if(value2!="moreninput"){
		    html+=$(this)[0].outerHTML;
		}
    });
	var val = $(".defaultinput").val();
	html = html+"<li class='moreninput1'>"+
	      "<textarea rows='3' cols='57' id='mobiles' class='defaultinput'  placeholder='输入或复制粘贴限500个以内号码；号码间需以逗号相隔；'></textarea>"+ 
          "</li>";
	jQuery(elementId).html(html);
	$(".defaultinput").val(val);
}
function setNode_visible(){
	var html="";
	$('#visiableOne li').each(function(){
		var value2 = $(this)[0].className;
		if(value2!="moreninput"){
		    html+=$(this)[0].outerHTML;
		}
    });
	if(html!=null&&html!=''){
		 $("#visiableTwo").html(html);
	  }
}
String.prototype.replaceAll_= function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
};
function checkAll_base_visiable(boole){
	jQuery.fn.zTree.getZTreeObj("departmentTree_x210x").checkAllNodes(boole);
}
/**************可见范围 end**************/


/**************群发提醒**************/
function closeDivTXL(showid) {
	$("#alertdiv" + showid).CloseDiv();
}
/**************群发提醒 end**************/


