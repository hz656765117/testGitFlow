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




<%-- <link rel="stylesheet" href="${ctx}/css/ztree/demo.css" type="text/css"> --%>
<link rel="stylesheet" href="${ctx}/css/ztree/zTreeStyle/zTreeStyle.css" type="text/css">
<%-- <script type="text/javascript" src="${ctx}/js/ztree/jquery-1.4.4.min.js"></script> --%>
<script type="text/javascript" src="${ctx}/js/ztree/jquery.ztree.core-3.5.js"></script>


<SCRIPT type="text/javascript">
		var setting = {
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				/* beforeClick: beforeClick, */
				onClick: onClick
			}
		};

		var zNodes =[
			{ id:1, pId:0, name:"小组管理", open:true},
			{ id:11, pId:1, name:"小组列表" ,data :"www.baidu.com"},
			/* { id:111, pId:11, name:"叶子节点111"},
			{ id:112, pId:11, name:"叶子节点112"},
			{ id:113, pId:11, name:"叶子节点113"},
			{ id:114, pId:11, name:"叶子节点114"}, */
			{ id:12, pId:1, name:"父节点12 - 折叠"},
			{ id:121, pId:12, name:"叶子节点121"},
			{ id:122, pId:12, name:"叶子节点122"},
			{ id:123, pId:12, name:"叶子节点123"},
			{ id:124, pId:12, name:"叶子节点124"},
			{ id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
			{ id:2, pId:0, name:"手机用户管理"},
			{ id:21, pId:2, name:"父节点21 - 展开", open:true},
			{ id:211, pId:21, name:"叶子节点211"},
			{ id:212, pId:21, name:"叶子节点212"},
			{ id:213, pId:21, name:"叶子节点213"},
			{ id:214, pId:21, name:"叶子节点214"},
			{ id:22, pId:2, name:"父节点22 - 折叠"},
			{ id:221, pId:22, name:"叶子节点221"},
			{ id:222, pId:22, name:"叶子节点222"},
			{ id:223, pId:22, name:"叶子节点223"},
			{ id:224, pId:22, name:"叶子节点224"},
			{ id:23, pId:2, name:"父节点23 - 折叠"},
			{ id:231, pId:23, name:"叶子节点231"},
			{ id:232, pId:23, name:"叶子节点232"},
			{ id:233, pId:23, name:"叶子节点233"},
			{ id:234, pId:23, name:"叶子节点234"},
			{ id:3, pId:0, name:"资源管理", isParent:true}
		];

		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			/* $("#tt").tabs(); */
		});
		
		
		function onClick(event, treeId, treeNode, clickFlag) {
			addTab('tt',11,'google',treeNode.data)
		}
		
		function addTab(id,uid,title, url){
			alert(url);
			if ($('#'+id).tabs('exists', title)){
				$('#'+id).tabs('select', title);
			} else {
				var content = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
				$('#tt').tabs('add',{
					title:title,
					uid:uid,
					content:content,
					closable:true
				});
			}
		}
		 
	</SCRIPT>


</head>
<body class="easyui-layout">
	<div data-options="region:'north',border:false" style="height:60px;background:#B3DFDA;padding:10px">
	顶部信息
	</div>
	<div data-options="region:'west',split:true,title:'West'" style="width:150px;padding:10px;">
		<ul id="treeDemo" class="ztree"></ul>
	</div>
<!-- 	<div data-options="region:'east',split:true,collapsed:true,title:'East'" style="width:100px;padding:10px;">
	east region
	</div> -->
	<div data-options="region:'south',border:false" style="height:50px;background:#A9FACD;padding:10px;">
		底部信息
	</div>
	 <div data-options="region:'center',title:'Center',border:'none'">
		主要内容
	 	<div style="margin-bottom:10px">
			<a href="#" class="easyui-linkbutton" onclick="addTab('tt',11,'google','http://www.google.com')">google</a>
			<a href="#" class="easyui-linkbutton" onclick="addTab('tt',22,'jquery','http://jquery.com/')">jquery</a>
			<a href="#" class="easyui-linkbutton" onclick="addTab('tt',33,'easyui','http://jeasyui.com/')">easyui</a>
		</div>
	<div id="tt" class="easyui-tabs" style="width:400px;height:250px;">
			<div title="Home">
			</div>
		</div> 
		
	
	</div>  
	<div>
	sssssssssssssss
	</div>
</body>
</html>