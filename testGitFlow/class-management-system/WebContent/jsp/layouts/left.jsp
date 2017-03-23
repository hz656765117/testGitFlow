<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%-- <%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %> --%>
<link rel="stylesheet" href="${webPath}css/leftMenu.css?v=2017030902">
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<%-- <jsp:include page="/jsp/vipstatus.jsp"></jsp:include> --%>
<!-- 编辑器（重要提示，及点击统计） -->
<%-- <jsp:include page="/jsp/important_tips.jsp"></jsp:include> --%>
<!---弹出框-->
<div class="modal fade" id="myModal" aria-hidden="true" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content w660 m0a">
            <div class="fr h30 clearfix">
                <span class="icon-bg ico-line display-ib fl mr14"></span>
                <a href="#myModal" data-dismiss="modal" class="ico-close icon-bg display-ib mt10 fl mr14"></a>
            </div>
            <div class="wxh clearfix">
                <ul>
                    <li>
                        <p><img src="${webPath}images/admin/qyh.png"></p>
                        <p class="p1">已有微信企业号</p>
                        <a id="ljaz" href="javascript:void(0)" target="_blank" class="f20 bai display-ib lh38 h38 bg-lv-cur bd-lv br4 text-center w240">立即安装</a>
                    </li>
                    <li>
                        <div class="border-l">
                            <p><img src="${webPath}images/admin/rgqyh.png"></p>
                            <p class="p1">注册微信企业号</p>
                            <a target="_blank" href="https://mp.weixin.qq.com/cgi-bin/readtemplate?t=register/step1_tmpl&lang=zh_CN" class="f20 bai display-ib lh38 h38 bg-huang-cur bd-huang br4 text-center w240">立即注册</a>
                            <p class="hui f14 mt10"><img src="https://www.51vj.cn/images/question1.gif" width="14" height="14" class="ver-2 mr5">您需要先注册微信企业号，才可以安装套件。</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<div class="page-left">
    <div class="navbox" id="installedMenu">
        <ul>
        </ul>
    </div>

    <div class="navbox uninstallBox" id="uninstalledMenu" style="display: none;">
        <ul>
            <li class="uninstall uninstall_title firstLi">
                <h3>
                    <a href="javascript:"><span>未安装应用</span></a>
                </h3>
            </li>
        </ul>
    </div>
</div>
<style>
	/*初始化mustache的时候，隐藏template*/
	.template{
	 display: none
	}
