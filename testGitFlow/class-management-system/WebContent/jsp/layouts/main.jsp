<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<!-- <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" /> -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1"/>
	<link rel="shortcut icon" href="/favicon.ico"/>
	<link type="text/css" rel="stylesheet" href="${webPath}css/common.css?v=2017030902"/>
	<link type="text/css" rel="stylesheet" href="${webPath}css/admin/admin.css?v=2017030902"/>
	<link type="text/css" rel="stylesheet" href="${webPath}css/admin/index.css?v=2017030902"/>
	<link type="text/css" rel="stylesheet" href="${webPath}css/bootstrap/bootstrap.min.css?v=2017030902"/>
	<script type="text/javascript" src="${webPath}static/js/jquery/1.8.2/jquery.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}js/admin.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/modal.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}js/jquery.divbox.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}js/public.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}js/visible.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/moment/2.15.1/moment.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/moment/2.15.1/moment-with-locales.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/handlebars/4.0.5/handlebars.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/handlebars/handlebars-jquery.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/layer/layer.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/box/ajax-setting.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/jquery.serializejson/2.7.2/jquery.serializejson.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/jquery.deserialize/1.3.3/jquery.deserialize.min.js?v=2017030902"></script>

	<script type="text/javascript">
		var webPath = '${webPath}';
		var imgPath = '${imgPath}';
		var ctx = "${webPath}";
		var _webPath = '${webPath}';
		var _wechatPath = '${wechatPath}';
		var _imgPath = '${imgPath}';
		var _ctx = "${webPath}";
		/* 此处js共用 */
		$(function() {
			moment.locale('zh-cn');
		});

	</script>
	<title>微加</title>
</head>
<body class="">

<%@include file="../layouts/top.jsp" %>
<div class="page-main">
	<%@include file="../layouts/left.jsp" %>
	<div id="yy" class="page-content">
		<i class="contentbg"></i>
		<decorator:body/>
	</div>
</div>
</body>
</html>