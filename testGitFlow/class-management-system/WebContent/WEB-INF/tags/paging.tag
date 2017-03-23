<%@tag pageEncoding="UTF-8" %>
<%@ attribute name="pageNumber" type="java.lang.Integer" required="true" %>
<%@ attribute name="totalPages" type="java.lang.Integer" required="true" %>
<%@ attribute name="url" type="java.lang.String" required="true" %>

<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!--分页-->
<div class="clearfix">
	<div class="pagination fr">
		<c:if test="${pageNumber<=1 }">
			<span class="disabled">&lt; 上一页 </span>
		</c:if>
		<c:if test="${pageNumber>1 }">
			<a href="${url}${pageNumber-1}">< 上一页 </a>
		</c:if>
		<c:choose>
			<c:when test="${pageNumber - 2 > 0 && totalPages - pageNumber >= 2}">
				<c:set var="start" value="${pageNumber-2}" />
			</c:when>
			<c:when test="${totalPages - pageNumber < 2 && totalPages - 4 > 0}">
				<c:set var="start" value="${totalPages - 4}" />
			</c:when>
			<c:otherwise>
				<c:set var="start" value="1" />
			</c:otherwise>
		</c:choose>
		<c:choose>
			<c:when test="${pageNumber + 3 >= totalPages}">
				<c:set var="end" value="${totalPages}" />
			</c:when>
			<c:when test="${start+4 <= totalPages }">
				<c:set var="end" value="${start+4}" />
			</c:when>
		</c:choose>
		<c:if test="${pageNumber-3 > 0}">
			<span title="" class="ft-arial">...</span>
		</c:if>
		<c:forEach begin="${start }" end="${end }" varStatus="s">
			<c:choose>
				<c:when test="${pageNumber == start+s.count-1 }">
					<span class="current ft-arial bold" title="${pageNumber}">${pageNumber}</span>
				</c:when>
				<c:otherwise>
					<a href="${url}${start+s.count-1}" title="2" class="ft-arial">${start+s.count-1}</a>
				</c:otherwise>
			</c:choose>
		</c:forEach>
		<c:if test="${totalPages-5>0 && pageNumber+2 < totalPages}">
			<span title="" class="ft-arial">...</span>
			<a href="${url}${totalPages}" title="${totalPages}" class="ft-arial">${totalPages }</a>
		</c:if>
		<c:choose>
			<c:when test="${pageNumber == totalPages || totalPages==0}">
				<span class="disabled">下一页 &gt;</span>
			</c:when>
			<c:otherwise>
				<a href="${url}${pageNumber+1}">下一页 > </a>
			</c:otherwise>
		</c:choose>
	</div>
</div>