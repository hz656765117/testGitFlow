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
		})
	/*隔行变色*/
	jQuery('.mytable tr:even,.card-list li:odd').addClass('bg-hui04');
}
/*后台导航*/
jQuery('.mymenu h3').click(function(){
	jQuery(this).parent().find('.menu01').toggle().parent().siblings().find('.menu01').hide();
  })
/*编辑和删除*/ 
jQuery('.caozuo tr').hover(function(){
	jQuery(this).find('.operate').show();
  },function(){
	jQuery(this).find('.operate').hide();  
})
jQuery("input[class*=graytips]") //所有样式名中含有graytips的input默认为灰输入时为黑色  
.each(function(){   
   var oldVal=jQuery(this).val();   //默认的提示性文本   
   jQuery(this)   
   .css({"color":"#ccc"}) //灰色   
   .focus(function(){   
    if(jQuery(this).val()!=oldVal){jQuery(this).css({"color":"#333"})}else{jQuery(this).val("").css({"color":"#ccc"})}   
   })   
   .blur(function(){   
    if(jQuery(this).val()==""){jQuery(this).val(oldVal).css({"color":"#ccc"})}   
   })   
   .keydown(function(){jQuery(this).css({"color":"#333"})})   
  })  		
})
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
function closeMeetDiv(showid) {
	if (jQuery("#alertdiv"+showid).data('flag')) {
		jQuery("#alertdiv"+showid).data('flag', false);
	}
jQuery("#alertdiv"+showid).CloseDiv();
} 

	
//弹出层01
function openDiv1(showid) { 
jQuery(".user-pop").hide(); 
 windowHeight = jQuery(".parents").height(),//获取相对定位元素高度 
 windowWidth = jQuery(".parents").width(),//获取相对定位元素宽度 
 popupHeight = jQuery("#alertdiv"+showid).height(),//获取弹出层高度 
 popupWeight = jQuery("#alertdiv"+showid).width();//获取弹出层宽度 
 posiTop = (windowHeight-popupHeight)/2; 
 posiLeft = (window.screen.width-popupWeight)/6; 
 jQuery("#alertdiv"+showid).css({
    "left":posiLeft + "px","top":document.body.scrollTop + "px"
    });
 jQuery("#alertdiv"+showid).show();
} 

/**************可见范围**************/
function getPermissDepartIds_(){
	if(jQuery("#detpId_id_str_x").val()=="" && isOK){
		return "-9";
	}else if(jQuery("#detpId_name_str_x").val()==undefined){
		if(temp_ids==''){
			temp_ids='-9';
		}
		return temp_ids;
	}else{
		if(isOK){
			return jQuery("#detpId_id_str_x").val();
		}else{
			return temp_ids;
		}
		
	}
}
function getPermissDepartNames_(){
	if(jQuery("#detpId_name_str_x").val()=="" && isOK){
		return "全体成员";
	}else if(jQuery("#detpId_name_str_x").val()==undefined){
		jQuery("#detpId_id_str_x").val(temp_ids);
		if(temp_names==''){
			temp_names='全体成员';
		}
		return temp_names;
	}else{
		if(isOK){
			return jQuery("#detpId_name_str_x").val();
		}else{
			return temp_names;
		}
		
	}
}
function setPermiss_depart_x210x(permissStr,webPath){
	setHtml_x210x();
	openDiv("_x210x");
	if(jQuery("#detpId_id_str_x").val()==undefined||jQuery("#detpId_id_str_x").val()==null||jQuery("#detpId_id_str_x").val()==""){
		jQuery("#detpId_id_str_x").val(permissStr);
	}  
	if(jQuery.fn.zTree.getZTreeObj("departmentTree_x210x")==null||jQuery.fn.zTree.getZTreeObj("departmentTree_x210x")==undefined){
		initTree(webPath);
		return false;
	}
	checkNode_x210x()
}
function checkNode_x210x(){
	var ztree=jQuery.fn.zTree.getZTreeObj("departmentTree_x210x");
	jQuery("#option_x210x").attr("checked",null);
	checkAll_base(false);
	if(jQuery("#detpId_id_str_x").val()!=null&&jQuery("#detpId_id_str_x").val()!=""){
		if(jQuery("#detpId_id_str_x").val()=="-9"){
			jQuery("#option_x210x").attr("checked","checked");
			checkAll_base(true);
		}else{
			var str=jQuery("#detpId_id_str_x").val().split(","); 
			for(var x=0;x<str.length;x++){
				try {
					ztree.checkNode(ztree.getNodesByParam("id", str[x]*-1, null)[0],true,false);
				} catch (e) {
				}
			}
		}
	}
}
function initTree(webPath){
	var setting_x210x = {
		check : {
			enable : true,
			chkStyle : "checkbox",
			chkboxType : {
				"Y" : "s",
				"N" : "s"
			}
		},
		async : {
			enable : true,
			url : webPath+"contacts/getNodeDept?type=-999",
			autoParam : [ "id" ],
			dataFilter : filter_x210x
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
			onCheck : checkDept_x210x,
			onAsyncSuccess : onAsyncSuccess_x210x
		}
	};
   jQuery.fn.zTree.init(jQuery("#departmentTree_x210x"), setting_x210x);
}

