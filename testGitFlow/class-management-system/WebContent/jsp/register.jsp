<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="${webPath}js/jquery-1.9.1.js"></script>
<title>注册页面</title>

<script type="text/javascript">
var ctx = "${webPath}";

function register(){
	alert(ctx);
	alert("lll");
	$.ajax({
		url: "${webPath}sys/register.do",
		type: 'post',
		dataType: 'json',
		data: {
			userNmae: "hz",
			pwd:"123456"
		},
		success: function (data) {
			 alert(data);
		}
	});
	
}

</script>

</head>
<body>
	 <form action="register.do">
	 <span>用户名：</span>	<input type="text" name="userName"><br/>
	 <span>密码：</span>	<input type="text" name="pwd"><br/>
	 <input type="button" value="注册" onclick="register()"> 
	 </form>
</body>
</html>