</style>
<script>
    $.ajax({
      type : 'GET',
      url : "${webPath}sysm/leftMenu/get.do",
      success:function (data) {
        if (data.success) {
          var obj = data.obj;
          var installedMenuHtml = '';
          var uninstallMenuHtml = '';
          for (var i = 0; i < obj.length; i++) {
            if (true) {//obj[i].install
              installedMenuHtml += getParentMenuItem(obj[i], obj[i].code == "ROLE_CONTACT");
            }else {
              uninstallMenuHtml += getParentMenuItem(obj[i], obj[i].code == "ROLE_CONTACT");
            }
          }
          if (uninstallMenuHtml == '') {
            $('#uninstalledMenu').css('display', 'none');
          }else {
            $('#uninstalledMenu').css('display', 'block');
            $('#uninstalledMenu ul').append(uninstallMenuHtml);
          }
          $('#installedMenu ul').append(installedMenuHtml);
          doReady();
        }
      }
    });
	var webPath = '${webPath}';

    function getParentMenuItem(data, isTop) {
      var topHref = data.children == null  ? webPath + data.menuUrl : "javascript:void(0);";
      var topStyle = isTop ? "toplink" : "firstLi";
      var dataSuite = '';//套件
      var dataVip = 'data-vip="' + data.appId + '"';
      /* if (!data.install){
        topStyle = "firstLi uninstall";
        dataSuite = 'data-suite="'+data.suitId+'"';
      } */
      var arrowDown = data.children == null  ? '' : '<b class="arrow-right"></b>';
      var result =
          '<li class="'+topStyle+'"'+dataSuite+''+ dataVip +'>' +
          '<h3>' +
          '<a href="'+topHref+'">' +
          '<span>'+data.name+'</span>' +
          '<i></i>' +
          arrowDown +
          '</a>' +
          '</h3>' +
          getChildMenuItem(data.children) +
          '</li>';
      return result;
    }

    function getChildMenuItem(data) {
      if (data == null)
        return '';
      var content = '';
      for (var i = 0; i < data.length; i++) {
        var arrow = '';
        var childItems = '';
        if (data[i].children != null) {
          arrow = ' <b class="arrow-right"></b>';
         childItems += '<ul>';
          for (var j = 0; j < data[i].children.length; j++) {
            childItems +=
                '<li class="thirdLi">' +
                '<h3>' +
                '<a href="'+webPath +data[j].menuUrl+'">' +
                '<span>'+ data[j].name +'</span>' +
                '<i></i>' +
                '</a>' +
                '</h3>' +
                '</li>';
          }
          childItems += '</ul> ';
        }
        var url = data[i].children == null ? webPath +data[i].menuUrl : "javascript:void(0);";
        content += '<li class="secondLi"> <h3><a href="'+url+'"><span>'+
            data[i].name+'</span><i></i>'+arrow+'</a> </h3>'+
            childItems+' </li>'
      }
      var result =
          '<ul>' +
          content +
          '</ul>';
      return result;
    }

    function doReady() {

      $(document).ready(function () {
        var thisPathName=window.location.pathname+location.search;
        var prevurl;
        var res=[];
        if ($('.page-content').find('.icon-back').length>0 ||$('.page-content').find('.icon-back2').length>0 ||$('.page-content').find('.btn-back').length>0)
        {
          prevurl=document.referrer;
          res = prevurl.match(/\/\/[^\/]+(\/.*)/);

        }
        $(".navbox li a").each(function(){
          var aUrl=$(this).attr("href");
          //特殊处理模块(由于分页是页面跳转)
          var qyxcs=aUrl=="/album?appId=32" && thisPathName.indexOf('album/toAlbumForm')!=-1; //企业相册上传
          var attend= aUrl=="/attend/index" && (thisPathName.indexOf('attend/indexInsertRule')!=-1 || thisPathName.indexOf('attend/indexUpdateRule')!=-1);  //新增或编辑考勤规则
          var wsq= aUrl=="/wsq/index" && thisPathName.indexOf(aUrl)!=-1;  //微社区
          var gift= aUrl=="/yggh/giftBox" && thisPathName.indexOf(aUrl)!=-1; //礼品屋
          var history=aUrl=="/journal/index?jtype=1" && thisPathName.indexOf(aUrl)!=-1; //历史期刊
          var zkqi=aUrl=="/article/zhengGao?jtype=1" && thisPathName.indexOf(aUrl)!=-1; //征稿启事
          var qypx=aUrl=="/train/index" && thisPathName.indexOf(aUrl)!=-1; //企业培训
          var qyxc=aUrl=="/photoAlbum/index" && thisPathName.indexOf(aUrl)!=-1; //企业相册
          var tpdy=aUrl=="/vote/getVoteList" && thisPathName.indexOf(aUrl)!=-1; //投票调研
          var srzf=$('.page-content').find('.srzfmark').length>0 && aUrl=="/gh/index" && thisPathName.indexOf(aUrl)!=-1; //生日祝福
          var rzjn=(aUrl=="/gh/index?type=5" && thisPathName.indexOf(aUrl)!=-1)||(aUrl=="/gh/index?type=5" && thisPathName.indexOf("/gh/index?type=7")!=-1)||(aUrl=="/gh/index?type=5" && thisPathName.indexOf("/gh/index?type=9")!=-1)||(aUrl=="/gh/index?type=5" && thisPathName.indexOf("/gh/index?type=10")!=-1); // 入职纪念
          var examtj=(aUrl=="/exam/statistic?appId=52") && (thisPathName.indexOf('exam/statistic/toPaperStatistic')!=-1 ||thisPathName.indexOf('exam/statistic/toQuestionStatistic')!=-1);   //答题统计
          if(aUrl==thisPathName ||($.inArray(aUrl,res)!=-1)||examtj||tpdy||wsq||gift||history||zkqi||qypx||qyxc||srzf||rzjn||attend||qyxcs){
            $(".navbox li ul").find(".cur").removeClass("cur");
            $(this).parent().addClass("current");
            $(this).parents('ul').prev().addClass("cur");
            $(this).parents('ul').show();
          }
        });
      });






      $(document).on('click', '.navbox li:not(.uninstall) h3', function () {
        var isVip;
        var first=true;
        var appId = $(this).parent().attr("data-vip");
        /* if($.trim(appId).length != 0){
          var result =  validateVip (null,appId, $(this).children('a').attr('href'),null,$(this));
          isVip = result.isVip;
          first=result.first;
        } */
        isVip = true;
        if(!($(this).siblings('ul').length>0)&&first&&result.vipStatus==2){
            return false;
        }

       /*  if ((isVip || isVip == undefined)&& !first ) { */
          if ($(this).hasClass('cur')) {
            $(this).removeClass("cur").next("ul").slideUp(300);
          } else {
            $(this).addClass("cur").next("ul").slideDown(300);
            $(this).parent().siblings().find('h3').removeClass("cur");
            $(this).parent().siblings().find('h3').next().slideUp(300);
          }
        /* } */
        return isVip;
      });
      /**
       * 未安装应用
       */
      $(document).on('click', 'li.uninstall:not(".uninstall_title")', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $this = $(this);
        $this.find('h3').off();
        layer.confirm('该应用未安装，是否安装？', {
          btn: ['是', '否']
        }, function (index) {
          console.log('安装回调函数');
          window.location = '${ctx}/install/sendToLoginPage/' + $this.data('suite');
          layer.close(index);
        }, function () {
          console.log('取消');
        });
      });
    }

</script>