function zTreeOnNodeCreated_x210x(event, treeId, treeNode) {
	checkNode_x210x(jQuery("#detpId_id_str_x").val());
}
function checkDept_x210x(e, treeId, treeNode) {};
function filter_x210x(treeId, parentNode, childNodes) {
	if (!childNodes.obj)return null;
	for (var i = 0, l = childNodes.obj.length; i < l; i++) {
		if(childNodes.obj[i].id>0){
			childNodes.obj[i].isParent = true;
		}
		childNodes.obj[i].name = childNodes.obj[i].name.replace(/\.n/g, '.');
	}
	return childNodes.obj;
}
var tree_x210x_Status="init";
function onAsyncSuccess_x210x(event, treeId, treeNode, msg) {
	var treeObj = jQuery.fn.zTree.getZTreeObj(treeId);
	var nodes = treeObj.getNodes();
	if(tree_x210x_Status=="init"){
		treeObj.expandNode(nodes[0]);
		zTreeOnNodeCreated_x210x();
		tree_x210x_Status="";
	} 
	asyncNodes(treeObj.getNodes(),"departmentTree_x210x");
	zTreeOnNodeCreated_x210x();
}
/**
 * 递归加载所有用户
 * @param nodes
 */
function asyncNodes(nodes,tree) {
	if (!nodes) return;
	var zTree = $.fn.zTree.getZTreeObj(tree);
	for (var i=0, l=nodes.length; i<l; i++) {
		if (nodes[i].isParent && nodes[i].zAsync) {
			asyncNodes(nodes[i].children,tree);
		} else {
			zTree.reAsyncChildNodes(nodes[i], "refresh", true);
		}
	}
}


function checkAll_x210x(dom){
   if(dom.checked){
	  checkAll_base(true);
   }else{
	  checkAll_base(false);
   }
}

function checkAll_base(boole){
	jQuery.fn.zTree.getZTreeObj("departmentTree_x210x").checkAllNodes(boole);
}

