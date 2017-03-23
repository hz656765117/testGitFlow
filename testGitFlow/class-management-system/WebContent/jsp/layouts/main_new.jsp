<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %> 
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>班级教务管理系统<sitemesh:title/></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<!--360浏览器-->
	<meta name="renderer" content="webkit">
	<!--其它双核浏览器-->
	<meta name="force-rendering" content="webkit">
	<!--如果安装了GCF，则使用GCF来渲染页面，如果没有安装GCF，则使用最高版本的IE内核进行渲染。-->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
	<link type="text/css" rel="stylesheet" href="${webPath}static/css/bootstrap/bootstrapnew.min.css?v=2017030902"/>
	<link type="text/css" rel="stylesheet" href="${webPath}static/css/bootstrap/style.minnew.css?v=2017030902"/>
	<link type="text/css" rel="stylesheet" href="${webPath}static/css/iconfont/iconfont.css?v=2017030902"/>
	<link type="text/css" rel="stylesheet" href="${webPath}static/css/admin/app.css?v=2017030902"/>
	<link type="text/css" rel="stylesheet" href="${webPath}static/js/jquery-validation/1.11.1/validate.css?v=2017030902"/>

	<!--[if lte IE 9]>
	<script type="text/javascript" src="${webPath}static/js/html5shiv/3.7/html5shiv.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/respond.js/1.4.2/respond.min.js?v=2017030902"></script>
	<![endif]-->
	<script type="text/javascript" src="${webPath}static/js/jquery/1.8.2/jquery.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/jquery-validation/1.11.1/jquery.validate.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/jquery-validation/1.11.1/messages_bs_zh.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/moment/2.15.1/moment.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/moment/2.15.1/moment-with-locales.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/handlebars/4.0.5/handlebars.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/handlebars/handlebars-jquery.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/jquery.serializejson/2.7.2/jquery.serializejson.min.js?v=2017030902"></script>
	<script type="text/javascript" src="${webPath}static/js/jquery.deserialize/1.3.3/jquery.deserialize.min.js?v=2017030902"></script>

	<sitemesh:head/>

	<script type="text/javascript">
		ctx = 'http://localhost:8080/class-management-system';
		imgPath = '${imgPath}';

		var _webPath = '${webPath}';
		var _wechatPath = '${wechatPath}';
		var _imgPath = '${imgPath}';
		var _ctx = "http://localhost:8080/class-management-system";
		$.ajaxSetup({
			cache: false //close AJAX cache
		});
	</script>
</head>

<body>
<div>
	<%@ include file="top.jsp" %>
	<div class="page-main">
		<%@ include file="left.jsp" %>
		<div class="page-content"><i class="contentbg"></i>
			<sitemesh:body/>
		</div>
	</div>
</div>

<script type="text/javascript" src="${webPath}static/js/dropdown.min.js?v=2017030902"></script><!--下拉菜单-->
<script type="text/javascript" src="${webPath}static/js/layer/layer.js?v=2017030902"></script><!--layer弹层-->
<script type="text/javascript" src="${webPath}static/js/admin.js?v=2017030902"></script><!--后台整站公用JS 前端人员编写-->
<script type="text/javascript" src="${webPath}static/js/jquery-placeholder/2.0.0/jquery.placeholder.min.js?v=2017030902"></script><!--input输入框占位符-->
<script type="text/javascript" src="${webPath}static/js/My97DatePicker/WdatePicker.js?v=2017030902"></script>
<script type="text/javascript" src="${webPath}static/js/box/ajax-setting.js?v=2017030902"></script>

</body>
</html>