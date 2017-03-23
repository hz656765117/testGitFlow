<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<div id="important-tips-layer" style="display: none;" class="tankuang layui-layer-wrap">
    <div class="alert alert-list">
        <div class="f14">
        	<h1 class="text-center f20 pt15 pb15 bold">重要提醒</h1>
        	<p class="text-indent-2em lh26">早前，苹果官方在WWDC2016上宣布：“从2017年1月1日起，App Store中的所有应用都必须启用 App Transport Security安全功能，屏蔽明文HTTP资源加载，连接必须经过更安全的HTTPS，否则将无法访问”。</p>
	        <p class="text-indent-2em lh26">2016年12月22日，苹果官方宣布延长截止日期，具体时间另行通知。</p>
	        <p class="text-indent-2em lh26">2016年12月29日，为了让微加的访问速度更快、更安全。微加对全站进行了HTTPS升级。</p>
	      	<p class="text-indent-2em lh26">  因HTTP的不安全性，未来，当苹果启动屏蔽策略，使用iOS系统为iOS 9或iOS 10的苹果用户，将无法打开企业号内曾经发布过的，包含非HTTPS加密的图片、视频、图文排版。</p>
	        <p class="text-indent-2em lh26">目前微加仍然支持添加非HTTPS加密的图片、视频、图文排版，但未来苹果的策略仍未知，微加无法保证未来这些文章内容仍然能够被访问。</p>
	        <p class="text-indent-2em lh26"> 所以，建议不要在文章中继续添加包含非HTTPS加密的图片、视频、图文排版。已添加过的非HTTPS加密的图片、视频可在微加编辑器中重新上传，即可自动成为HTTPS加密后的内容。非HTTPS加密的图文排版，请使用排版工具网站的HTTPS内容，如排版工具网站没有提供HTTPS内容，则未来可能将无法显示。</p>
        </div>
        <div class="formbtn">
            <a role="button" class="btn btn-primary btn-lg mr20" onclick="closedialog('#important-tips-layer')">我知道了</a>
        </div>
    </div>
</div>

<script type="text/javascript">
/* $(function(){
	$('.important-tips').click(function(){
		customDialog("#important-tips-layer");
	})
}) */
function importantTipsStatistics(modName){
	customDialog("#important-tips-layer");
	$.ajax({
		url : "${webPath}statistic/importantTips",
		data : {
			modName : modName
		},
		type : 'get',
		success : function(data) {
			
		}
	});
}
</script>