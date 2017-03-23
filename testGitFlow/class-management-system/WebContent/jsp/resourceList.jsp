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
	
		 
</SCRIPT>


</head>
<body>


<!--表格-->
	<table class="table table-hover table-text-center">
		<thead>
			<tr>
				<th width="6%"><input type="checkbox" onclick="checkbox(this)"></th>
				<th width="12%">资源名</th>
				<th width="12%">类型</th>
				<th width="19%">资源地址</th>
				<th width="16%">上传人</th>
				<th width="12%">所属群组</th>
				<th width="12%">上传时间</th>
				<th width="22%">&nbsp;</th>
			</tr>
		</thead>
		<tbody>
		  <c:forEach items="${pageList.items}" var="resource">
				<tr >
					 <td>${resource.name}</td>
					 <td>
						<c:if test="${resource.type==1}">
							图片
						</c:if>
						<c:if test="${resource.type==2}">
							音频
						</c:if>
					</td>
					 
					<%-- <td><input class="check_value" type="checkbox" value="${person.id}"></td>
					<td class="casecade_edit" style="cursor: pointer;">${person.name}<c:if test="${person.isbind == 1}"><img title="已关注" src="${ctx}/contact/images/bd.gif" class="ml4"></c:if></td>
					<td class="casecade_edit" style="cursor: pointer;">${person.jobs}</td>
					<td>${person.mobileFir}</td>
					<td>${person.email}</td>
					<td>
						<c:if test="${person.sourceAccount==1}">
							临时账号
						</c:if>
						<c:if test="${person.sourceAccount==2}">
							HR同步
						</c:if>
					</td>
					<td>
						<c:if test="${person.status==1}">
							在职
						</c:if>
						<c:if test="${person.status==2}">
							禁用
						</c:if>
						<c:if test="${person.status==3}">
							离职
						</c:if>
					</td>
					<td>
						<p class="clearfix text-right lh16 ">
							<a class="iconfont ajax-request" data-override="div_new_person" href="${ctx}/person/ajax/detail/${person.id}" title="编辑">&#xe61a;</a>
							<c:if test="${person.status==1}">
								<a class="iconfont" data-override="div_new_person" onclick="changeStatus(${person.id},true)" title="禁用">&#xe649;</a>
							</c:if>
							<c:if test="${person.status==2}">
								<a class="iconfont" style="color:#67ad02;" data-override="div_new_person" onclick="changeStatus(${person.id},false)" title="启用">&#xe649;</a>
							</c:if>
							<c:if test="${person.status==3}">
								<a class="iconfont" data-override="div_new_person" onclick="changeStatus(${person.id},3)" title="禁用">&#xe649;</a>
							</c:if>
						</p>
					</td> --%>
				</tr>
			</c:forEach>
		  <c:if test="${empty pageList.items}">
			  <tr><td colspan="6" class="text-center">暂无记录</td></tr>
			</c:if>
		</tbody>
	</table>


	<!--分页-->
	<div class="text-right">
	  <ul class="pagination">
	    <c:if test="${pageList.isHasPrePage}">
	      <li><a href="javascript:pageTo(${pageList.page - 1})" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
	    </c:if>
	    <c:forEach items="${pageList.paginator.slider}" var="slider">
		    <li><a href="javascript:pageTo(${slider})" <c:if test="${slider == pageList.page}">class="nowpage"</c:if>>${slider}</a></li>
		  </c:forEach>
	    <c:if test="${pageList.isHasNextPage}">
        <li><a href="javascript:pageTo(${pageList.page + 1})" aria-label="Next"><span aria-hidden="true">»</span></a></li>
      </c:if>
	  </ul>
	</div>



	 
</body>
</html>