var isOK=false;
function saveDept_x210x() {
	isOK=true;
	setCheckNodeValue_x210x();
	closeDiv("_x210x");
	_x210x_();
}
function setCheckNodeValue_x210x(){
	var xd=jQuery.fn.zTree.getZTreeObj("departmentTree_x210x").getCheckedNodes(false);
	if(jQuery("#option_x210x").attr("checked")=="checked"&&(xd==null||xd.length<1)){
		 jQuery("#detpId_id_str_x").val("-9");
		 jQuery("#detpId_name_str_x").val("全体成员");
		 return false;
	}
    var checkNodes=jQuery.fn.zTree.getZTreeObj("departmentTree_x210x").getCheckedNodes(true);
    var temp_id="";
    var temp_name="";
    if(checkNodes!=null){
	   for(var x=0;x<checkNodes.length;x++){
		   if(checkNodes[x].id<0){
			   temp_id+=","+checkNodes[x].id*-1+",";
			   if(x==0)temp_name+=checkNodes[x].name+",";
			   else temp_name+=","+checkNodes[x].name+",";
		   }
		   
	   }
    }
    jQuery("#detpId_id_str_x").val(temp_id.replaceAll_(",,",","));
    jQuery("#detpId_name_str_x").val(temp_name.replaceAll_(",,",","));
    if(jQuery("#detpId_id_str_x").val()==null||jQuery("#detpId_id_str_x").val()==""){
		 jQuery("#detpId_id_str_x").val("-9");
		 jQuery("#detpId_name_str_x").val("全体成员");
		 return false;
    }
}
function setHtml_x210x(){
	if(jQuery("#detpId_name_str_x").val()!=undefined){
		return false;
	}
	jQuery(document.body).append(
			'<div class="neirong-pop user-pop pos-abs bg-bai display-no" id="alertdiv_x210x" >'
			  +'<a href="javascript:void(0)" onclick="closeDiv(\'_x210x\')" class="fr f14 blue mr14 mt10">关闭</a>'
				+'<div class="pt15 pb20 pl20 mr20">'
					+'<br/>'
					+'<input type="hidden" id="detpId_name_str_x" value="" />'
					+'<input type="hidden" id="detpId_id_str_x" value="" />'
					+'<div class="clearfix">'
						+'<div class="" style="width:549px">'
						+'<p class="lh22 mt15 pb15 f14">选择可见范围(不选即为对全体成员公开可见)<label class="fr"><input type="checkbox" id="option_x210x" onclick="checkAll_x210x(this);" />&nbsp;全选/反选</label></p>'
							+'<div class="bd-xu-hui01 over-auto h395 bg-hui">'
							+'<ul id="departmentTree_x210x" class="ztree"></ul>'
							+'</div>'
							+'</div>'
							+'</div>'
					+'<div class="pt20 text-center">'
					+'<a href="javascript:void(0);" onclick="saveDept_x210x()" class="f20 bai bg-huang-cur display-ib lh38 h38 bd-huang01 br4 text-center w138">确 定</a> <a href="javascript:void(0)" onclick="closeDiv(\'_x210x\')" class="f20 hui display-ib w138 btn-bg02 bd-hui01 lh38 h38 br4 text-center ml6">取 消</a>'
					+'</div>'
					+'</div>'
					+'</div>;'
	);
}
String.prototype.replaceAll_= function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}
/**************可见范围 end**************/



/**************群发提醒**************/
function getPermissDepartIds_x220x(){
	if(jQuery("#qunfacheckbox").attr("checked")=="checked"){
		if(_p_str==""){
			return "-9";
		}else{
			return _p_str;
		}
	}else{
		return "";
	}
}
function getPermissDepartNames_x220x(){
	if(jQuery("#qunfacheckbox").attr("checked")=="checked"){
		if(_d_str==""){
			return "全体成员";
		}else{
			return _d_str;
		}
	}else{
		return "";
	}
}
function setPermiss_depart_x220x(webPath){
	setHtml_x220x();
	openDiv("_x220x");
	if(jQuery.fn.zTree.getZTreeObj("departmentTree_x220x")==null||jQuery.fn.zTree.getZTreeObj("departmentTree_x220x")==undefined){
		initTree_x220x(webPath);
		return false;
	}
	checkNode_x220x();
}
function checkNode_x220x(){
	var ztree=jQuery.fn.zTree.getZTreeObj("departmentTree_x220x");
	jQuery("#option_x220x").attr("checked",null);
	checkAll_base_x220x(false);
	if(_p_str!=null&&_p_str!=""){
		if(_p_str=="-9"){
			jQuery("#option_x220x").attr("checked","checked");
			checkAll_base_x220x(true);
		}else{
			var str=_p_str.split(","); 
			for(var x=0;x<str.length;x++){
				try {
					ztree.checkNode(ztree.getNodesByParam("id", str[x]*-1, null)[0],true,false);
				} catch (e) {
				}
			}
		}
	}
}
function initTree_x220x(webPath){
	var setting_x220x = {
		check : {
			enable : true,
			chkStyle : "checkbox",
			chkboxType : {
				"Y" : "s",
				"N" : "s"
			}
		},
		async : {
			enable : true,
			url : webPath+"contacts/getNodeDept?type=-999",
			autoParam : [ "id" ],
			dataFilter : filter_x220x
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
			onCheck : checkDept_x220x,
			onAsyncSuccess : onAsyncSuccess_x220x
		}
	};
   jQuery.fn.zTree.init(jQuery("#departmentTree_x220x"), setting_x220x);
}

