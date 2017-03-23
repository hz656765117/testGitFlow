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
	        	<c:if test="${not empty teacher.teacherKey}">
		          	<h2 id="surveytitle" class="f18 hei01 nobold lh30">修改教师信息</h2>
		        </c:if>
	        	<c:if test="${empty teacher.teacherKey}">
		          	<h2 id="surveytitle" class="f18 hei01 nobold lh30">新增教师信息</h2>
		        </c:if>
	        </div>
      		<div class="m0a" style="margin-top:42px;width:480px">
		        <div class="f14 lh30  hei01  mt20 clearfix">
		          <label class="f14 fl hei01 w80 fl lh30 text-right">教师工号<c:if test="${empty teacher.teacherKey}"><font color="red">*</font></c:if>：</label>
		          <c:if test="${not empty teacher.teacherKey}">
		          	<input id="type" type="hidden" value="update"/>
		          	<input id="teacherKey" type="hidden" value="${teacher.teacherKey}" >
		          	${teacher.teacherKey}
		          </c:if>
		           <c:if test="${empty teacher.teacherKey}">
		          	<input id="type" type="hidden" value="0"/>
		          	<input id="teacherKey" type="text" value="${teacher.teacherKey}" placeholder="请输入教师工号" class="lh28 h28 w322 pl10 bd-hui02 fl ml10">
		          </c:if>
		        </div>
		         <div class="f14 lh30  hei01  mt20 clearfix">
		          <label class="f14 fl hei01 w80 fl lh30 text-right">教师姓名<font color="red">*</font>：</label>
		          <input id="name" type="text" value="${teacher.name}" placeholder="请输入教师姓名" class="lh28 h28 w322 pl10 bd-hui02 fl ml10">
		        </div>
		         <div class="f14 lh30  hei01  mt20 clearfix">
		          <label class="f14 fl hei01 w80 fl lh30 text-right">性别<font color="red">*</font>：</label>
		          <input type="radio" value="1" name="sex" <c:if test="${teacher.sex!='2'}">checked="checked"</c:if>>男
		          <input type="radio" value="1" name="sex" <c:if test="${teacher.sex=='2'}">checked="checked"</c:if>>女
		        </div>
		        <div class="f14 lh30  hei01  mt20 clearfix">
		          <label class="f14 fl hei01 w80 fl lh30 text-right">身份证号：</label>
		          <input id="idcardNumber" type="text" value="${teacher.idcardNumber}" placeholder="请输入教师身份证号" class="lh28 h28 w322 pl10 bd-hui02 fl ml10">
		        </div>
		        <div class="f14 lh30  hei01  mt20 ml10 clearfix">
			       	<label class="f14 fl hei01 w80 fl lh30 text-right">&nbsp;</label>
			       	<p id="msg" style="color: red;"></p>
			       	<a onclick="createTeacher()" href="javascript:void(0)" class="f16 bai bg-huang-cur display-ib lh38 h38 bd-huang01 br4 text-center w158">保存</a>
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
	window.location.href=webPath+"basicDataMng/teacherMng/index.do";
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
function createTeacher(){
	if($.trim($('#teacherKey').val())==''){
		$('#msg').html("教师工号不能为空！");
		return false;
	}
	if($.trim($('#name').val())==''){
		$('#msg').html("教师姓名不能为空！");
		return false;
	}
	 
	var parameters={};
	parameters['teacherKey']=$('#teacherKey').val();
	parameters['name']=$('#name').val();
	parameters['idcardNumber']=$('#idcardNumber').val();
	parameters['sex']=$("input[name=sex]:checked").val();
	
	var url = "${webPath}basicDataMng/teacherMng/insertTeacher.do";
	if ( $('#type').val() =='update') {
		url = "${webPath}basicDataMng/teacherMng/updateTeacher.do";
	}
 
	$.ajax({
		url : url,
		data : parameters,
		type : 'post',
		cache : false,
		dataType : 'json',
		success : function(data) {
			if(data.success!=null&&data.success){
				location.href = "${webPath}basicDataMng/teacherMng/index.do";
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