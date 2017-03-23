<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>首页</title>
<link rel="stylesheet" type="text/css" href="${ctx}/css/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="${ctx}/css/easyui/themes/icon.css">
<link rel="stylesheet" type="text/css" href="${ctx}/css/easyui/demo.css">
<script type="text/javascript" src="${ctx}/js/easyui/jquery.min.js"></script>
<script type="text/javascript" src="${ctx}/js/easyui/jquery.easyui.min.js"></script>

<link rel="stylesheet" href="${ctx}/css/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="${ctx}/js/ztree/jquery.ztree.core-3.5.js"></script>

<script type="text/javascript" src="${ctx}/js/resource/resource.js"></script>


<SCRIPT type="text/javascript">
	//人员信息分页
	function pageTo(page) {
		if(!page) {
			page = $('.pagination a.nowpage').text();
			page = page || 1;
		}
	 
	  $.ajax({
	    url: '${ctx}/resource/ajaxList.do',
	    data: { pageIndex: page},
	    type: 'get',
	    success: function(html) {
	    	$('#div_resource').html(html);
	    }
	  })
	}
	function pageTo1(page) {
		alert(page);
	}
	
	$(function(){
		pageTo(1);
	});
		 
</SCRIPT>

</head>
<body>



	<div id="div_resource" >
	
	</div>


	 
</body>
</html>