function checkDept_x220x(e, treeId, treeNode) {};
function filter_x220x(treeId, parentNode, childNodes) {
	if (!childNodes.obj)return null;
	for (var i = 0, l = childNodes.obj.length; i < l; i++) {
		if(childNodes.obj[i].id>0){
			childNodes.obj[i].isParent = true;
		}
		childNodes.obj[i].name = childNodes.obj[i].name.replace(/\.n/g, '.');
	}
	return childNodes.obj;
}
var tree_x220x_Status="init";
function onAsyncSuccess_x220x(event, treeId, treeNode, msg) {
	var treeObj = jQuery.fn.zTree.getZTreeObj(treeId);
	var nodes = treeObj.getNodes();
	if(tree_x220x_Status=="init"){
		treeObj.expandNode(nodes[0]);
		checkNode_x220x();	
		tree_x220x_Status="";
	}
	asyncNodes(treeObj.getNodes(),"departmentTree_x220x");
	checkNode_x220x();
	
}
function checkAll_x220x(dom){
   if(dom.checked){
	  checkAll_base_x220x(true);
   }else{
	  checkAll_base_x220x(false);
   }
}

function checkAll_base_x220x(boole){
	jQuery.fn.zTree.getZTreeObj("departmentTree_x220x").checkAllNodes(boole);
}
function saveDept_x220x() {
	setCheckNodeValue_x220x();
}
function setCheckNodeValue_x220x(){
	var xd=jQuery.fn.zTree.getZTreeObj("departmentTree_x220x").getCheckedNodes(false);
	if(jQuery("#option_x220x").attr("checked")=="checked"&&(xd==null||xd.length<1)){
		_p_str="-9";
		_d_str="全体成员";
	    jQuery("#detpId_name_str_x_x220x").val("全体成员");
	    closeDiv("_x220x");
	    
	    try{
			if(typeof(callback_x220x)!="undefined"&&typeof(callback_x220x)=="function"){
				callback_x220x();
			}
		}catch (e) {
		}
	    return false;
	}
    var checkNodes=jQuery.fn.zTree.getZTreeObj("departmentTree_x220x").getCheckedNodes(true);
    var temp_id="";
    var temp_name="";
    if(checkNodes!=null){
	   for(var x=0;x<checkNodes.length;x++){
		   if(checkNodes[x].id<0){
			   if(temp_id.indexOf(","+checkNodes[x].id+",") <0)
			         temp_id+=","+(checkNodes[x].id*-1)+",";
			   if(temp_name==""){
				   temp_name=checkNodes[x].name+"；";
			   }else{
				   if(temp_name.indexOf("；"+checkNodes[x].name+"；") <0)
				       temp_name+="；"+checkNodes[x].name;
			   }
		   }
	   }
    }
    _p_str=temp_id.replaceAll_(",,",",");
    _d_str=temp_name.replaceAll_("；；","；");
    jQuery("#detpId_name_str_x_x220x").val(_d_str);
    if(_p_str==""){
    	openDiv("_x220x_");
    	jQuery("#qunfacheckbox").attr("checked",null);
    	jQuery("#permiss_depart_x220x_div").css("display","none");
    }else{
    	jQuery("#qunfacheckbox").attr("checked","checked");
    	jQuery("#permiss_depart_x220x_div").css("display","block");
    	closeDiv("_x220x");
    }
    try{
		if(typeof(callback_x220x)!="undefined"&&typeof(callback_x220x)=="function"){
			callback_x220x();
		}
	}catch (e) {
	}
}
function go_x220x(){
	closeDiv("_x220x_");
	closeDiv("_x220x");
	$("html").css("overflow","");
}


