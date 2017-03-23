<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<link type="text/css" rel="stylesheet" href="${webPath}css/weishequ.css?v=2017030902">
<link type="text/css" rel="stylesheet" href="${webPath}css/common.css?v=2017030902">
<link rel="stylesheet" href="${webPath}js/ztree/css/zTreeStyle.css?v=2017030902" />
<link type="text/css" rel="stylesheet" href="${webPath}css/admin/viewrange.css?v=2017030902"/>
<%-- <script type="text/javascript" src="${webPath}/static/js/box/viewrange/viewrange.js?v=2017030902"></script> --%>


<style>
.reviewrange {
margin-top: 15px;
margin-left: 10px;
}
</style>

<div class="clearfix parents">
	<div class="mt20 bg-bai clearfix over-hidden" style="height:auto!important; height:800px; min-height:800px;">
    	<div class="">
	        <div class=" pos-rel mt14 pb10 ml20 mr20 bb-hui02 text-center clearfix"> <a href="javascript:void(0);" onclick="back()" class="w78 bd-hui02 display-ib text-center h28 lh26 f14 btn-hui01 pos-tp0"><i class="icon-bg icon-back">返回</i></a>
	        	<c:if test="${not empty academy.academyKey}">
		          	<h2 id="surveytitle" class="f18 hei01 nobold lh30">修改学院信息</h2>
		        </c:if>
	        	<c:if test="${empty academy.academyKey}">
		          	<h2 id="surveytitle" class="f18 hei01 nobold lh30">新建学院</h2>
		        </c:if>
	        </div>
      		<div class="m0a" style="margin-top:42px;width:480px">
		        <div class="f14 lh30  hei01  mt20 clearfix">
		          <label class="f14 fl hei01 w80 fl lh30 text-right">学院代码<c:if test="${empty academy.academyKey}"><font color="red">*</font></c:if>：</label>
		          <c:if test="${not empty academy.academyKey}">
		          	<input id="type" type="hidden" value="update"/>
		          	<input id="academyKey" type="hidden" value="${academy.academyKey}" >
		          	${academy.academyKey}
		          </c:if>
		           <c:if test="${empty academy.academyKey}">
		          	<input id="type" type="hidden" value="0"/>
		          	<input id="academyKey" type="text" value="${academy.academyKey}" placeholder="请输入学院代码" class="lh28 h28 w322 pl10 bd-hui02 fl ml10">
		          </c:if>
		        </div>
		         <div class="f14 lh30  hei01  mt20 clearfix">
		          <input id="id" type="hidden" value="${activity.activityKey}"/>
		          <label class="f14 fl hei01 w80 fl lh30 text-right">学院名称<font color="red">*</font>：</label>
		          <input id="academyName" type="text" value="${academy.academyName}" placeholder="请输入学院名称" class="lh28 h28 w322 pl10 bd-hui02 fl ml10">
		        </div>
		        <div class="f14 lh30  hei01  mt20 ml10 clearfix">
			       	<label class="f14 fl hei01 w80 fl lh30 text-right">&nbsp;</label>
			       	<p id="msg" style="color: red;"></p>
			       	<a onclick="createAcademy()" href="javascript:void(0)" class="f16 bai bg-huang-cur display-ib lh38 h38 bd-huang01 br4 text-center w158">保存</a>
			       	<a onclick="back();" href="javascript:void(0);" class="f16 hui display-ib w158 btn-bg02 bd-hui01 lh38 h38 br4 text-center  ml10">取消</a>
		        </div>
      		</div>
    	</div>
	</div>
</div>
<%-- <jsp:include page="/pages/module/common/view_range_model.jsp"></jsp:include> --%>
<script type="text/javascript" src="${webPath}static/js/app.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}static/js/My97DatePicker/WdatePicker.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}js/ztree/js/jquery.ztree.all-3.5.min.js?v=2017030902"></script>
<script>
var webPath="${webPath}";
$(function(){
 
	var surveyId = "${survey.id}";
	 
	
	init();
});

function init(){ 
	var head="${survey.head}"; 
	var tail="${survey.tail}";
	$("#head").val(head.replaceAll("###","\n")); 
	$("#tail").val(tail.replaceAll("###","\n")); 
}
String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}
 

 
 //返回
function back(){
	window.location.href=webPath+"basicDataMng/academyMng/index.do";
}
function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^x00-xff]/ig) != null){ //全角
     	   var reg = /\s/g;
          if(reg.test(val[i])){
         	 len += 1;
          }else{
         	 len += 1;
          }
        }else{
     	   len += 1;
        }
    }
    return len;
}
//保存
function createAcademy(){
	if($.trim($('#academyKey').val())==''){
		$('#msg').html("学院代码不能为空！");
		return false;
	}
	if($.trim($('#academyName').val())==''){
		$('#msg').html("学院名称不能为空！");
		return false;
	}
	 
	var parameters={};
	parameters['academyKey']=$('#academyKey').val();
	parameters['academyName']=$('#academyName').val();
	
	var url = "${webPath}basicDataMng/academyMng/insertAcademy.do";
	if ( $('#type').val() =='update') {
		url = "${webPath}basicDataMng/academyMng/updateAcademy.do";
	}
 
	$.ajax({
		url : url,
		data : parameters,
		type : 'post',
		cache : false,
		dataType : 'json',
		success : function(data) {
			if(data.success!=null&&data.success){
				location.href = "${webPath}basicDataMng/academyMng/index.do";
			}else{
				alert(data.msg);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			/* alert("会话已过期,请重新登陆"); */
			/* location.href = "${webPath}"; */
		}
	});
}

 Date.prototype.format =function(format){
		var o = {
			"M+" : this.getMonth()+1, //month
			"d+" : this.getDate(), //day
			"h+" : this.getHours(), //hour
			"m+" : this.getMinutes(), //minute
			"s+" : this.getSeconds(), //second
			"q+" : Math.floor((this.getMonth()+3)/3), //quarter
			"S" : this.getMilliseconds() //millisecond
		}
		if(/(y+)/.test(format)) format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4- RegExp.$1.length));
		for(var k in o)if(new RegExp("("+ k +")").test(format))
		format = format.replace(RegExp.$1,RegExp.$1.length==1? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
		return format;
	}
</script>