<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%-- <%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %> --%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1"/>
    <title>Title</title>
</head>
<script type="text/javascript" src="${webPath}static/js/box/page.js?v=2017030902"></script>
<script type="text/javascript">
  var ctx='${ctx}';

  //用户登录时看到的最新一条公告栏弹框提示
  function getSysDetail(id,titleName){
      closedialog('#noticeDetail');
      closeDiv(100);
      openDiv(102);
      $("#sysTells_GGL").html("");
      $("#sysTells_GGL").html(titleName);

      $.ajax({
          url:"${webPath}about/readRecord",
          type:'post',
          cache:false,
          data:{
              id:id
          },
          success:function(data){
              var record = data.obj;
              if(data.success){
                  $("#sysTellsEditor_GGL").html(record.content);
              }else{
                  $("#sysTellsEditor_GGL").html("暂无内容！");
              }
          }
      });
  }

  //应用中心页面公告栏更多点击事件
  function getSysNews(type){

      if(type==1){
          getSysRecord(-1);
      }else{
          closeDiv(102);
          getSysRecord(-1);
      }
  }

  function getSysRecord(page){
      var flag=0;
      if(page==-1){
          page=1;
          flag=-1;
      }
      $.ajax({
          url:"${webPath}about/getRecord",
          type:'post',
          cache:false,
          data:{
              pageNumber:page
          },
          success:function(data){
              if(data.success){
                  var recordList = data.obj;
                  var pageNum=data.attributes.pageNum;
                  var pages = data.attributes.pages;
                  var html="";
                  $("#recordList_GGL").html("");
                  if(recordList.length<=0){
                      html+=" <li><span class='data'></span><a href='#'>暂无系统公告信息";
                      html+="</a></li>";

                  }

                  var last=307;
                  for(var i=0;i<recordList.length;i++){
                      var record = recordList[i];
                      html+=" <li id='"+record.id+"' onclick=\"getSysDetail("+record.id+", '"+record.titleName+"')\"><span class='date'>"+record.createStrdate+"</span><a href='#'>"+((record.readTimes>0 || record.id<=last)?"":"<img src='${webPath}/images/admin/new.png' class='ver-middle mr3'>")+record.titleName+"</a><span id='"+record.id+"li_GGL'  style='display:none'>"+record.content+"</span></li>";
                  }

                  $("#recordList_GGL").html(html);
                  if(flag==-1){
                      flag=0;
                      openDiv(100);

                  };

                  showpageFun2($("#pageGGL"), pageNum, pages, "getSysRecord");

              }else{
                  alert(data.msg);

              }
          }
      });

  }

  //应用中心公告栏详情弹框点击关闭的按钮事件方法
  function beforCloseDiv(id){
      searchSysNums();
      closeDiv(id);
  }

  function searchSysNums(){
      $.ajax({
          url:"${webPath}about/getSysNums",
          type:'post',
          cache:false,
          data:{
          },
          success:function(data){
              if(data.success){
                  var flag_news=data.attributes.flag_news;
                  if(flag_news==0){
                      $("#qipao").removeClass("qipao");
                  }
              }else{
                  alert(data.msg);

              }
          }
      });
  }

</script>
<div class="navbar-header clearfix">
    <a href="${webPath}" class="logo">
        <h1>微加</h1>
        <img src="${webPath}images/admin/logo.png">
    </a>
    <ul class="hnav">
        <li><a href="JavaScript:window.open('${webPath}index.html')">首页</a></li>
<%--         <sec:authorize access="hasRole('ADMIN')">
            <li><a href="${webPath}appCenter/index" class="active" >应用中心</a></li>
        </sec:authorize>
        <li><a href="JavaScript:window.open('${webPath}helps/helps_index.html')">帮助</a></li>
        <li class="dropdown">
            <span class="name"><sec:authentication property="principal.companyInfo.companyName" /></span>
            <ul class="dropdown-menu animated fadeInRight">
					<li><a href="${ctx}/setQyInfo/detail?index=1">账号设置</a></li>

			</ul>
        </li> --%>
        <li><a href="${webPath}login/logOut" class="back"><img style="margin-right:10px;vertical-align:-2px;" src="${webPath}images/admin/dzback.png">退出</a></li>
    </ul>
</div>

<!--应用中心的公告栏点击更多时的公告栏列表显示弹框-->
<div class="user-pop pos-abs bg-bai display-no" id="alertdiv100" style="width:660px">
    <div class="user-poppd1 notice-layer">
        <h2><a href="javascript:void(0)" onclick="beforCloseDiv(100)"  class="close">x</a>系统公告</h2>
        <ul class="notice-list" id="recordList_GGL">
            <li><span class="date">2014-05-20  15：00</span><a href="#">系统公告信息</a></li>
        </ul>


        <!--分页-->
        <div class="clearfix mt20" id="pageGGL">
            <div class="pagination fr" ><span class="disabled">&lt; 上一页 </span><span class="current ft-arial bold" title="1">1</span><a href="#" title="2" class="ft-arial">2</a> <a href="#">下一页 ></a></div>
        </div>
    </div>

</div>

<!--应用中心的公告栏点击详情显示弹框-->
<div class="user-pop pos-abs bg-bai display-no" style="width:660px"  id="alertdiv102">
    <div class="user-poppd1 notice-layer">
        <h2><a href="javascript:void(0)" onclick="getSysNews(2)" class="back"><img src="${webPath}images/back.jpg" /></a><a href="javascript:void(0)" onclick="beforCloseDiv(102)" class="close">x</a><p id="sysTells_GGL" >aaa</p></h2>
        <div class="notice-xx" id="sysTellsEditor_GGL">
        </div>
    </div>
</div>