function cencle(){
	closeDiv("_x220x_");
	$("html").css("overflow","");
}
function setHtml_x220x(){
	if(jQuery("#alertdiv_x220x")!=undefined&&jQuery("#alertdiv_x220x").html()!=undefined&&jQuery("#alertdiv_x220x").html()!="")	return false;
	jQuery(document.body).append(
			'<div class="neirong-pop pos-abs bg-bai display-no" id="alertdiv_x220x" >'
			  +'<a href="javascript:void(0)" onclick="closeDiv(\'_x220x\')" class="fr f14 blue mr14 mt10">关闭</a>'
				+'<div class="pt15 pb20 pl20 mr20">'
					+'<br/>'
					+'<div class="clearfix">'
						+'<div class="" style="width:549px">'
						+'<p class="lh22 mt15 pb15 f14">选择成员<label class="fr"><input type="checkbox" id="option_x220x" onclick="checkAll_x220x(this);" />&nbsp;全选/反选</label></p>'
							+'<div class="bd-xu-hui01 over-auto h395 bg-hui">'
							+'<ul id="departmentTree_x220x" class="ztree"></ul>'
							+'</div>'
							+'</div>'
							+'</div>'
					+'<div class="pt20 text-center">'
					+'<a href="javascript:void(0);" onclick="saveDept_x220x()" class="f20 bai bg-huang-cur display-ib lh38 h38 bd-huang01 br4 text-center w138">确 定</a> <a href="javascript:void(0)" onclick="closeDiv(\'_x220x\')" class="f20 hui display-ib w138 btn-bg02 bd-hui01 lh38 h38 br4 text-center ml6">取 消</a>'
					+'</div>'
					+'</div>'
					+'</div>;');
					
	jQuery(document.body).append('<div class="pos-abs pop-up bg-hui01 display-no w390 pt10" id="alertdiv_x220x_">'
			+'<div class="pt36 pl28 mr30 text-center">'
			+'<p class="f16 hei01">'+tipHtml+'</p>'
			+'<p class="text-center pt36 mb30 pb4">'
			+'<a href="javascript:void(0);" onclick="go_x220x()" class="f20 bai bg-lv-cur display-ib lh38 h38 bd-lv br4 text-center w120">是</a><a href="javascript:void(0)" onclick="cencle()" class="f20 hui display-ib w120 btn-bg02 bd-hui01 lh38 h38 br4 text-center ml10">否</a>'
			+'</p>'
			+'</div>'
			+'</div>');
}
String.prototype.replaceAll_= function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
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
		try {
			if(jQuery("#time_msgDIV")!=null&&jQuery("#time_msgDIV")!=undefined&&jQuery("#time_msgDIV")!="undefiend"){
				jQuery("#time_msgDIV").css("display","block");
			}
		} catch (e) {
		}
		jQuery("#permiss_depart_x220x_div").css("display","block");
		if(_action_=="add"||(_action_!="add"&&_p_str=="")){
			_p_str="-9";
			_d_str="全体成员";
			$("#detpId_name_str_x_x220x").val(_d_str);
		}
	}
}

var _p_str="";
var _d_str="";
var _action_="";
function _intPDate(p,d,a){
	_p_str=p;
	_d_str=d;
	_action_=a;
	if(p!=null&&p!=""){
		jQuery("#qunfacheckbox").attr("checked","checked");
		jQuery("#permiss_depart_x220x_div").css("display","block");
		$("#detpId_name_str_x_x220x").val(d);
		try {
			if(jQuery("#time_msgDIV")!=null&&jQuery("#time_msgDIV")!=undefined&&jQuery("#time_msgDIV")!="undefiend"){
				jQuery("#time_msgDIV").css("display","block");
			}
		} catch (e) {
		}
	}
}
 
/**************群发提醒 end**************/


//获取所有人员
function getTreeAllNodes(){
	var ztree=jQuery.fn.zTree.getZTreeObj("departmentTree_x210x");
//	console.log(ztree.getCheckedNodes());
	var s='';
	$.each(ztree.getCheckedNodes(),function(i){
		if(!this.isParent && s.indexOf(this.id*-1)<0){
			s+=this.id*-1+",";
		}
	});
	
	return s;
}